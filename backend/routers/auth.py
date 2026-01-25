from core.security import hash_secret
from core.config import settings
from core.auth import get_current_user
from schemas.auth import RequestMagicLink, VerifyMagicLinkRequest
from models.user import User
from models.login_token import LoginToken
from models.session import Session as UserSession
from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timezone, timedelta
from fastapi.responses import JSONResponse
import secrets

from db.database import get_db, SessionLocal

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

SESSION_DAYS = 30
MAGIC_LINK_TTL_MINUTES = 15

def utcnow():
    return datetime.now(timezone.utc)

@router.post("/request-link")
def request_magic_link(
    payload: RequestMagicLink, 
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):
    # normalize
    email = payload.email.lower().strip()

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email)
        db.add(user)
        db.flush()

    login_req = secrets.token_urlsafe(32)
    login_req_hash = hash_secret(login_req)

    raw_token = secrets.token_urlsafe(32)
    raw_token_hash = hash_secret(raw_token)

    login_token = LoginToken(
        user_id=user.id,
        token_hash=raw_token_hash,
        request_id_hash=login_req_hash,
        expires_at=utcnow() + timedelta(minutes=MAGIC_LINK_TTL_MINUTES),
        used_at=None
    )

    db.add(login_token)
    db.commit()
    
    response = JSONResponse(
        content={"ok": True, "message": "If the email exists, a login link was sent."}
    )

    response.set_cookie(
        key="login_req",
        value=login_req,
        httponly=True,
        secure=False,
        samesite="strict",
        max_age=MAGIC_LINK_TTL_MINUTES * 60,
        path=f"{settings.API_PREFIX}/auth"
    )

    link = f"{settings.FRONTEND_URL.rstrip('/')}/auth/callback#token={raw_token}"

    print("MAGIC LINK:", link)

    return response

@router.post("/verify")
def verify_magic_link(
    payload: VerifyMagicLinkRequest, 
    response: Response,
    db: Session = Depends(get_db),
    login_req: str | None = Cookie(default=None)
):
    if not login_req:
        raise HTTPException(status_code=401, detail="Missing login context")
    
    token_hash = hash_secret(payload.token)
    request_id_hash = hash_secret(login_req)

    now = utcnow()

    login_token = db.query(LoginToken).filter(
        LoginToken.token_hash == token_hash,
        LoginToken.request_id_hash == request_id_hash,
        LoginToken.used_at.is_(None),
        LoginToken.expires_at > now
    ).with_for_update().first()

    if not login_token:
        raise HTTPException(status_code=401, detail="Invalid or expired link")

    # mark token as used
    login_token.used_at = now

    raw_session = secrets.token_urlsafe(32)
    session_hash = hash_secret(raw_session)

    session = UserSession(
        user_id = login_token.user_id,
        session_hash = session_hash,
        expires_at = now + timedelta(days=SESSION_DAYS),
        revoked = False
    )

    db.add(session)
    db.commit()

    response.set_cookie(
        key="session",
        value=raw_session,
        httponly=True,
        secure=False, # switch True in prod -> https
        samesite="strict",
        max_age=SESSION_DAYS * 24 * 60 * 60,
        path="/"
    )

    response.delete_cookie(key="login_req", path="/auth")

    return {"ok": True}

@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {"id": user.id, "email": user.email}

@router.post("/logout")
def logout(
    response: Response,
    db: Session = Depends(get_db),
    session_cookie: str | None = Cookie(default=None, alias="session"),
):
    if session_cookie:
        sess_hash = hash_secret(session_cookie)
        sess = db.query(UserSession).filter(UserSession.session_hash == sess_hash).first()
        if sess:
            sess.revoked = True
            db.commit()

    response.delete_cookie(key="session", path=f"{settings.API_PREFIX}/auth")
    return {"ok": True}


    