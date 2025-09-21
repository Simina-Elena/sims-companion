from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func

from db.database import Base

class StoryJob(Base):
    __tablename__ = "challenge_jobs"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, index=True, unique=True)
    session_id = Column(String, index=True)
    theme = Column(String)
    packs = Column(JSON, nullable=False) 
    status = Column(String)
    challenge_id = Column(Integer, nullable=True)
    error = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)