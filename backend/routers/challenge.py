import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session

from db.database import get_db
from schemas.challenge import ChallengeResponse, CreateChallengeRequest
from schemas.job import StoryJobResponse

router = APIRouter(
    prefix="/challenges",
    tags=["challenges"]
)

def get_session_id(session_id: Optional[str] = Cookie(None)):
    if not session_id:
        session_id = str(uuid.uuid4())
    return session_id

@router.post("/create", response_model=StoryJobResponse)
def create_challenge():
    pass