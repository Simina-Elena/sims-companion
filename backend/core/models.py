from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ChallengeLLMResponse(BaseModel):
    title: str = Field(description="The title of the challenge")
    description: str = Field(description="A short overview of the challenge")
    rules: List[str] = Field(description="List of rules (steps) for winning")
    isCompleted: bool = Field(default=False, description="Whether the challenge is completed")