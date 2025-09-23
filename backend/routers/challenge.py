import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime

from db.database import get_db, SessionLocal
from schemas.challenge import ChallengeResponse, CreateChallengeRequest
from schemas.job import StoryJobResponse
from models.job import StoryJob
from models.challenge import Challenge
from core.challenge_generator import ChallengeGenerator

router = APIRouter(
    prefix="/challenges",
    tags=["challenges"]
)

def get_session_id(session_id: Optional[str] = Cookie(None)):
    if not session_id:
        session_id = str(uuid.uuid4())
    return session_id

@router.post("/create", response_model=StoryJobResponse)
def create_challenge(
    request: CreateChallengeRequest,
    response: Response,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    session_id: str = Depends(get_session_id)
):
    response.set_cookie(key="session_id", value=session_id, httponly=True)

    job_id = str(uuid.uuid4())

    job = StoryJob(
        job_id=job_id, 
        session_id=session_id,
        theme=request.theme, 
        packs=request.packs,
        status="pending", 
    )

    db.add(job)
    db.commit()

    background_tasks.add_task(
    generate_challenge_task,
    job_id=job_id,
    theme=request.theme,
    packs=request.packs,
    session_id=session_id,
)
    return job
    
def generate_challenge_task(job_id: str, theme: str, packs: list[str], session_id: str):
    db = SessionLocal()

    try: 
        job = db.query(StoryJob).filter(StoryJob.job_id == job_id).first()
        if not job:
            raise Exception("Job not found")
        try: 
            job.status = "processing"
            db.commit()

            # Simulate challenge generation
            challenge = ChallengeGenerator.generate_challenge(db, session_id, packs, theme)
            job.challenge_id = challenge.id
            job.status = "completed"
            job.completed_at = datetime.now()
            db.commit()
        except Exception as e:
            job.status = "failed"
            job.completed_at = datetime.now()
            job.error = str(e)
            db.commit()
    finally:
        db.close()

@router.get("/{challenge_id}/complete", response_model=ChallengeResponse)
def get_challenge(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    return challenge