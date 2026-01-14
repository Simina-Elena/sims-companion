from sqlalchemy.orm import Session
from models.challenge import Challenge
from models.challenge import Challenge, Rule as RuleModel
from core.models import ChallengeLLMResponse, Rule as RuleSchema 

class ChallengeGenerator:
    @classmethod
    def generate_challenge(cls, db: Session, session_id: str, packs: list[str], theme: str) -> ChallengeLLMResponse:
        """
        Mock generator used for local testing. Does NOT call OpenAI.
        The original LLM-based implementation is preserved below as commented code.
        """

        # Build deterministic mock rules using the shared `Rule` Pydantic model
        mock_rules: list[RuleSchema] = []
        for i, pack in enumerate(packs, start=1):
            mock_rules.append(RuleSchema(text=f"Use package '{pack}' to implement feature {i}."))

        extra = [
            "Write unit tests for core functionality.",
            "Document the setup and usage in README.",
        ]
        for e in extra:
            mock_rules.append(RuleSchema(text=e, is_completed=False))

        challenge_structure = ChallengeLLMResponse(
            title=f"Mock Challenge: {theme}",
            description=f"This is a mock challenge generated for theme '{theme}'.",
            rules=mock_rules,
            is_completed=False,
        )

        # Persist: create Challenge, flush to get id, then create Rule rows
        challenge_db = Challenge(
            title=challenge_structure.title,
            description=challenge_structure.description,
            session_id=session_id,
        )

        db.add(challenge_db)
        db.flush()

        for r in challenge_structure.rules:
            rule_row = RuleModel(challenge_id=challenge_db.id, text=r.text)
            db.add(rule_row)

        db.commit()
        db.refresh(challenge_db)

        return challenge_db


# --- Original LLM-based implementation (commented for safekeeping) ---
# from sqlalchemy.orm import Session
# from langchain_openai import ChatOpenAI
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import PydanticOutputParser
#
# from core.prompts import CHALLENGE_PROMPT
# from models.challenge import Challenge
#
# from core.models import ChallengeLLMResponse
# from dotenv import load_dotenv
#
# load_dotenv()
#
# class ChallengeGenerator:
#
#     @classmethod
#     def _get_llm(cls):
#         return ChatOpenAI(
#             model="gpt-4.1-mini",
#             max_tokens=800
#         )
#     
#     @classmethod
#     def generate_challenge(cls, db: Session, session_id: str, packs: list[str], theme: str) -> ChallengeLLMResponse:
#         llm = cls._get_llm()
#
#         challenge_parser = PydanticOutputParser(pydantic_object=ChallengeLLMResponse)
#
#         prompt = ChatPromptTemplate.from_messages([
#             (
#                "system", CHALLENGE_PROMPT
#             ),
#             (
#                 "human",
#                 f"Create the challenge with this theme: {theme} based on these packages: {packs}."
#             )
#         ]).partial(theme=theme, packs=packs, format_instructions=challenge_parser.get_format_instructions())
#
#         raw_response = llm.invoke(prompt.invoke({}))
#         print("RAW LLM RESPONSE:", raw_response)
#
#         response_text = raw_response
#         if hasattr(raw_response, 'content'):
#             response_text = raw_response.content
#         challenge_structure = challenge_parser.parse(response_text)
#
#         # Create challenge record first, then create Rule rows from the parsed rules
#         challenge_db = Challenge(
#             title=challenge_structure.title,
#             description=challenge_structure.description,
#             session_id=session_id,
#         )
#
#         db.add(challenge_db)
#         db.flush()  # ensure challenge_db.id is populated
#
#         # challenge_structure.rules contains Pydantic Rule objects (text, optional id)
#         for r in challenge_structure.rules:
#             # r may be a string or a Pydantic object; handle both
#             text = getattr(r, "text", None) or r
#             rule_row = Challenge.Rule(challenge_id=challenge_db.id, text=text)
#             db.add(rule_row)
#
#         db.commit()
#         db.refresh(challenge_db)
#
#         return challenge_db