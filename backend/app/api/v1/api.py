from fastapi import APIRouter
from backend.app.api.v1.endpoints import (
    auth,
    dashboard,
    schools,
    evidence,
    actions,
    activities,
    training,
    reports,
    notifications,
    observations,
    system
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(schools.router, prefix="/schools", tags=["Schools & Visits"])
api_router.include_router(evidence.router, prefix="/evidence", tags=["Evidence & AI Analysis"])
api_router.include_router(actions.router, prefix="/actions", tags=["Action Ledger"])
api_router.include_router(activities.router, prefix="/activities", tags=["Activity Library"])
api_router.include_router(training.router, prefix="/training", tags=["Training to Practice"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports & Insights"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(observations.router, prefix="/observations", tags=["Mentor Observations"])
api_router.include_router(system.router, prefix="/system", tags=["System & Admin"])
