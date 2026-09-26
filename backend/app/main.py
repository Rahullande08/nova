import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from backend.app.core.config import settings
from backend.app.api.v1.api import api_router
from backend.app.db.init_db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB & Seed Data on startup
    init_db()
    yield

app = FastAPI(
    title="Practice Layer API",
    description="Backend API for Practice Layer — turning classroom evidence into actionable teacher coaching and institutional accountability.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Configure CORS
cors_origins = settings.BACKEND_CORS_ORIGINS
if settings.ENVIRONMENT == "production":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Serve uploaded static files
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Welcome to Practice Layer API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/system/health"
    }
