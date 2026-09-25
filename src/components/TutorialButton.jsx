import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';

export function TutorialButton({ pageKey, className = '', variant = 'outline' }) {
  const { openTutorial, language } = useApp();

  if (variant === 'pill') {
    return (
      <button
        onClick={() => openTutorial(pageKey)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 ${className}`}
        title="Open interactive tutorial for this page"
        type="button"
      >
        <span className="material-symbols-outlined text-[16px] text-secondary">help</span>
        <span>{getTranslation('tutorial', language, 'Tutorial')}</span>
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={() => openTutorial(pageKey)}
        className={`w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-secondary border border-outline-variant/40 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40 ${className}`}
        title="Open interactive tutorial for this page"
        type="button"
        aria-label="Open Tutorial"
      >
        <span className="material-symbols-outlined text-[18px]">help_outline</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => openTutorial(pageKey)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-xs font-semibold border border-outline-variant/50 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40 ${className}`}
      title="Open interactive tutorial for this page"
      type="button"
    >
      <span className="material-symbols-outlined text-[16px] text-secondary">help</span>
      <span>{getTranslation('tutorial', language, 'Tutorial')}</span>
    </button>
  );
}
