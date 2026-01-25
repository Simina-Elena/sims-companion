from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.database import Base

class LoginToken(Base):
    __tablename__ = "login_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    user = relationship("User", back_populates="login_tokens")

    token_hash = Column(String(64), nullable=False, index=True)
    request_id_hash = Column(String(64), nullable=False, index=True)

    expires_at = Column(DateTime(timezone=True), nullable=False, index=True)
    used_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
