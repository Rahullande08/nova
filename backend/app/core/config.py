import os
import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Practice Layer API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Environment & Host ("development", "staging", "production")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")

    # Database (SQLite for dev/demo, PostgreSQL for production)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:////tmp/practice_layer.db" if os.getenv("VERCEL") else "sqlite:///./practice_layer.db"
    )

    # System Protection
    ALLOW_SYSTEM_RESET: bool = os.getenv("ALLOW_SYSTEM_RESET", "False").lower() in ("true", "1", "yes")

    # CORS
    BACKEND_CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    # Security / Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "practice_layer_super_secret_dev_key_2026_change_in_production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Uploads Storage
    UPLOAD_DIR: str = os.getenv(
        "UPLOAD_DIR",
        "/tmp/uploads" if os.getenv("VERCEL") else os.path.abspath(os.path.join(os.path.dirname(__file__), "../../uploads"))
    )
    MAX_UPLOAD_SIZE_MB: int = 25
    ALLOWED_IMAGE_TYPES: List[str] = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    ALLOWED_AUDIO_TYPES: List[str] = ["audio/webm", "audio/wav", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/m4a", "audio/x-m4a"]

    # AI Providers Configuration
    AI_PROVIDER: str = "gemini"  # "gemini" | "fallback"
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"
    AI_TIMEOUT_SECONDS: int = 15

    # WhatsApp Business API Configuration (Optional live integration)
    WHATSAPP_API_TOKEN: str = ""
    WHATSAPP_PHONE_NUMBER_ID: str = ""
    WHATSAPP_BUSINESS_ACCOUNT_ID: str = ""

    # Server Host / Port
    PORT: int = 8000

    # Privacy Policy
    PURGE_AUDIO_AFTER_TRANSCRIPTION: bool = False  # If True, delete raw audio after transcription
    STORE_CHILD_FACES: bool = False

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"

settings = Settings()

# Normalize DATABASE_URL if needed
if settings.DATABASE_URL.startswith("postgres://"):
    settings.DATABASE_URL = settings.DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Validate production configurations
if settings.ENVIRONMENT == "production":
    if "dev_key" in settings.SECRET_KEY or len(settings.SECRET_KEY) < 32:
        raise ValueError("CRITICAL: In production mode, SECRET_KEY must be a secure environment variable with at least 32 characters.")
    if settings.DATABASE_URL.startswith("sqlite"):
        raise ValueError("CRITICAL: Production environment detected, but DATABASE_URL is set to SQLite. PostgreSQL is required in production.")

# Ensure uploads directory exists (gracefully handle read-only filesystems in serverless)
try:
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
except OSError:
    pass
