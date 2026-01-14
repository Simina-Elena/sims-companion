from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from core.models import Rule as SharedRule


class CreateChallengeRequest(BaseModel):
    theme: str
    packs: list[str]


class RuleObject(SharedRule):
    # API responses require an id
    id: int
    class Config:
        # for returning DB objects
        from_attributes = True


class ChallengeResponse(BaseModel):
    id: int
    title: str
    description: str
    rules: list[RuleObject]
    is_completed: bool
    created_at: datetime
    session_id: str
    user_id: Optional[int] = None

    class Config:
        # for returning DB objects
        from_attributes = True


class UpdateStatusRequest(BaseModel):
    is_completed: bool

class UpdateRuleText(BaseModel):
    text: str = Field(min_length=1, max_length=300)