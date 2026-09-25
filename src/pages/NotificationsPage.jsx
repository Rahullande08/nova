import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function NotificationsPage() {
  const { notifications, markNotificationRead, setCurrentRoute, showToast } = useApp();
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
    notifications.forEach((n) => markNotificationRead(n.id));
    showToast('All notifications marked as read.');
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">notifications</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              Real-time Alerts
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            Notification Center
          </h1>
        </div>

        <button
          onClick={markAllAsRead}
          className="text-xs font-bold text-secondary hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['All', 'Evidence', 'Coaching', 'Mentor', 'Action'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              filter === tab
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            {tab}
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
                  {notif.title}
                </h3>
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  {notif.time}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                {notif.description}
              </p>
            </div>

            {notif.unread && (
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
