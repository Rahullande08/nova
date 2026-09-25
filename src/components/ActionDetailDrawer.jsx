import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function ActionDetailDrawer() {
  const { selectedAction, setSelectedAction, updateActionStatus, showToast } = useApp();
  const [verificationNote, setVerificationNote] = useState('');

  if (!selectedAction) return null;

  const handleStatusChange = (status) => {
    updateActionStatus(selectedAction.id, status);
    setSelectedAction({ ...selectedAction, status });
  };

  const handleAddVerification = (e) => {
    e.preventDefault();
    if (!verificationNote.trim()) return;
    showToast('Mentor verification logged to Action Ledger!');
    setVerificationNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-surface-container-lowest shadow-2xl border-l border-outline-variant/30 flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 border-b border-surface-container flex items-start justify-between bg-surface-container-low/50">
          <div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant block">
              Action Item #{selectedAction.id}
            </span>
            <h2 className="font-headline-sm text-base font-bold text-on-surface mt-0.5">
              Action Detail & Verification
            </h2>
          </div>
          <button
            onClick={() => setSelectedAction(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-xs font-bold text-on-surface-variant">Status</span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-label-sm text-xs font-bold ${
                  selectedAction.status === 'Verified' || selectedAction.status === 'Closed'
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                    : selectedAction.status === 'In Progress'
                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                {selectedAction.status}
              </span>
            </div>
            <p className="font-headline-sm text-sm font-bold text-on-surface">
              {selectedAction.action}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block text-[10px] uppercase">School</span>
              <span className="font-semibold text-on-surface">{selectedAction.school}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block text-[10px] uppercase">Assigned To</span>
              <span className="font-semibold text-on-surface">{selectedAction.targetTeacher}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block text-[10px] uppercase">Created Date</span>
              <span className="font-semibold text-on-surface">{selectedAction.createdDate}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant block text-[10px] uppercase">Due Date</span>
              <span className="font-semibold text-error">{selectedAction.dueDate}</span>
            </div>
          </div>

          {/* Evidence Required */}
          <div className="space-y-1.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="flex items-center gap-1.5 text-secondary font-bold text-xs">
              <span className="material-symbols-outlined text-[16px]">attachment</span>
              <span>Evidence Required for Verification</span>
            </div>
            <p className="font-body-sm text-xs text-on-surface">
              {selectedAction.evidenceRequired}
            </p>
            {selectedAction.notes && (
              <p className="font-body-sm text-xs text-on-surface-variant italic pt-1 border-t border-surface-container">
                "{selectedAction.notes}"
              </p>
            )}
          </div>

          {/* Change Status Buttons */}
          <div className="space-y-2">
            <span className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
              Update Status Workflow
            </span>
            <div className="grid grid-cols-2 gap-2">
              {['Open', 'In Progress', 'Verified', 'Closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    selectedAction.status === status
                      ? 'bg-primary text-on-primary shadow-sm ring-2 ring-secondary'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Add Mentor Verification Note */}
          <form onSubmit={handleAddVerification} className="space-y-2 pt-2 border-t border-surface-container">
            <label className="font-label-sm text-xs font-bold text-on-surface-variant block">
              Log Verification Note / Field Finding
            </label>
            <textarea
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              placeholder="e.g. Observed 4-corner group rotation during morning visit..."
              rows={3}
              className="w-full p-2.5 rounded-lg border border-outline-variant text-xs bg-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-secondary text-on-secondary rounded-lg font-bold text-xs shadow-sm hover:bg-secondary/90 transition-colors"
            >
              Add Mentor Note
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-container bg-surface-container-low/40 flex justify-end">
          <button
            onClick={() => setSelectedAction(null)}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
