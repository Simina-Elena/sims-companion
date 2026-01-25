from datetime import datetime, timezone
from fastapi import Depends, HTTPException, Cookie
from sqlalchemy.orm import Session

from db.database import get_db
from core.security import hash_secret
from models.session import Session as UserSession
from models.user import User

def utcnow():
    return datetime.now(timezone.utc)


def get_current_user(
        db: Session = Depends(get_db),
        session_cookie: str | None = Cookie(default=None, alias="session")
    ) -> User:

    if not session_cookie:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    sess_hash = hash_secret(session_cookie)

    session = db.query(UserSession).filter(
        UserSession.session_hash == sess_hash,
        UserSession.revoked == False,
        UserSession.expires_at > utcnow()
    ).first()

    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    user = db.query(User).filter(User.id == session.user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user
