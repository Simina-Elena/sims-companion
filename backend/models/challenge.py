from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    session_id = Column(String, index=True)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="challenges")
    rules = relationship("Rule")

    class Rule(Base):
        __tablename__ = "rules"

        id = Column(Integer, primary_key=True, index=True)
        challenge_id = Column(Integer, ForeignKey("challenges.id", ondelete="CASCADE"))
        text = Column(String, nullable=False)

        challenge = relationship("Challenge", back_populates="rules")

