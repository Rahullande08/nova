import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  APP_ROLES,
  INITIAL_SCHOOLS,
  INITIAL_PRACTICE_RUBRIC,
  ACTIVITY_LIBRARY,
  ACTION_LEDGER_ITEMS,
  TRAINING_MODULES,
  NOTIFICATIONS_DATA
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentRoute, setCurrentRoute] = useState('overview-dashboard');
  const [currentRole, setCurrentRole] = useState(APP_ROLES.TEACHER);
  const [language, setLanguage] = useState('EN'); // 'EN' | 'HI' | 'MR'
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);
  
  // Data States
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);
  const [actions, setActions] = useState(ACTION_LEDGER_ITEMS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [activities] = useState(ACTIVITY_LIBRARY);
  const [trainingModules] = useState(TRAINING_MODULES);
  const [practiceRubric, setPracticeRubric] = useState(INITIAL_PRACTICE_RUBRIC);

  // Active Flow States
  const [activeEvidence, setActiveEvidence] = useState({
    trackerPhoto: null,
    audioBlob: null,
    audioUrl: null,
    transcript: '',
    language: 'mr',
    analysis: null,
    status: 'idle' // 'idle' | 'recording' | 'analyzing' | 'completed'
  });

  const [selectedSchoolId, setSelectedSchoolId] = useState('sch-1');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  const navigateTo = (route, params = {}) => {
    if (params.schoolId) setSelectedSchoolId(params.schoolId);
    if (params.activity) setSelectedActivity(params.activity);
    if (params.action) setSelectedAction(params.action);
    setCurrentRoute(route);
    setIsNavDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, unread: false } : n))
    );
  };

  const updateActionStatus = (actionId, newStatus) => {
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: newStatus } : a))
    );
    showToast(`Action status updated to "${newStatus}"`);
  };

  const createAction = (newAction) => {
    const item = {
      id: 'act-' + Date.now(),
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Open',
      ...newAction
    };
    setActions((prev) => [item, ...prev]);
    showToast('New action item created and synced to Ledger!');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute: navigateTo,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        isDemoMode,
        setIsDemoMode,
        isNavDrawerOpen,
        setIsNavDrawerOpen,
        isTransparencyModalOpen,
        setIsTransparencyModalOpen,
        schools,
        setSchools,
        actions,
        updateActionStatus,
        createAction,
        notifications,
        markNotificationRead,
        activities,
        trainingModules,
        practiceRubric,
        setPracticeRubric,
        activeEvidence,
        setActiveEvidence,
        selectedSchoolId,
        setSelectedSchoolId,
        selectedActivity,
        setSelectedActivity,
        selectedAction,
        setSelectedAction,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
