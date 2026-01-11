from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class Rule(BaseModel):
    id: Optional[int] = Field(None, description="Optional rule id assigned by the DB")
    text: str = Field(description="Rule text")


class ChallengeLLMResponse(BaseModel):
    title: str = Field(description="The title of the challenge")
    description: str = Field(description="A short overview of the challenge")
    # LLM can return structured rules with optional ids; DB will assign ids later
    rules: List[Rule] = Field(description="List of rules (steps) for winning")
    isCompleted: bool = Field(default=False, description="Whether the challenge is completed")