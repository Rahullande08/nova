// Practice Layer: Centralized Backend API Service Layer
// Bridges UI interactions to persistent storage, AI diagnostic engines, and deterministic routing

import {
  APP_ROLES,
  INITIAL_SCHOOLS,
  INITIAL_PRACTICE_RUBRIC,
  ACTIVITY_LIBRARY,
  ACTION_LEDGER_ITEMS,
  TRAINING_MODULES,
  NOTIFICATIONS_DATA
} from '../data/mockData';

const STORAGE_KEYS = {
  ACTIONS: 'practice_layer_actions_v1',
  SCHOOLS: 'practice_layer_schools_v1',
  NOTIFICATIONS: 'practice_layer_notifications_v1',
  LANGUAGE: 'practice_layer_language_v1',
  ROLE: 'practice_layer_role_v1',
  EVIDENCE_LOGS: 'practice_layer_evidence_logs_v1'
};

// Safe LocalStorage Helpers
function loadStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`[Storage] Failed to read ${key}:`, e);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[Storage] Failed to write ${key}:`, e);
  }
}

class ApiService {
  constructor() {
    this.schools = loadStorage(STORAGE_KEYS.SCHOOLS, INITIAL_SCHOOLS);
    this.actions = loadStorage(STORAGE_KEYS.ACTIONS, ACTION_LEDGER_ITEMS);
    this.notifications = loadStorage(STORAGE_KEYS.NOTIFICATIONS, NOTIFICATIONS_DATA);
    this.activities = ACTIVITY_LIBRARY;
    this.trainingModules = TRAINING_MODULES;
    this.practiceRubric = INITIAL_PRACTICE_RUBRIC;
  }

  // --- SCHOOLS & VISITS ---
  async getSchools() {
    await this._delay(150);
    return [...this.schools];
  }

  async getSchoolById(schoolId) {
    await this._delay(100);
    const school = this.schools.find((s) => s.id === schoolId) || this.schools[0];
    return { ...school };
  }

  async updateSchoolVisit(schoolId, visitDetails) {
    await this._delay(300);
    this.schools = this.schools.map((s) => {
      if (s.id === schoolId) {
        return {
          ...s,
          daysSinceVisit: 0,
          lastVisitDate: new Date().toISOString().split('T')[0],
          recentEvidence: [
            {
              id: 'ev-' + Date.now(),
              teacher: visitDetails.teacher || 'Sunita Rao',
              grade: visitDetails.grade || 'Grade 3',
              time: 'Just now (Visit Verified)',
              type: 'Demonstration Visit',
              signal: visitDetails.observationNote || 'Level grouping modeled'
            },
            ...s.recentEvidence
          ]
        };
      }
      return s;
    });
    saveStorage(STORAGE_KEYS.SCHOOLS, this.schools);
    return this.schools.find((s) => s.id === schoolId);
  }

  // --- ACTIONS & SLA LEDGER ---
  async getActions() {
    await this._delay(150);
    return [...this.actions];
  }

  async createAction(actionData) {
    await this._delay(250);
    const newAction = {
      id: 'act-' + Date.now(),
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Open',
      evidenceRequired: 'Classroom practice check / tracker update',
      notes: 'Logged via Practice Layer system.',
      ...actionData
    };
    this.actions = [newAction, ...this.actions];
    saveStorage(STORAGE_KEYS.ACTIONS, this.actions);
    return newAction;
  }

  async updateActionStatus(actionId, newStatus, verificationNote = null) {
    await this._delay(200);
    this.actions = this.actions.map((a) => {
      if (a.id === actionId) {
        return {
          ...a,
          status: newStatus,
          verificationNote: verificationNote || a.verificationNote,
          lastUpdated: new Date().toISOString()
        };
      }
      return a;
    });
    saveStorage(STORAGE_KEYS.ACTIONS, this.actions);
    return this.actions.find((a) => a.id === actionId);
  }

  // --- ACTIVITIES ---
  async getActivities({ search = '', subject = 'All', level = 'All' } = {}) {
    await this._delay(100);
    return this.activities.filter((act) => {
      const matchesSearch =
        !search ||
        act.name.toLowerCase().includes(search.toLowerCase()) ||
        act.description.toLowerCase().includes(search.toLowerCase()) ||
        act.practiceArea.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = subject === 'All' || act.subject.includes(subject);
      const matchesLevel = level === 'All' || act.targetLevel.includes(level);
      return matchesSearch && matchesSubject && matchesLevel;
    });
  }

  // --- NOTIFICATIONS ---
  async getNotifications() {
    await this._delay(100);
    return [...this.notifications];
  }

  async markNotificationRead(notifId) {
    this.notifications = this.notifications.map((n) =>
      n.id === notifId ? { ...n, unread: false } : n
    );
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    return this.notifications;
  }

  async markAllNotificationsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, unread: false }));
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    return this.notifications;
  }

  // --- RESET TO SEED DATA ---
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.ACTIONS);
    localStorage.removeItem(STORAGE_KEYS.SCHOOLS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.EVIDENCE_LOGS);
    this.schools = INITIAL_SCHOOLS;
    this.actions = ACTION_LEDGER_ITEMS;
    this.notifications = NOTIFICATIONS_DATA;
    return true;
  }

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();
