from sqlalchemy.orm import Session
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import CHALLENGE_PROMPT
from models.challenge import Challenge

from core.models import ChallengeLLMResponse
from dotenv import load_dotenv

load_dotenv()

class ChallengeGenerator:

    @classmethod
    def _get_llm(cls):
        return ChatOpenAI(
            model="gpt-5-nano",
            max_tokens=600
        )
    
    @classmethod
    def generate_challenge(cls, db: Session, session_id: str, packs: list[str], theme: str) -> ChallengeLLMResponse:
        llm = cls._get_llm()

        challenge_parser = PydanticOutputParser(pydantic_object=ChallengeLLMResponse)

        prompt = ChatPromptTemplate.from_messages([
            (
               "system", CHALLENGE_PROMPT
            ),
            (
                "human",
                f"Create the challenge with this theme: {theme} based on these packages: {packs}."
            )
        ]).partial(theme=theme, packs=packs, format_instructions=challenge_parser.get_format_instructions())

        raw_response = llm.invoke(prompt.invoke({}))
        print("RAW LLM RESPONSE:", raw_response)

        response_text = raw_response
        if hasattr(raw_response, 'content'):
            response_text = raw_response.content
        challenge_structure = challenge_parser.parse(response_text)

        challenge_db = Challenge(
            title=challenge_structure.title,
            description=challenge_structure.description,
            session_id=session_id,
        )

        db.add(challenge_db)
        db.commit()

        return challenge_db