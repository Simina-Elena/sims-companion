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
        )
    
    @classmethod
    def generate_challenge(cls, db: Session, session_id: str, packs: list[str], theme: str) -> ChallengeLLMResponse:
        llm = cls._get_llm()

        format_instructions = PydanticOutputParser(pydantic_object=ChallengeLLMResponse).get_format_instructions()

        prompt = ChatPromptTemplate.from_template(
            CHALLENGE_PROMPT.format(
                theme=theme,
                packs=packs,
                format_instructions=format_instructions
            )
        )

        response = llm.predict(prompt.format_messages().to_messages())

        parsed_response = PydanticOutputParser(pydantic_object=ChallengeLLMResponse).parse(response)

        challenge = Challenge(
            title=parsed_response.title,
            description=parsed_response.description,
        )

        db.add(challenge)
        db.commit()

        return challenge