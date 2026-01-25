from pydantic import BaseModel, EmailStr

class VerifyMagicLinkRequest(BaseModel):
    token: str

class RequestMagicLink(BaseModel):
    email: EmailStr