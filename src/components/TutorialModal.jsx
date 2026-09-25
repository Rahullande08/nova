import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TUTORIALS_DATA, ONBOARDING_TOUR_STEPS } from '../data/tutorialsData';
import { getTranslation } from '../data/translations';

export function TutorialModal() {
  const {
    isTutorialOpen,
    setIsTutorialOpen,
    tutorialPageKey,
    isTourOpen,
    setIsTourOpen,
    tourStep,
    setTourStep,
    currentRoute,
    setCurrentRoute,
    language
  } = useApp();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isTutorialOpen) setIsTutorialOpen(false);
        if (isTourOpen) setIsTourOpen(false);
      }
    };
    if (isTutorialOpen || isTourOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTutorialOpen, isTourOpen, setIsTutorialOpen, setIsTourOpen]);

  if (!isTutorialOpen && !isTourOpen) return null;

  // Render Guided Tour Modal
  if (isTourOpen) {
    const currentTourStep = ONBOARDING_TOUR_STEPS[tourStep] || ONBOARDING_TOUR_STEPS[0];
    const isLastStep = tourStep === ONBOARDING_TOUR_STEPS.length - 1;

    const handleNextTourStep = () => {
      if (isLastStep) {
        setIsTourOpen(false);
        setTourStep(0);
      } else {
        const nextIdx = tourStep + 1;
        setTourStep(nextIdx);
        const nextRoute = ONBOARDING_TOUR_STEPS[nextIdx].targetRoute;
        if (nextRoute) {
          setCurrentRoute(nextRoute);
        }
      }
    };

    const handlePrevTourStep = () => {
      if (tourStep > 0) {
        const prevIdx = tourStep - 1;
        setTourStep(prevIdx);
        const prevRoute = ONBOARDING_TOUR_STEPS[prevIdx].targetRoute;
        if (prevRoute) {
          setCurrentRoute(prevRoute);
        }
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm animate-in fade-in">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentTourStep.title}
          className="bg-surface-container-lowest rounded-2xl max-w-lg w-full border border-outline-variant/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        >
          {/* Header */}
          <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">explore</span>
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary/10 text-secondary">
                  {currentTourStep.badge}
                </span>
                <h3 className="font-headline-sm font-bold text-on-surface text-base">
                  {currentTourStep.title}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsTourOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              aria-label="Close tour"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            <p className="font-body-md text-on-surface leading-relaxed">
              {currentTourStep.description}
            </p>

            <div className="flex items-center justify-center gap-1.5 pt-2">
              {ONBOARDING_TOUR_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === tourStep ? 'w-6 bg-secondary' : 'w-2 bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-surface-container-lowest border-t border-surface-container flex items-center justify-between gap-3">
            <button
              onClick={() => setIsTourOpen(false)}
              className="text-xs text-on-surface-variant hover:text-on-surface font-medium px-2 py-1"
            >
              {getTranslation('skipTour', language, 'Skip Tour')}
            </button>
            <div className="flex items-center gap-2">
              {tourStep > 0 && (
                <button
                  onClick={handlePrevTourStep}
                  className="px-3 py-1.5 rounded-lg border border-outline-variant/60 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                >
                  {getTranslation('previous', language, 'Previous')}
                </button>
              )}
              <button
                onClick={handleNextTourStep}
                className="px-4 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold shadow-sm hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
              >
                <span>{isLastStep ? getTranslation('finish', language, 'Finish') : currentTourStep.actionLabel || getTranslation('next', language, 'Next')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Page-Specific Tutorial
  const activeKey = tutorialPageKey || currentRoute || 'overview-dashboard';
  const tutorial = TUTORIALS_DATA[activeKey] || TUTORIALS_DATA['overview-dashboard'];

  return (
    <div
      onClick={() => setIsTutorialOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={tutorial.title}
        className="bg-surface-container-lowest rounded-2xl max-w-xl w-full border border-outline-variant/50 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">help_outline</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm font-bold text-on-surface text-base sm:text-lg">
                  {tutorial.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-container-highest text-on-surface-variant">
                  {tutorial.badge}
                </span>
              </div>
              <p className="font-label-sm text-[12px] text-on-surface-variant -mt-0.5">
                Practice Layer Interactive Guide
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTutorialOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            aria-label="Close tutorial"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Summary Banner */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <p className="font-label-sm font-semibold text-on-surface text-xs mb-1">
              What is this page?
            </p>
            <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm leading-relaxed">
              {tutorial.summary}
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            <p className="font-label-sm font-bold text-[11px] uppercase tracking-wider text-on-surface-variant">
              Key Features & Workflow
            </p>
            <div className="space-y-2.5">
              {tutorial.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/40 transition-colors flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-label-md font-semibold text-on-surface text-xs sm:text-sm">
                      {step.title}
                    </h4>
                    <p className="font-body-sm text-on-surface-variant text-xs mt-0.5 leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro-Tip Box */}
          {tutorial.proTip && (
            <div className="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                lightbulb
              </span>
              <div>
                <span className="font-label-sm font-bold text-secondary text-xs">Pro Tip: </span>
                <span className="font-body-sm text-on-surface text-xs">
                  {tutorial.proTip}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-lowest border-t border-surface-container flex items-center justify-end">
          <button
            onClick={() => setIsTutorialOpen(false)}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md font-bold text-xs sm:text-sm shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-1.5"
          >
            <span>{getTranslation('gotIt', language, 'Got It')}</span>
            <span className="material-symbols-outlined text-[16px]">check</span>
          </button>
        </div>
      </div>
    </div>
  );
}
