import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function PracticeLoopBanner() {
  const { setCurrentRoute, t } = useApp();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      title: t('loopStage1Title', 'CAPTURE'),
      sub: t('loopStage1Sub', 'Teacher evidence'),
      icon: 'photo_camera',
      route: 'capture-evidence'
    },
    {
      num: '02',
      title: t('loopStage2Title', 'UNDERSTAND'),
      sub: t('loopStage2Sub', 'AI practice coding'),
      icon: 'psychology',
      route: 'ai-coach-chat'
    },
    {
      num: '03',
      title: t('loopStage3Title', 'COACH'),
      sub: t('loopStage3Sub', '1 concrete step'),
      icon: 'lightbulb',
      route: 'ai-coach-chat'
    },
    {
      num: '04',
      title: t('loopStage4Title', 'ROUTE'),
      sub: t('loopStage4Sub', 'CRP targeted visit'),
      icon: 'share_location',
      route: 'crp-mentor-dashboard'
    },
    {
      num: '05',
      title: t('loopStage5Title', 'VERIFY'),
      sub: t('loopStage5Sub', 'Observed change'),
      icon: 'verified',
      route: 'action-ledger'
    },
    {
      num: '06',
      title: t('loopStage6Title', 'LEARN'),
      sub: t('loopStage6Sub', 'Training refinement'),
      icon: 'school',
      route: 'training-to-practice'
    }
  ];

  return (
    <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-secondary">autorenew</span>
          <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
            {t('practiceLoopTitle', 'The Practice Loop')}
          </h2>
        </div>
        <span className="font-label-sm text-xs text-secondary font-semibold bg-secondary/10 px-2.5 py-0.5 rounded-full">
          {t('continuousCycle', 'Continuous Instructional Cycle')}
        </span>
      </div>
      <p className="font-body-sm text-xs md:text-sm text-on-surface-variant mb-4">
        {t('practiceLoopDesc', 'Real-time instructional calibration from classroom evidence to state policy refinement.')}
      </p>

      {/* Stepper horizontal chain */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1 flex items-center gap-2 no-scrollbar" id="practice-loop-container">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === idx;
          return (
            <React.Fragment key={stage.num}>
              <div
                onClick={() => {
                  setActiveStage(idx);
                  setCurrentRoute(stage.route);
                }}
                className={`flex-shrink-0 w-32 rounded-lg p-2.5 flex flex-col gap-1 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-surface-container-highest border-secondary/40 shadow-sm scale-102'
                    : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs text-secondary font-bold">{stage.num}</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    {stage.icon}
                  </span>
                </div>
                <span className="font-label-md text-xs text-on-surface font-bold tracking-tight">
                  {stage.title}
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight truncate">
                  {stage.sub}
                </span>
              </div>

              {idx < stages.length - 1 && (
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40 flex-shrink-0">
                  arrow_forward
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
