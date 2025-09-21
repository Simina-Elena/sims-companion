from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ChallengeLLMResponse(BaseModel):
    title: str = Field(description="The title of the challenge")
    description: str = Field(description="A detailed description of the challenge")
    isCompleted: bool = Field(default=False, description="Whether the challenge is completed")