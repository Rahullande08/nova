import React from 'react';
import { useApp } from '../context/AppContext';

export function AppSidebar() {
  const {
    currentRoute,
    setCurrentRoute,
    isNavDrawerOpen,
    setIsNavDrawerOpen,
    currentRole,
    setIsTransparencyModalOpen
  } = useApp();

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { id: 'overview-dashboard', label: 'Dashboard', icon: 'dashboard' }
      ]
    },
    {
      title: 'Teacher Practice',
      items: [
        { id: 'capture-evidence', label: 'Capture Evidence', icon: 'center_focus_strong' },
        { id: 'ai-coach-chat', label: 'AI Coach & Rubric', icon: 'psychology' },
        { id: 'my-practice-log', label: 'My Practice', icon: 'history_edu' },
        { id: 'activity-library', label: 'Activity Library', icon: 'menu_book' }
      ]
    },
    {
      title: 'Mentor / CRP',
      items: [
        { id: 'crp-mentor-dashboard', label: 'Mentor Dashboard', icon: 'supervisor_account' },
        { id: 'visit-plan', label: 'Visit Plan', icon: 'calendar_today' },
        { id: 'school-evidence-feed', label: 'School Evidence', icon: 'corporate_fare' },
        { id: 'mentor-visit-workflow', label: 'In-Visit Capture', icon: 'bolt' }
      ]
    },
    {
      title: 'Program Management',
      items: [
        { id: 'action-ledger', label: 'Action Ledger', icon: 'assignment' },
        { id: 'training-to-practice', label: 'Training → Practice', icon: 'model_training' },
        { id: 'reports-insights', label: 'Reports & Insights', icon: 'monitoring' }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'system-notifications', label: 'Notifications', icon: 'notifications_none' },
        { id: 'system-settings', label: 'Settings', icon: 'settings' }
      ]
    }
  ];

  const renderNavContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* Top logo */}
      <div className="p-4 flex items-center justify-between border-b border-surface-container">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentRoute('overview-dashboard')}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            PL
          </div>
          <span className="font-headline-sm text-on-surface font-bold text-base">PRACTICE LAYER</span>
        </div>
        {isNavDrawerOpen && (
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Links list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant px-2 font-semibold">
              {group.title}
            </p>
            {group.items.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentRoute(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 h-10 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-secondary/10 text-secondary font-semibold border-l-4 border-secondary pl-2'
                      : 'text-on-surface hover:bg-surface-container font-medium'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-secondary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-md text-sm truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}

        {/* AI Transparency Button in sidebar */}
        <div className="pt-2">
          <button
            onClick={() => {
              setIsTransparencyModalOpen(true);
              setIsNavDrawerOpen(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-left border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">policy</span>
            <span className="font-label-md text-xs font-semibold">AI Trust Architecture</span>
          </button>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">{currentRole.avatar}</span>
          </div>
          <div className="min-w-0">
            <p className="font-headline-sm text-xs font-bold text-on-surface leading-tight truncate">
              {currentRole.name}
            </p>
            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
              {currentRole.school}
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-surface-container-highest text-secondary font-bold flex-shrink-0">
          {currentRole.id.toUpperCase()}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Hidden on small screens) */}
      <aside className="hidden md:flex flex-col fixed top-16 left-0 bottom-0 w-64 bg-surface-container-lowest border-r border-surface-container z-30 shadow-sm">
        {renderNavContent()}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            onClick={() => setIsNavDrawerOpen(false)}
          />
          <aside className="relative w-4/5 max-w-sm h-full bg-surface-container-lowest flex flex-col justify-between shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1)] z-10 animate-in slide-in-from-left duration-300">
            {renderNavContent()}
          </aside>
        </div>
      )}
    </>
  );
}
