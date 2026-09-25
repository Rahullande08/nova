import React from 'react';
import { useApp } from '../context/AppContext';
import { PracticeLoopBanner } from '../components/PracticeLoopBanner';

export function DashboardPage() {
  const { setCurrentRoute, setSelectedSchoolId, showToast } = useApp();

  const handleSchoolClick = (schoolId) => {
    setSelectedSchoolId(schoolId);
    setCurrentRoute('school-evidence-feed');
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200">
      {/* Header Section */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-xs text-on-secondary-fixed font-semibold">
              Live Operational Pulse
            </span>
          </div>
          <span className="font-label-sm text-xs text-on-surface-variant bg-surface-container-high px-2.5 py-0.5 rounded-full">
            Block Haveli • Pune Rural
          </span>
        </div>
        <div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold tracking-tight">
            Practice Overview
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            See what is happening in classrooms — and where support is needed.
          </p>
        </div>
      </section>

      {/* Practice Loop 6-Stage Banner */}
      <PracticeLoopBanner />

      {/* Top KPI Cards (2x2 on mobile, 4x1 on desktop) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {/* KPI 1 */}
        <div
          onClick={() => setCurrentRoute('school-evidence-feed')}
          className="bg-surface-container-lowest rounded-xl p-3.5 md:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all hover:shadow-md active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant">Schools Covered</span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold tracking-tight font-numeric">
              10
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-on-tertiary-container text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>+2 this month</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div
          onClick={() => setCurrentRoute('my-practice-log')}
          className="bg-surface-container-lowest rounded-xl p-3.5 md:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all hover:shadow-md active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant">Teachers Active</span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold tracking-tight font-numeric">
              42
            </span>
            <p className="font-label-sm text-xs text-on-surface-variant mt-0.5 font-medium">
              78% submitting
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => setCurrentRoute('capture-evidence')}
          className="bg-surface-container-lowest rounded-xl p-3.5 md:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all hover:shadow-md active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant">Practice Signals</span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold tracking-tight font-numeric">
              156
            </span>
            <p className="font-label-sm text-xs text-on-surface-variant mt-0.5 font-medium">
              This month
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div
          onClick={() => setCurrentRoute('action-ledger')}
          className="bg-surface-container-lowest rounded-xl p-3.5 md:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all hover:shadow-md active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant">Actions Closed</span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold tracking-tight font-numeric">
              84%
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-on-tertiary-container text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+12% vs last mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Health Funnel Card */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Practice Health Funnel
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Pipeline from classroom signal to validated shift
            </p>
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold">
            60% Conversion
          </div>
        </div>

        {/* 3 Step Progress Cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Step 1 */}
          <div
            onClick={() => setCurrentRoute('capture-evidence')}
            className="bg-surface-container-low rounded-lg p-2.5 flex flex-col justify-between border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-all"
          >
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2 overflow-hidden">
              <div className="bg-secondary h-full rounded-full w-full"></div>
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Observed
              </span>
              <p className="font-headline-sm text-base md:text-lg text-on-surface font-bold font-numeric">
                156
              </p>
              <p className="font-label-sm text-[11px] text-on-surface-variant">signals logged</p>
            </div>
            <span className="font-label-sm text-[11px] text-secondary font-semibold mt-2">
              100% Base
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setCurrentRoute('action-ledger')}
            className="bg-surface-container-low rounded-lg p-2.5 flex flex-col justify-between border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-all"
          >
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2 overflow-hidden">
              <div className="bg-secondary h-full rounded-full w-3/4"></div>
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Acted On
              </span>
              <p className="font-headline-sm text-base md:text-lg text-on-surface font-bold font-numeric">
                119
              </p>
              <p className="font-label-sm text-[11px] text-on-surface-variant">action steps</p>
            </div>
            <span className="font-label-sm text-[11px] text-secondary font-semibold mt-2">
              76% of total
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setCurrentRoute('action-ledger')}
            className="bg-surface-container-low rounded-lg p-2.5 flex flex-col justify-between border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-all"
          >
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2 overflow-hidden">
              <div className="bg-on-tertiary-container h-full rounded-full w-[60%]"></div>
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Verified
              </span>
              <p className="font-headline-sm text-base md:text-lg text-on-surface font-bold font-numeric">
                93
              </p>
              <p className="font-label-sm text-[11px] text-on-surface-variant">field verified</p>
            </div>
            <span className="font-label-sm text-[11px] text-on-tertiary-container font-semibold mt-2">
              60% closed
            </span>
          </div>
        </div>
      </section>

      {/* AI Practice Pulse Callout Card */}
      <section className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/30 space-y-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary-fixed/30 pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                AI Practice Pulse
              </h2>
              <p className="font-label-sm text-xs text-on-surface-variant">
                Dominant instructional friction
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-semibold inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
            Intervention Recommended
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-3.5 space-y-2 border border-outline-variant/20 shadow-xs">
          <div>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
              Most Common Signal This Week
            </span>
            <p className="font-body-md text-xs md:text-sm text-on-surface font-bold mt-0.5">
              "Difficulty maintaining level-based groups during foundational literacy"
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Found in 28 of 44 submissions across Grade 3-4 classrooms.
            </p>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-secondary font-label-md text-xs font-bold mb-0.5">
                <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
                <span>Suggested System Response</span>
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                Demonstrate grouping activity during CRP visits and deploy peer-learning rotation cards to 3 priority schools.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('crp-mentor-dashboard')}
              className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:bg-secondary/90 transition-all shrink-0 self-start sm:self-auto"
            >
              Route CRP Visits
            </button>
          </div>
        </div>
      </section>

      {/* Priority Schools Action List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Priority Schools
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
              3 High Attention
            </span>
          </div>
          <button
            onClick={() => setCurrentRoute('school-evidence-feed')}
            className="font-label-md text-xs text-secondary font-semibold hover:underline"
            type="button"
          >
            View All Schools
          </button>
        </div>

        {/* School 1: HIGH PRIORITY */}
        <div
          onClick={() => handleSchoolClick('sch-1')}
          className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 space-y-2.5 hover:border-secondary/40 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                  ZP Primary School Wadgaon
                </h3>
                <span className="font-label-sm text-xs text-on-surface-variant">Block Haveli</span>
              </div>
              <p className="font-body-sm text-xs text-error font-medium mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                <span>Grouping inconsistent</span>
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] font-bold uppercase tracking-wider">
              High
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-body-sm text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Last evidence: 2h ago by Sunita Rao</span>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-outline-variant/20">
            <div className="min-w-0 pr-2">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                Recommended Support
              </span>
              <p className="font-body-sm text-xs text-on-surface font-medium truncate">
                Demonstrate 4-corner level grouping
              </p>
            </div>
            <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-xs font-semibold">
              Needs Visit
            </span>
          </div>
        </div>

        {/* School 2: MEDIUM PRIORITY */}
        <div
          onClick={() => handleSchoolClick('sch-2')}
          className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 space-y-2.5 hover:border-secondary/40 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                  ZP School Khed Shivapur
                </h3>
                <span className="font-label-sm text-xs text-on-surface-variant">Block Haveli</span>
              </div>
              <p className="font-body-sm text-xs text-secondary font-medium mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                <span>Low learner practice time</span>
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold uppercase tracking-wider">
              Medium
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-body-sm text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Last evidence: 4d ago by Ramesh K</span>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-outline-variant/20">
            <div className="min-w-0 pr-2">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                Recommended Support
              </span>
              <p className="font-body-sm text-xs text-on-surface font-medium truncate">
                Model peer-paired reading
              </p>
            </div>
            <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-label-sm text-xs font-semibold">
              Visit Scheduled
            </span>
          </div>
        </div>

        {/* School 3: ON TRACK */}
        <div
          onClick={() => handleSchoolClick('sch-3')}
          className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 space-y-2.5 hover:border-secondary/40 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                  ZP School Saswad
                </h3>
                <span className="font-label-sm text-xs text-on-surface-variant">Block Haveli</span>
              </div>
              <p className="font-body-sm text-xs text-on-tertiary-container font-medium mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>All 5 rubric practices observed</span>
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold uppercase tracking-wider">
              On Track
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-body-sm text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Last evidence: Yesterday by Pooja Sharma</span>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-outline-variant/20">
            <div className="min-w-0 pr-2">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                Recommended Support
              </span>
              <p className="font-body-sm text-xs text-on-surface font-medium truncate">
                Celebrate progress & document peer exemplar
              </p>
            </div>
            <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-surface-container-highest text-on-surface font-label-sm text-xs font-semibold">
              Exemplar Hub
            </span>
          </div>
        </div>
      </section>

      {/* Practice Trends: 8-Week Adoption Chart Card */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Practice Trends
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              8-Week FLN / TaRL competency adoption curve
            </p>
          </div>
          <div className="text-right">
            <span className="font-headline-sm text-base md:text-lg text-on-tertiary-container font-bold font-numeric">
              78%
            </span>
            <p className="font-label-sm text-[11px] text-on-surface-variant">From 34% (W1)</p>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div className="w-full h-36 bg-surface-container-low rounded-lg p-2.5 flex flex-col justify-between border border-outline-variant/20">
          <div className="flex justify-between items-center px-1 text-on-surface-variant text-xs">
            <span>Target: 80%</span>
            <span className="text-secondary font-semibold">+44% Growth</span>
          </div>
          <div className="relative w-full h-20">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 280 80">
              <defs>
                <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0051d5" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#0051d5" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#d3e4fe" strokeDasharray="3,3" strokeWidth="0.7" x1="0" x2="280" y1="20" y2="20"></line>
              <line stroke="#d3e4fe" strokeDasharray="3,3" strokeWidth="0.7" x1="0" x2="280" y1="50" y2="50"></line>
              <polygon fill="url(#trendGradient)" points="0,52 35,48 70,44 105,39 140,31 175,26 210,22 245,18 280,14 280,80 0,80"></polygon>
              <polyline fill="none" points="0,52 35,48 70,44 105,39 140,31 175,26 210,22 245,18 280,14" stroke="#0051d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>
              <circle cx="0" cy="52" fill="#ffffff" r="3" stroke="#0051d5" strokeWidth="2"></circle>
              <circle cx="140" cy="31" fill="#ffffff" r="3" stroke="#0051d5" strokeWidth="2"></circle>
              <circle cx="280" cy="14" fill="#069669" r="4" stroke="#ffffff" strokeWidth="2"></circle>
            </svg>
          </div>
          <div className="flex justify-between items-center px-1 text-on-surface-variant font-label-sm text-[11px]">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
            <span>W5</span>
            <span>W6</span>
            <span>W7</span>
            <span className="text-secondary font-bold">W8</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div
            onClick={() => setCurrentRoute('my-practice-log')}
            className="bg-surface-container-low rounded-lg p-2.5 flex items-center gap-2 border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>
            <div>
              <p className="font-label-sm text-[11px] text-on-surface-variant">Phonics Sounding</p>
              <p className="font-label-md text-xs font-bold text-on-surface">82% Verified</p>
            </div>
          </div>
          <div
            onClick={() => setCurrentRoute('my-practice-log')}
            className="bg-surface-container-low rounded-lg p-2.5 flex items-center gap-2 border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">group_work</span>
            <div>
              <p className="font-label-sm text-[11px] text-on-surface-variant">Level Grouping</p>
              <p className="font-label-md text-xs font-bold text-on-surface">74% Target</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Chronological Feed */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">Recent Activity</h2>
          <span className="font-label-sm text-xs text-secondary font-semibold">Past 24 Hours</span>
        </div>

        <div className="space-y-3">
          {/* Item 1 */}
          <div
            onClick={() => setCurrentRoute('school-evidence-feed')}
            className="flex items-start gap-3 cursor-pointer hover:bg-surface-container-low/60 p-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-outline-variant/30">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
                  Evidence Submitted
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">22m ago</span>
              </div>
              <p className="font-body-md text-xs font-bold text-on-surface mt-1 truncate">
                Pooja Sharma uploaded 2 audio clips & tracker
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                ZP School A • Grade 3 Reading Corner
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div
            onClick={() => setCurrentRoute('ai-coach-chat')}
            className="flex items-start gap-3 cursor-pointer hover:bg-surface-container-low/60 p-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-outline-variant/30">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-[10px] font-bold">
                  AI Coaching Generated
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">1h ago</span>
              </div>
              <p className="font-body-md text-xs font-bold text-on-surface mt-1">
                Single Next Step: 3-minute peer pulse check
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Delivered to Sunita Rao via WhatsApp bot
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div
            onClick={() => setCurrentRoute('crp-mentor-dashboard')}
            className="flex items-start gap-3 cursor-pointer hover:bg-surface-container-low/60 p-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-outline-variant/30">
              <span className="material-symbols-outlined text-[18px]">co_present</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
                  CRP Visit Completed
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">3h ago</span>
              </div>
              <p className="font-body-md text-xs font-bold text-on-surface mt-1">
                Anand Patil visited ZP School B
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Observed & demonstrated 15-min reading grid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sync Banner */}
      <section className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between border border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center flex-shrink-0 shadow-sm text-secondary">
            <span className="material-symbols-outlined text-[20px]">sync</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-xs md:text-sm text-on-surface font-bold">
              Cluster Data Synchronized
            </h3>
            <p className="font-body-sm text-[11px] text-on-surface-variant">
              Next automated cluster roll-up scheduled in 42 minutes.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Cluster data refreshed and synced successfully!')}
          className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs font-semibold shadow-sm hover:bg-surface-container-high transition-colors"
          type="button"
        >
          Refresh
        </button>
      </section>
    </div>
  );
}
