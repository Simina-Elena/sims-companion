from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class CreateChallengeRequest(BaseModel):
    theme: str
    packs: list[str]

class ChallengeResponse(BaseModel):
    id: int
    title: str
    description: str
    is_completed: bool
    created_at: datetime
    session_id: str
    user_id: Optional[int] = None

    class Config:
        from_attributes = True
