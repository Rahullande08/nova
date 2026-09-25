import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_ROLES } from '../data/mockData';

export function AppHeader() {
  const {
    currentRoute,
    setCurrentRoute,
    language,
    setLanguage,
    isDemoMode,
    setIsDemoMode,
    setIsNavDrawerOpen,
    notifications,
    currentRole,
    setCurrentRole,
    setIsTransparencyModalOpen
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getRouteTitle = () => {
    switch (currentRoute) {
      case 'overview-dashboard':
        return 'Overview Dashboard';
      case 'capture-evidence':
        return 'Capture Evidence';
      case 'ai-coach-chat':
        return 'AI Practice Coach';
      case 'my-practice-log':
        return 'My Practice History';
      case 'activity-library':
        return 'Activity Library';
      case 'crp-mentor-dashboard':
        return 'Mentor Dashboard';
      case 'visit-plan':
        return 'CRP Visit Plan';
      case 'school-evidence-feed':
        return 'School Evidence Feed';
      case 'mentor-visit-workflow':
        return 'In-Visit Fast Capture';
      case 'action-ledger':
        return 'Action Ledger';
      case 'training-to-practice':
        return 'Training → Practice Analytics';
      case 'reports-insights':
        return 'Reports & Insights';
      case 'system-notifications':
        return 'Notification Center';
      case 'system-settings':
        return 'Platform Settings';
      default:
        return 'Practice Layer';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left branding & menu button */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            aria-label="Open Navigation Menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-secondary md:hidden"
            onClick={() => setIsNavDrawerOpen(true)}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Logo SVG */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setCurrentRoute('overview-dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm font-headline-sm font-bold text-sm">
              PL
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm md:text-base text-on-surface uppercase tracking-tight font-bold">
                PRACTICE LAYER
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant -mt-1 hidden sm:inline">
                {getRouteTitle()}
              </span>
            </div>
          </div>

          {/* Demo Mode Pill */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-[11px] bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest transition-colors"
            title="Click to toggle Demo Mode indicator"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            {isDemoMode ? 'Demo Mode' : 'Live Sync'}
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* AI Transparency Button */}
          <button
            onClick={() => setIsTransparencyModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-sm font-medium border border-outline-variant/40 transition-colors"
            title="View Deterministic AI Transparency Pipeline"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">policy</span>
            <span>AI Trust Guardrails</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30">
            {['EN', 'HI', 'MR'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded font-label-sm text-[11px] transition-all ${
                  language === lang
                    ? 'font-bold bg-surface-container-lowest text-secondary shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                    : 'font-medium text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Notifications button */}
          <button
            aria-label="Notifications"
            onClick={() => setCurrentRoute('system-notifications')}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"></span>
            )}
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              aria-label="User Profile & Role Switcher"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-secondary/30 transition-all focus:outline-none"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[18px]">{currentRole.avatar}</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant hidden md:inline">
                expand_more
              </span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-surface-container">
                  <p className="font-label-sm font-semibold text-on-surface">{currentRole.name}</p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">{currentRole.school}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-surface-container-highest text-secondary">
                    {currentRole.roleLabel}
                  </span>
                </div>

                <div className="p-1">
                  <p className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant px-2 py-1">
                    Switch Role (Demo Simulation)
                  </p>
                  {Object.values(APP_ROLES).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setCurrentRole(role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                        currentRole.id === role.id
                          ? 'bg-secondary/10 text-secondary font-semibold'
                          : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{role.avatar}</span>
                      <div className="truncate">
                        <div className="font-medium">{role.name}</div>
                        <div className="text-[10px] text-on-surface-variant">{role.roleLabel}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-surface-container p-1">
                  <button
                    onClick={() => {
                      setCurrentRoute('system-settings');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs text-on-surface hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">settings</span>
                    <span>Platform Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
