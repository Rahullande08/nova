import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialButton } from '../components/TutorialButton';

export function TrainingToPracticePage() {
  const { trainingModules, showToast, t } = useApp();

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto pb-8">
      {/* Header with Tutorial */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit">
              <span className="material-symbols-outlined text-[14px]">model_training</span>
              <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                {t('pedagogicalTransferAnalytics', 'Pedagogical Transfer Analytics')}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
              {t('demoDataFieldSim', 'DEMO DATA / FIELD SIMULATION')}
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('trainingToPractice', 'Training → Classroom Practice Transfer')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            {t('trainingToPracticeDesc', 'Close the gap between workshop participation and verified daily classroom behaviors.')}
          </p>
        </div>
        <TutorialButton pageKey="training-to-practice" variant="outline" className="shrink-0" />
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
          <span className="font-label-sm text-xs text-on-surface-variant block">{t('trainingModulesCard', 'Training Modules')}</span>
          <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric mt-1 block">3 {t('active', 'Active')}</span>
          <span className="text-[11px] text-on-tertiary-container font-semibold">100% {t('attendance', 'attendance')}</span>
        </div>
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
          <span className="font-label-sm text-xs text-on-surface-variant block">{t('teachersReached', 'Teachers Reached')}</span>
          <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric mt-1 block">48</span>
          <span className="text-[11px] text-on-surface-variant">{t('acrossHaveliBlock', 'Across Haveli Block')}</span>
        </div>
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
          <span className="font-label-sm text-xs text-on-surface-variant block">{t('classroomPracticeAdoption', 'Classroom Practice Adoption')}</span>
          <span className="font-headline-lg text-2xl md:text-3xl font-bold text-secondary font-numeric mt-1 block">71%</span>
          <span className="text-[11px] text-secondary font-semibold">{t('shiftPostVisit', '+18% shift post-visit')}</span>
        </div>
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
          <span className="font-label-sm text-xs text-on-surface-variant block">{t('verifiedShifts', 'Verified Shifts')}</span>
          <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-tertiary-container font-numeric mt-1 block">60%</span>
          <span className="text-[11px] text-on-tertiary-container font-semibold">{t('fieldVerifiedByCRP', 'Field verified by CRP')}</span>
        </div>
      </div>

      {/* Critical Highlight Card: Where Training is NOT Translating */}
      <div className="p-4 md:p-5 rounded-xl bg-gradient-to-r from-error-container/40 via-surface-container-low to-surface-container-low border border-error/30 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[18px]">priority_high</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
              {t('whereTrainingNotTranslating', 'Where Training is Not Translating into Practice')}
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {t('instructionalFrictionDesc', 'Instructional friction detected across 16 multi-grade classrooms in Block Haveli.')}
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/20 space-y-2 text-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-bold text-on-surface text-sm">
                {t('moduleExitChecks', 'Module: "3-Minute Formative Exit Checks"')}
              </span>
              <p className="text-on-surface-variant mt-0.5">
                {t('moduleExitChecksStats', '93% completed workshop, but only 52% adopted in daily FLN sessions.')}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold text-[10px]">
              {t('transferGap', 'Transfer Gap -41%')}
            </span>
          </div>

          <div className="p-2 rounded bg-surface-container-low border border-outline-variant/15 flex items-center justify-between">
            <span className="font-medium text-on-surface">
              {t('identifiedRootCause', 'Identified Root Cause:')} <strong>{t('rootCauseTimeLimit', 'Teachers run out of time at the end of the 45-min period.')}</strong>
            </span>
            <button
              onClick={() => showToast(t('actionDispatchedToast', 'Action recommendation dispatched to CRP visit plans!'))}
              className="px-2.5 py-1 bg-secondary text-on-secondary rounded text-[11px] font-bold shadow-xs hover:bg-secondary/90 shrink-0 cursor-pointer"
            >
              {t('deployPromptCards', 'Deploy Prompt Cards')}
            </button>
          </div>
        </div>
      </div>

      {/* Module Breakdown List */}
      <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
        <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
          {t('trainingModulesAndTransfer', 'Training Modules & Verified Transfer Rate')}
        </h2>

        <div className="space-y-3">
          {trainingModules.map((mod) => (
            <div
              key={mod.id}
              className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wide">
                    {mod.domain}
                  </span>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface mt-0.5">
                    {mod.title}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    mod.status === 'High Impact'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : 'bg-error-container text-on-error-container'
                  }`}
                >
                  {mod.status === 'High Impact' ? t('highImpact', 'High Impact') :
                   mod.status === 'Needs Reinforcement' ? t('needsReinforcement', 'Needs Reinforcement') : mod.status}
                </span>
              </div>

              {/* Progress bars: Completion vs Practice Adoption */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-on-surface-variant font-medium text-[11px]">
                    <span>{t('workshopCompletion', 'Workshop Completion')}</span>
                    <span className="font-bold text-on-surface font-numeric">{mod.teachersCompleted}/{mod.teachersEnrolled} ({Math.round((mod.teachersCompleted / mod.teachersEnrolled) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(mod.teachersCompleted / mod.teachersEnrolled) * 100}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-on-surface-variant font-medium text-[11px]">
                    <span>{t('classroomAdoption', 'Classroom Adoption')}</span>
                    <span className="font-bold text-secondary font-numeric">{mod.adoptionRate}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${mod.adoptionRate}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-surface-container text-on-surface-variant">
                <span>{t('identifiedFrictionLabel', 'Identified Friction:')} <strong>{mod.frictionPoint}</strong></span>
                <span className="text-secondary font-semibold">{mod.systemAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
