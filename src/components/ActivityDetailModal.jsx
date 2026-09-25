import React from 'react';
import { useApp } from '../context/AppContext';

export function ActivityDetailModal() {
  const { selectedActivity, setSelectedActivity, showToast } = useApp();

  if (!selectedActivity) return null;

  const handleAddToSchedule = () => {
    showToast(`"${selectedActivity.name}" added to tomorrow's classroom plan!`);
    setSelectedActivity(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-surface-container flex items-start justify-between bg-surface-container-low/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                {selectedActivity.subject}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-highest text-secondary">
                {selectedActivity.targetLevel}
              </span>
            </div>
            <h2 className="font-headline-sm text-base md:text-lg text-on-surface font-bold">
              {selectedActivity.name}
            </h2>
          </div>
          <button
            onClick={() => setSelectedActivity(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <p className="font-body-md text-sm text-on-surface leading-relaxed">
            {selectedActivity.description}
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
            <div>
              <span className="font-label-sm text-on-surface-variant block uppercase text-[10px]">
                Recommended Duration
              </span>
              <span className="font-headline-sm font-bold text-on-surface">
                {selectedActivity.duration}
              </span>
            </div>
            <div>
              <span className="font-label-sm text-on-surface-variant block uppercase text-[10px]">
                Target Grades
              </span>
              <span className="font-headline-sm font-bold text-on-surface">
                {selectedActivity.grade}
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-surface-container">
              <span className="font-label-sm text-on-surface-variant block uppercase text-[10px]">
                Materials Needed
              </span>
              <span className="font-body-sm font-medium text-on-surface">
                {selectedActivity.materials}
              </span>
            </div>
          </div>

          {/* Step-by-Step Facilitation Guide */}
          <div className="space-y-2">
            <h3 className="font-headline-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Classroom Facilitation Steps
            </h3>
            <div className="space-y-2">
              {selectedActivity.steps?.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-container-low">
                  <div className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surface-container bg-surface-container-low/40 flex items-center justify-end gap-2">
          <button
            onClick={() => setSelectedActivity(null)}
            className="px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleAddToSchedule}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            <span>Use in Next Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
