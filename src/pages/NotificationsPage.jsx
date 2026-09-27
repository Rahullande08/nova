import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialButton } from '../components/TutorialButton';

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, setCurrentRoute, showToast, t } = useApp();
  const [filter, setFilter] = useState('All');

  const filtered = notifications.filter(
    (n) => filter === 'All' || n.type === filter.toLowerCase()
  );

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.targetRoute) {
      setCurrentRoute(notif.targetRoute);
    }
  };

  const markAllAsRead = () => {
    markAllNotificationsRead();
  };

  const getNotifTitle = (notif) => {
    switch (notif.id) {
      case 'notif-1': return t('notifNewEvidenceSubmitted', notif.title);
      case 'notif-2': return t('notifAiCoachingGenerated', notif.title);
      case 'notif-3': return t('notifVisitPriorityAlert', notif.title);
      case 'notif-4': return t('notifActionItemVerified', notif.title);
      default: return notif.titleKey ? t(notif.titleKey, notif.title) : notif.title;
    }
  };

  const getNotifDesc = (notif) => {
    switch (notif.id) {
      case 'notif-1': return t('notifNewEvidenceDesc', notif.description);
      case 'notif-2': return t('notifAiCoachingDesc', notif.description);
      case 'notif-3': return t('notifVisitPriorityDesc', notif.description);
      case 'notif-4': return t('notifActionItemDesc', notif.description);
      default: return notif.descKey ? t(notif.descKey, notif.description) : notif.description;
    }
  };

  const getNotifTime = (time) => {
    switch (time) {
      case '22m ago': return t('time22mAgo', time);
      case '1h ago': return t('time1hAgo', time);
      case '2h ago': return t('time2hAgo', time);
      case '5h ago': return t('time5hAgo', time);
      default: return time;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">notifications</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              {t('realTimeAlerts', 'Real-time Alerts')}
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('systemNotifications', 'Notification Center')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <TutorialButton pageKey="system-notifications" variant="outline" />
          <button
            onClick={markAllAsRead}
            className="text-xs font-bold text-secondary hover:underline cursor-pointer"
          >
            {t('markAllAsRead', 'Mark all as read')}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['All', 'Evidence', 'Coaching', 'Mentor', 'Action'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              filter === tab
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            {tab === 'All' ? t('all', 'All') :
             tab === 'Evidence' ? t('navEvidence', 'Evidence') :
             tab === 'Coaching' ? t('navCoaching', 'Coaching') :
             tab === 'Mentor' ? t('navMentor', 'Mentor') :
             tab === 'Action' ? t('actionLedger', 'Action') : tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              notif.unread
                ? 'bg-surface-container-lowest border-secondary/40 shadow-sm'
                : 'bg-surface-container-low/60 border-outline-variant/20'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                notif.unread ? 'bg-secondary text-on-secondary shadow-xs' : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {notif.type === 'evidence'
                  ? 'photo_camera'
                  : notif.type === 'coaching'
                  ? 'psychology'
                  : notif.type === 'mentor'
                  ? 'warning'
                  : 'checklist'}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className={`font-headline-sm text-xs md:text-sm ${notif.unread ? 'font-bold text-on-surface' : 'font-semibold text-on-surface-variant'}`}>
                  {getNotifTitle(notif)}
                </h3>
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  {getNotifTime(notif.time)}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                {getNotifDesc(notif)}
              </p>
            </div>

            {notif.unread && (
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></span>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-on-surface-variant space-y-1">
            <span className="material-symbols-outlined text-4xl">notifications_off</span>
            <p className="font-bold text-xs">{t('noNotifications', 'No notifications to display')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
