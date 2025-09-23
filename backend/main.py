from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from models.user import User
from models.challenge import Challenge
from routers import challenge, job
from db.database import create_tables

create_tables()

app = FastAPI(
    title="Sims challenges API",
    description="API for generating Sims challenges using LLMs",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenge.router, prefix=settings.API_PREFIX)
app.include_router(job.router, prefix=settings.API_PREFIX)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)