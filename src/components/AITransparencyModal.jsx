import React from 'react';
import { useApp } from '../context/AppContext';

export function AITransparencyModal() {
  const { isTransparencyModalOpen, setIsTransparencyModalOpen } = useApp();

  if (!isTransparencyModalOpen) return null;

  const pipelineStages = [
    {
      step: '01',
      title: 'Teacher Evidence',
      actor: 'Human (Teacher)',
      actorType: 'human',
      desc: 'Teacher captures raw classroom tracker photo or records 60s voice note in Marathi/Hindi.',
      safetyRule: 'No child faces required. Audio purged post-transcription.'
    },
    {
      step: '02',
      title: 'Speech & OCR Extraction',
      actor: 'AI Model (ASR / OCR)',
      actorType: 'ai',
      desc: 'Extracts student tallies into FLN tiers (Beginner, Letter, Word, Story) and transcribes spoken reflections.',
      safetyRule: 'Zero teacher ranking. Clinical linguistic parsing only.'
    },
    {
      step: '03',
      title: 'Practice Rubric Coding',
      actor: 'AI Model (5-Point Protocol)',
      actorType: 'ai',
      desc: 'Evaluates evidence against neutral rubric (Observed / Partly observed / Not observed in submitted evidence).',
      safetyRule: 'Strictly non-evaluative. Every flag carries open verifiable citation.'
    },
    {
      step: '04',
      title: 'Coaching Suggestion',
      actor: 'AI Instructional Coach',
      actorType: 'ai',
      desc: 'Generates exactly ONE immediate next step actionable tomorrow with targeted 10-minute activity pick.',
      safetyRule: 'Calibrated to SCERT foundational literacy pedagogical norms.'
    },
    {
      step: '05',
      title: 'Visit Priority Routing',
      actor: 'Deterministic Rule Engine',
      actorType: 'rule',
      desc: 'Priority queue computed deterministically: (1) Repeated signal + (2) Days since visit >14d + (3) Teacher request.',
      safetyRule: 'No black-box scoring. 100% transparent audit trail.'
    },
    {
      step: '06',
      title: 'Mentor Visit & Demonstration',
      actor: 'Human (CRP / Mentor)',
      actorType: 'human',
      desc: 'Cluster Resource Person conducts physical classroom visit, models practice, and reviews teacher progress.',
      safetyRule: 'Empathetic coaching orientation. Collaborative problem-solving.'
    },
    {
      step: '07',
      title: 'Verification & State Learning',
      actor: 'Human Verification + System Sync',
      actorType: 'hybrid',
      desc: 'Mentor verifies observed shift. Aggregated signals inform state training modules without identifying individuals.',
      safetyRule: 'Data used to allocate institutional support, never punitive.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[22px]">policy</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base md:text-lg text-on-surface font-bold">
                AI Transparency & Governance Architecture
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Explicit separation of AI diagnostic synthesis vs. Human deterministic decisions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTransparencyModalOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {/* Key Principles Banner */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-secondary font-bold">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>AI Automated Scope</span>
              </div>
              <p className="text-on-surface-variant">
                Speech transcription, OCR tallying, 5-point neutral rubric coding, single next-step suggestion.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-tertiary-fixed/30 border border-on-tertiary-container/20 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-on-tertiary-container font-bold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Deterministic / Human Scope</span>
              </div>
              <p className="text-on-surface-variant">
                Visit prioritization (rule-based SLA), classroom demonstration, final verification, policy decisions.
              </p>
            </div>
          </div>

          {/* Step by Step Interactive Pipeline */}
          <div className="space-y-3">
            <h3 className="font-label-sm text-xs uppercase tracking-wider font-bold text-on-surface-variant">
              The 7-Stage Diagnostic Pipeline
            </h3>

            <div className="space-y-2.5">
              {pipelineStages.map((stage) => {
                const isAI = stage.actorType === 'ai';
                const isHuman = stage.actorType === 'human';
                const isRule = stage.actorType === 'rule';

                return (
                  <div
                    key={stage.step}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3 hover:bg-surface-container transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary font-bold text-xs shadow-sm flex-shrink-0">
                      {stage.step}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                          {stage.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isAI
                              ? 'bg-secondary-fixed text-on-secondary-fixed'
                              : isHuman
                              ? 'bg-primary text-on-primary'
                              : isRule
                              ? 'bg-surface-container-highest text-on-surface'
                              : 'bg-tertiary-fixed text-on-tertiary-fixed'
                          }`}
                        >
                          {stage.actor}
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                        {stage.desc}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-on-surface-variant pt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-secondary">security</span>
                        <span>{stage.safetyRule}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-container bg-surface-container-low/40 flex items-center justify-between">
          <span className="font-label-sm text-[11px] text-on-surface-variant">
            ISO 42001 & FLN Responsible AI Framework Aligned
          </span>
          <button
            onClick={() => setIsTransparencyModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
