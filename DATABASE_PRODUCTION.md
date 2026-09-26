# Production Database Architecture & Reliability Guide

## Overview
NovaCheck (Practice Layer) utilizes **SQLAlchemy ORM** with **PostgreSQL** in production environments (e.g. Neon, Supabase, Vercel Postgres, AWS RDS, GCP Cloud SQL) and **SQLite** for zero-dependency local development and testing.

---

## 1. Production Requirements

### Environment Variables
In production (`ENVIRONMENT=production`), the backend strictly enforces:
- `DATABASE_URL`: Must start with `postgresql://` (or `postgres://` which is normalized automatically). SQLite fallback is **prohibited** and will cause the application to fail fast with an explicit configuration error.
- `SECRET_KEY`: High-entropy cryptographic string (minimum 32 characters) for JWT token signing.
- `ALLOW_SYSTEM_RESET`: Must default to `false`. Database reset operations are blocked at the engine level.
- `BACKEND_CORS_ORIGINS`: Restricted to approved production domain origins (e.g. `["https://novacheck.vercel.app"]`).

---

## 2. Connection Management & Pooling (Vercel Serverless)

When deployed to serverless platforms (e.g., Vercel / AWS Lambda), database connections can easily exhaust connection limits if not tuned properly.

### Configured Pool Strategy
```python
engine = create_engine(
    db_url,
    pool_pre_ping=True,       # Validates connection liveness before checkout
    pool_recycle=300,         # Recycles sockets every 5 minutes to prevent stale disconnections
    pool_size=5,              # Conservative connection limit per serverless instance
    max_overflow=10,          # Handles peak traffic bursts safely
    echo=False
)
```

### Recommendation for High-Concurrency Deployments:
Use a managed connection pooler such as **PgBouncer** or **Supabase / Neon Transaction Pooler** on port `6543` / `5432` with `pool_mode=transaction`.

---

## 3. Transaction Safety & Isolation

1. **Session Scope & Teardown**:
   Every request obtains a scoped session via `get_db()` which automatically executes `db.rollback()` on uncaught exceptions and `db.close()` on completion.
2. **Atomic Multi-Step Persistence**:
   Endpoints performing compound workflows (e.g., `Evidence` -> `PracticeAnalysis` -> `Coaching`) commit all related records in a single transaction. Any intermediate failure initiates an immediate rollback to prevent orphaned or corrupted state.
3. **User Data Isolation (RBAC)**:
   - Server-side token validation determines ownership (`current_user.id`).
   - Query filters isolate teacher records (`Evidence.teacher_id == current_user.id`) and user-targeted notifications (`Notification.user_id == current_user.id`).
   - Unauthorized attempts return `401 Unauthorized` or `403 Forbidden`.

---

## 4. Disaster Recovery & Backup Procedures

### Automated Daily Snapshots & Point-In-Time-Recovery (PITR)
1. **Automated Backups**: Enable continuous WAL archiving or minimum 7-day automated daily snapshots on your PostgreSQL provider (e.g., Neon / Supabase / AWS RDS).
2. **Pre-Deployment Backup**:
   Run an explicit manual snapshot before deploying schema migrations:
   ```bash
   pg_dump -U <username> -h <host> -d <database> -F c -b -v -f "novacheck_backup_$(date +%Y%m%d_%H%M%S).dump"
   ```
3. **Restoration Protocol**:
   To restore from a backup snapshot:
   ```bash
   pg_restore -U <username> -h <host> -d <database> -v -c "novacheck_backup_20260927.dump"
   ```
4. **Drill Frequency**: Test backup restoration on a staging cluster once every quarter.

---

## 5. Safe Schema Migrations with Alembic

NovaCheck uses Alembic to manage database schema lifecycle without dropping tables:
```bash
# Check current migration head
alembic current

# Run pending migrations
alembic upgrade head

# Generate a new migration revision after model updates
alembic revision --autogenerate -m "add_new_field"
```

---

## 6. Health & Diagnostics

The `/api/v1/system/health` endpoint reports structured, non-leaking service health:
```json
{
  "status": "healthy",
  "database": "connected",
  "ai": "available",
  "service": "Practice Layer API",
  "version": "1.0.0",
  "environment": "production"
}
```
If the database connection is interrupted, the endpoint returns `HTTP 503 Service Unavailable` with `"database": "unavailable"`.
