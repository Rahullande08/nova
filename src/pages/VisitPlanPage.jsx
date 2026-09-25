import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialButton } from '../components/TutorialButton';

export function VisitPlanPage() {
  const { schools, setSelectedSchoolId, setCurrentRoute, t } = useApp();
  const [selectedDate, setSelectedDate] = useState('Today');

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              Field Routing Schedule
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('visitPlan', 'Cluster Mentor Visit Plan')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Deterministic daily visit prioritization based on classroom signals and SLA intervals.
          </p>
        </div>
        <TutorialButton pageKey="visit-plan" variant="outline" className="shrink-0" />
      </div>

      {/* Date Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['Today (Fri)', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              selectedDate === date
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Visit Queue Cards */}
      <div className="space-y-3">
        {schools.map((school, index) => (
          <div
            key={school.id}
            className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
                  {school.name}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    school.priority === 'HIGH'
                      ? 'bg-error-container text-on-error-container'
                      : school.priority === 'MEDIUM'
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-tertiary-fixed text-on-tertiary-fixed'
                  }`}
                >
                  {school.priority}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Pedagogical Objective: <strong>{school.suggestedDemo}</strong>
              </p>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant pt-0.5">
                <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
                <span>Last visit: {school.daysSinceVisit} days ago</span>
                <span>• {school.teachersCount} Teachers</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setSelectedSchoolId(school.id);
                  setCurrentRoute('mentor-visit-workflow');
                }}
                className="px-3 py-1.5 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:bg-secondary/90 shadow-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Start Visit</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSchoolId(school.id);
                  setCurrentRoute('school-evidence-feed');
                }}
                className="px-3 py-1.5 bg-surface-container text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-container-high"
              >
                Evidence Feed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
