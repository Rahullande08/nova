import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialButton } from '../components/TutorialButton';

export function ReportsInsightsPage() {
  const { showToast, schools, actions, t } = useApp();
  const [reportPeriod, setReportPeriod] = useState('Month');

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'School,Block,FLN Teachers,Students,Priority,Days Since Visit,Flagged Signal\n' +
      schools
        .map(
          (s) =>
            `"${s.name}","${s.block}",${s.teachersCount},${s.studentsCount},"${s.priority}",${s.daysSinceVisit},"${s.flaggedSignal}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Practice_Layer_Haveli_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t('csvExportSuccessToast', 'CSV export downloaded successfully!'));
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">monitoring</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              {t('stateBlockExecutiveInsights', 'State & Block Executive Insights')}
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('reportsInsights', 'Instructional Fidelity Reports')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            {t('multiTierPedagogicalDesc', 'Multi-tier pedagogical adoption, mentor coverage and system health diagnostics.')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TutorialButton pageKey="reports-insights" variant="outline" />
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-xs font-bold border border-outline-variant/30 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">
              download
            </span>
            <span>{t('exportCsv', 'Download CSV')}</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>{t('exportPdf', 'Export PDF')}</span>
          </button>
        </div>
      </div>

      {/* 6 Key Report Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('practiceAdoptionRateMetric', 'Practice Adoption Rate')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">78%</p>
          <p className="text-[11px] text-on-tertiary-container font-semibold">{t('vsBaseline', '+14% vs Baseline')}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('schoolVisitCoverageMetric', 'School Visit Coverage')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">87.5%</p>
          <p className="text-[11px] text-secondary font-semibold">{t('schoolsVisitedSLA', '7/8 schools visited in 14d SLA')}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('mentorDemoTimeMetric', 'Mentor Demonstration Time')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">42 {t('hoursAbbr', 'hrs')}</p>
          <p className="text-[11px] text-on-surface-variant">{t('classroomModelingLogged', 'Classroom modeling logged')}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('trainingShiftRatioMetric', 'Training → Shift Ratio')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">60%</p>
          <p className="text-[11px] text-on-tertiary-container font-semibold">{t('fieldVerifiedShift', 'Field verified shift')}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('actionResolutionSLAMetric', 'Action Resolution SLA')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">4.2{t('daysAbbr', 'd')}</p>
          <p className="text-[11px] text-secondary font-semibold">{t('avgClosureDuration', 'Avg closure duration')}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-1">
          <span className="text-on-surface-variant text-xs font-medium">{t('evidenceQualityConfMetric', 'Evidence Quality Confidence')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric">89%</p>
          <p className="text-[11px] text-on-tertiary-container font-semibold">{t('highOcrAsrFidelity', 'High OCR/ASR fidelity')}</p>
        </div>
      </div>

      {/* Detailed Cluster Performance Matrix Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-4 md:p-5 space-y-3">
        <h2 className="font-headline-sm text-base font-bold text-on-surface">
          {t('clusterPerformanceBreakdown', 'Cluster Performance & Field Supervision Breakdown')}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container font-bold text-on-surface-variant uppercase text-[10px]">
                <th className="py-2.5 px-3">{t('schoolNameTh', 'School Name')}</th>
                <th className="py-2.5 px-3">{t('teachersTh', 'Teachers')}</th>
                <th className="py-2.5 px-3">{t('practiceSignalsTh', 'Practice Signals')}</th>
                <th className="py-2.5 px-3">{t('lastVisitTh', 'Last Visit')}</th>
                <th className="py-2.5 px-3">{t('statusTh', 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {schools.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low/40">
                  <td className="py-3 px-3 font-semibold text-on-surface">{s.name}</td>
                  <td className="py-3 px-3 font-numeric">{s.teachersCount} FLN</td>
                  <td className="py-3 px-3 text-on-surface-variant truncate max-w-xs">{s.flaggedSignal}</td>
                  <td className="py-3 px-3 font-numeric">{s.daysSinceVisit}{t('daysAgo', 'd ago')}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.priority === 'HIGH'
                          ? 'bg-error-container text-on-error-container'
                          : s.priority === 'MEDIUM'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      {s.priority === 'HIGH' ? t('highPriority', 'HIGH') :
                       s.priority === 'MEDIUM' ? t('mediumPriority', 'MEDIUM') :
                       s.priority === 'LOW' ? t('lowPriority', 'LOW') : s.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
