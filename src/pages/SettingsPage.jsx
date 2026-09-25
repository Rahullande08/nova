import React from 'react';
import { useApp } from '../context/AppContext';
import { APP_ROLES } from '../data/mockData';

export function SettingsPage() {
  const {
    currentRole,
    setCurrentRole,
    language,
    setLanguage,
    isDemoMode,
    setIsDemoMode,
    setIsTransparencyModalOpen,
    showToast
  } = useApp();

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
          <span className="material-symbols-outlined text-[14px]">settings</span>
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
            Configuration & Trust Policy
          </span>
        </div>
        <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
          Platform Settings
        </h1>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
          User roles, language preferences, and institutional privacy guardrails.
        </p>
      </div>

      {/* Profile & Role Section */}
      <div className="p-4 md:p-5 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
        <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
          User Identity & Persona
        </h2>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">{currentRole.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">{currentRole.name}</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">{currentRole.school}</p>
            <p className="font-label-sm text-[11px] text-secondary font-semibold">{currentRole.roleLabel}</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase block">
            Switch Operating Persona
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.values(APP_ROLES).map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setCurrentRole(role);
                  showToast(`Switched persona to ${role.name} (${role.roleLabel})`);
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentRole.id === role.id
                    ? 'bg-secondary text-on-secondary border-secondary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[18px]">{role.avatar}</span>
                  <span className="text-xs font-bold">{role.name}</span>
                </div>
                <span className="text-[10px] block opacity-85 leading-tight">{role.roleLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language Preference */}
      <div className="p-4 md:p-5 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
          Diagnostic & Voice Language
        </h2>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: 'MR', label: 'मराठी (Marathi)', desc: 'Primary statecraft norm' },
            { id: 'HI', label: 'हिंदी (Hindi)', desc: 'FLN Hindi national norm' },
            { id: 'EN', label: 'English', desc: 'Administrative review' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLanguage(l.id);
                showToast(`Language set to ${l.label}`);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                language === l.id
                  ? 'bg-secondary text-on-secondary border-secondary font-bold shadow-sm'
                  : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container'
              }`}
            >
              <div className="font-bold text-xs">{l.label}</div>
              <span className="text-[10px] block opacity-80 mt-0.5">{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy, Trust & Data Retention Commitments */}
      <div className="p-4 md:p-5 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
            Institutional Trust & AI Transparency
          </h2>
          <button
            onClick={() => setIsTransparencyModalOpen(true)}
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">policy</span>
            <span>View Architecture</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-surface-container-low rounded-lg flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">delete_forever</span>
            <div>
              <strong className="text-on-surface block">Audio Purge Protocol:</strong>
              <span className="text-on-surface-variant">
                Voice notes are deleted immediately after clinical transcription is verified.
              </span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">face_retouching_off</span>
            <div>
              <strong className="text-on-surface block">Child Face Privacy:</strong>
              <span className="text-on-surface-variant">
                Facial recognition is strictly prohibited. Only learning artifacts and trackers are mapped.
              </span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg flex items-start gap-2.5">
            <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">volunteer_activism</span>
            <div>
              <strong className="text-on-surface block">Non-Punitive Support Policy:</strong>
              <span className="text-on-surface-variant">
                Data is exclusively used for targeted CRP coaching allocation, never teacher rankings.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
