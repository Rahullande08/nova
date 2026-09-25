import React from 'react';
import { useApp } from '../context/AppContext';

export function BottomNavBar() {
  const { currentRoute, setCurrentRoute, setIsNavDrawerOpen } = useApp();

  const navTabs = [
    { id: 'overview-dashboard', label: 'Overview', icon: 'dashboard' },
    { id: 'capture-evidence', label: 'Capture', icon: 'add', isCenterAction: true },
    { id: 'ai-coach-chat', label: 'AI Coach', icon: 'psychology' },
    { id: 'crp-mentor-dashboard', label: 'CRP/Schools', icon: 'corporate_fare' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.04)] md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navTabs.map((tab) => {
          const isActive = currentRoute === tab.id;

          if (tab.isCenterAction) {
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentRoute(tab.id)}
                className="flex flex-col items-center justify-center min-w-[56px] h-14 -mt-4 relative group"
                type="button"
                aria-label="Capture Evidence"
              >
                <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg active:scale-95 group-hover:scale-105 transition-all">
                  <span className="material-symbols-outlined text-[26px]">add</span>
                </div>
                <span className="font-label-sm text-[11px] mt-0.5 text-on-surface font-semibold">
                  Capture
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentRoute(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
                isActive
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-label-sm text-[11px]">{tab.label}</span>
            </button>
          );
        })}

        {/* More drawer trigger */}
        <button
          onClick={() => setIsNavDrawerOpen(true)}
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
          <span className="font-label-sm text-[11px]">More</span>
        </button>
      </div>
    </nav>
  );
}
