import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/AppHeader';
import { AppSidebar } from './components/AppSidebar';
import { BottomNavBar } from './components/BottomNavBar';
import { AITransparencyModal } from './components/AITransparencyModal';
import { ActivityDetailModal } from './components/ActivityDetailModal';
import { ActionDetailDrawer } from './components/ActionDetailDrawer';
import { Toast } from './components/Toast';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { CaptureEvidencePage } from './pages/CaptureEvidencePage';
import { AIAnalysisCoachPage } from './pages/AIAnalysisCoachPage';
import { MyPracticePage } from './pages/MyPracticePage';
import { ActivityLibraryPage } from './pages/ActivityLibraryPage';
import { MentorDashboardPage } from './pages/MentorDashboardPage';
import { VisitPlanPage } from './pages/VisitPlanPage';
import { SchoolEvidencePage } from './pages/SchoolEvidencePage';
import { MentorVisitWorkflowPage } from './pages/MentorVisitWorkflowPage';
import { ActionLedgerPage } from './pages/ActionLedgerPage';
import { TrainingToPracticePage } from './pages/TrainingToPracticePage';
import { ReportsInsightsPage } from './pages/ReportsInsightsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

function MainContent() {
  const { currentRoute } = useApp();

  const renderActivePage = () => {
    switch (currentRoute) {
      case 'overview-dashboard':
        return <DashboardPage />;
      case 'capture-evidence':
        return <CaptureEvidencePage />;
      case 'ai-coach-chat':
        return <AIAnalysisCoachPage />;
      case 'my-practice-log':
        return <MyPracticePage />;
      case 'activity-library':
        return <ActivityLibraryPage />;
      case 'crp-mentor-dashboard':
        return <MentorDashboardPage />;
      case 'visit-plan':
        return <VisitPlanPage />;
      case 'school-evidence-feed':
        return <SchoolEvidencePage />;
      case 'mentor-visit-workflow':
        return <MentorVisitWorkflowPage />;
      case 'action-ledger':
        return <ActionLedgerPage />;
      case 'training-to-practice':
        return <TrainingToPracticePage />;
      case 'reports-insights':
        return <ReportsInsightsPage />;
      case 'system-notifications':
        return <NotificationsPage />;
      case 'system-settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased">
      {/* Fixed Header */}
      <AppHeader />

      {/* Main Container with Sidebar (desktop) and Responsive Content */}
      <div className="flex-1 flex pt-16">
        <AppSidebar />

        {/* Dynamic Page Container */}
        <main className="flex-1 min-w-0 md:pl-64 p-4 md:p-8 pb-24 md:pb-12 max-w-7xl">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Fixed Bottom Nav */}
      <BottomNavBar />

      {/* Global Modals & Drawers */}
      <AITransparencyModal />
      <ActivityDetailModal />
      <ActionDetailDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
