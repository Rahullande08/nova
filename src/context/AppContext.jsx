import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  APP_ROLES,
  INITIAL_SCHOOLS,
  INITIAL_PRACTICE_RUBRIC,
  ACTIVITY_LIBRARY,
  ACTION_LEDGER_ITEMS,
  TRAINING_MODULES,
  NOTIFICATIONS_DATA
} from '../data/mockData';
import { apiService } from '../services/apiService';
import { getTranslation } from '../data/translations';

const AppContext = createContext();

// Route to Hash Mapping for URL Synchronization
const ROUTE_HASH_MAP = {
  'overview-dashboard': 'dashboard',
  'capture-evidence': 'capture',
  'ai-coach-chat': 'coach',
  'my-practice-log': 'practice',
  'activity-library': 'activities',
  'crp-mentor-dashboard': 'mentor',
  'visit-plan': 'visits',
  'school-evidence-feed': 'schools',
  'mentor-visit-workflow': 'mentor-visit',
  'action-ledger': 'actions',
  'training-to-practice': 'training',
  'reports-insights': 'reports',
  'system-notifications': 'notifications',
  'system-settings': 'settings'
};

const HASH_ROUTE_MAP = Object.entries(ROUTE_HASH_MAP).reduce((acc, [route, hash]) => {
  acc[hash] = route;
  acc[route] = route; // handle direct route keys as well
  return acc;
}, {});

function getInitialRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && HASH_ROUTE_MAP[hash]) {
    return HASH_ROUTE_MAP[hash];
  }
  return 'overview-dashboard';
}

export function AppProvider({ children }) {
  const [currentRoute, setCurrentRouteState] = useState(getInitialRoute);
  const [currentRole, setCurrentRoleState] = useState(() => {
    try {
      const saved = localStorage.getItem('practice_layer_role_v1');
      return saved ? JSON.parse(saved) : APP_ROLES.TEACHER;
    } catch {
      return APP_ROLES.TEACHER;
    }
  });

  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('practice_layer_language_v1') || 'EN';
    } catch {
      return 'EN';
    }
  });

  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);

  // Tutorial and Guided Onboarding Tour State
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialPageKey, setTutorialPageKey] = useState(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Data States
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);
  const [actions, setActions] = useState(ACTION_LEDGER_ITEMS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [activities] = useState(ACTIVITY_LIBRARY);
  const [trainingModules] = useState(TRAINING_MODULES);
  const [practiceRubric, setPracticeRubric] = useState(INITIAL_PRACTICE_RUBRIC);

  // Active Flow Evidence State
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

  // Initial Data Load
  useEffect(() => {
    async function loadData() {
      try {
        const [loadedSchools, loadedActions, loadedNotifs] = await Promise.all([
          apiService.getSchools(),
          apiService.getActions(),
          apiService.getNotifications()
        ]);
        setSchools(loadedSchools);
        setActions(loadedActions);
        setNotifications(loadedNotifs);
      } catch (err) {
        console.error('[AppContext] Failed to load initial data:', err);
      }
    }
    loadData();
  }, []);

  // Hash Navigation Sync & Browser Back/Forward Handling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash && HASH_ROUTE_MAP[hash]) {
        setCurrentRouteState(HASH_ROUTE_MAP[hash]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setCurrentRole = (role) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem('practice_layer_role_v1', JSON.stringify(role));
    } catch (e) {
      console.warn(e);
    }
  };

  const setLanguage = (lang) => {
    const normalized = (lang || 'EN').toUpperCase();
    setLanguageState(normalized);
    try {
      localStorage.setItem('practice_layer_language_v1', normalized);
    } catch (e) {
      console.warn(e);
    }
  };

  // Translation helper bound to active language
  const t = useCallback(
    (key, fallback = '') => {
      return getTranslation(key, language, fallback);
    },
    [language]
  );

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

    setCurrentRouteState(route);
    const hash = ROUTE_HASH_MAP[route] || route;
    if (window.location.hash !== `#${hash}`) {
      window.history.pushState(null, '', `#${hash}`);
    }

    setIsNavDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Tutorial for specific page or current page
  const openTutorial = (pageKey = null) => {
    setTutorialPageKey(pageKey || currentRoute);
    setIsTutorialOpen(true);
  };

  const closeTutorial = () => {
    setIsTutorialOpen(false);
    setTutorialPageKey(null);
  };

  // Start Global Interactive Onboarding Tour
  const startFirstTimeTour = () => {
    setTourStep(0);
    setIsTourOpen(true);
    setCurrentRouteState('overview-dashboard');
    window.history.pushState(null, '', '#dashboard');
  };

  const markNotificationRead = async (notifId) => {
    const updated = await apiService.markNotificationRead(notifId);
    setNotifications(updated);
  };

  const markAllNotificationsRead = async () => {
    const updated = await apiService.markAllNotificationsRead();
    setNotifications(updated);
    showToast('All notifications marked as read.');
  };

  const updateActionStatus = async (actionId, newStatus, verificationNote = null) => {
    await apiService.updateActionStatus(actionId, newStatus, verificationNote);
    const updatedList = await apiService.getActions();
    setActions(updatedList);
    showToast(`Action status updated to "${newStatus}"`);
  };

  const createAction = async (newAction) => {
    const created = await apiService.createAction(newAction);
    const updatedList = await apiService.getActions();
    setActions(updatedList);
    showToast('New action item created and synced to Ledger!');
    return created;
  };

  const recordSchoolVisit = async (schoolId, visitDetails) => {
    await apiService.updateSchoolVisit(schoolId, visitDetails);
    const updatedSchools = await apiService.getSchools();
    setSchools(updatedSchools);
  };

  const resetAllData = () => {
    apiService.resetToDefaults();
    setSchools(INITIAL_SCHOOLS);
    setActions(ACTION_LEDGER_ITEMS);
    setNotifications(NOTIFICATIONS_DATA);
    setCurrentRole(APP_ROLES.TEACHER);
    setLanguage('EN');
    showToast('Reset system to default seed dataset.');
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
        t,
        isDemoMode,
        setIsDemoMode,
        isNavDrawerOpen,
        setIsNavDrawerOpen,
        isTransparencyModalOpen,
        setIsTransparencyModalOpen,
        // Tutorial States
        isTutorialOpen,
        setIsTutorialOpen,
        tutorialPageKey,
        openTutorial,
        closeTutorial,
        isTourOpen,
        setIsTourOpen,
        tourStep,
        setTourStep,
        startFirstTimeTour,
        // Data States
        schools,
        setSchools,
        actions,
        updateActionStatus,
        createAction,
        recordSchoolVisit,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
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
        showToast,
        resetAllData
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
