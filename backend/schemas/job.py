from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class StoryJobBase(BaseModel):
    theme: str
    packs: list[str]

class StoryJobResponse(BaseModel):
    job_id: str
    status: str
    created_at: datetime
    challenge_id: Optional[int] = None
    completed_at: Optional[datetime] = None
    error: Optional[str] = None

    class Config:
        from_attributes = True