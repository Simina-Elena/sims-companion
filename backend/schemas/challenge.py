from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from core.models import Rule as SharedRule


class CreateChallengeRequest(BaseModel):
    theme: str
    packs: list[str]


class RuleObject(SharedRule):
    # API responses require an id
    id: int


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


class UpdateChallengeStatusRequest(BaseModel):
    is_completed: bool