from sqlalchemy.orm import Session
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from dotenv import load_dotenv

from core.prompts import CHALLENGE_PROMPT
from core.models import ChallengeLLMResponse
from models.challenge import Challenge, Rule as RuleModel

load_dotenv()


class ChallengeGenerator:
    @classmethod
    def _get_llm(cls):
        return ChatOpenAI(
            model="gpt-4.1-mini",
            max_tokens=800,
        )

    @classmethod
    def generate_challenge(
        cls,
        db: Session,
        session_id: str,
        packs: list[str],
        theme: str,
    ) -> Challenge:
        llm = cls._get_llm()

        parser = PydanticOutputParser(pydantic_object=ChallengeLLMResponse)

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", CHALLENGE_PROMPT),
                (
                    "human",
                    "Create the challenge with this theme: {theme} based on these packages: {packs}.",
                ),
            ]
        ).partial(
            theme=theme,
            packs=packs,
            format_instructions=parser.get_format_instructions(),
        )

        raw_response = llm.invoke(prompt.invoke({}))
        print("RAW LLM RESPONSE:", raw_response)
        response_text = raw_response.content if hasattr(raw_response, "content") else str(raw_response)

        challenge_structure: ChallengeLLMResponse = parser.parse(response_text)

        # Create challenge row
        challenge_db = Challenge(
            title=challenge_structure.title,
            description=challenge_structure.description,
            session_id=session_id,
            is_completed=challenge_structure.is_completed,
        )

        db.add(challenge_db)
        db.flush()  # ensure challenge_db.id exists

        # Create rule rows
        for r in challenge_structure.rules:
            # r should be a Pydantic Rule with text + is_completed
            rule_row = RuleModel(
                challenge_id=challenge_db.id,
                text=r.text,
                is_completed=r.is_completed,
            )
            db.add(rule_row)

        db.commit()
        db.refresh(challenge_db)
        return challenge_db
