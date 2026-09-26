from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings

# Handle postgres:// vs postgresql:// compatibility for cloud hosted PostgreSQL (Neon, Supabase, Vercel, RDS)
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# Configure engine with robust pooling for PostgreSQL / Vercel serverless vs SQLite dev
if db_url.startswith("sqlite"):
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False},
        echo=False
    )
else:
    # Production PostgreSQL pool configuration
    engine = create_engine(
        db_url,
        pool_pre_ping=True,       # Test connections before checkout to prevent dead socket errors
        pool_recycle=300,         # Recycle connections every 5 minutes
        pool_size=5,              # Conservative connection count per worker
        max_overflow=10,          # Allow temporary burst connections
        echo=False
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

