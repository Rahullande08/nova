import React from 'react';
import { useApp } from '../context/AppContext';

export function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-outline-variant/30 text-xs md:text-sm font-semibold">
        <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
          check_circle
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
