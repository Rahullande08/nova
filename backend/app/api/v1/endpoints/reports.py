from typing import Dict, Any
from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import School
from backend.app.services.report_service import report_service

router = APIRouter()

@router.get("", response_model=Dict[str, Any])
def get_reports_summary(db: Session = Depends(get_db)):
    return report_service.get_aggregated_reports(db)

@router.get("/export-csv")
def export_csv(db: Session = Depends(get_db)):
    schools = db.query(School).all()
    csv_lines = [
        "School,Block,FLN Teachers,Students,Priority,Days Since Visit,Flagged Signal"
    ]
    for s in schools:
        csv_lines.append(
            f'"{s.name}","{s.block}",{s.teachers_count},{s.students_count},"{s.priority}",{s.days_since_visit},"{s.flagged_signal}"'
        )
    csv_data = "\n".join(csv_lines)
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=Practice_Layer_Fidelity_Report.csv"}
    )
