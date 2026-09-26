import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError, DBAPIError

from backend.app.core.config import settings
from backend.app.api.v1.api import api_router
from backend.app.db.init_db import init_db

logger = logging.getLogger("uvicorn.error")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB & Seed Data on startup
    try:
        init_db()
    except Exception as e:
        logger.error(f"[Startup] Database initialization failed: {type(e).__name__}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Practice Layer — turning classroom evidence into actionable teacher coaching and institutional accountability.",
    version=settings.VERSION,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan
)

# Global Safe Database Error Handler - A10
@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.error(f"[Database Error] Safe-masked exception on {request.method} {request.url.path}: {type(exc).__name__}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "A database error occurred. Your request could not be processed safely."}
    )

@app.exception_handler(DBAPIError)
async def dbapi_exception_handler(request: Request, exc: DBAPIError):
    logger.error(f"[DBAPI Error] Safe-masked exception on {request.method} {request.url.path}: {type(exc).__name__}")
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"detail": "Database connection or service is currently unavailable."}
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
        "health": f"{settings.API_V1_STR}/system/health",
        "version": settings.VERSION
    }

