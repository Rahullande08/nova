import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function ActivityLibraryPage() {
  const { activities, setSelectedActivity, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.practiceArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === 'All' || act.subject.includes(selectedSubject);
    const matchesLevel =
      selectedLevel === 'All' || act.targetLevel.includes(selectedLevel);
    return matchesSearch && matchesSubject && matchesLevel;
  });

  const handleUseActivity = (e, act) => {
    e.stopPropagation();
    showToast(`"${act.name}" scheduled for tomorrow’s FLN block!`);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto pb-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed w-fit mb-1">
          <span className="material-symbols-outlined text-[14px]">menu_book</span>
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
            Pedagogical Bank
          </span>
        </div>
        <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
          Foundational Activity Library
        </h1>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
          TaRL and FLN certified 10-15 minute modular classroom activities.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities, keywords (e.g. number line, word sort, exit check)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-outline-variant/40 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-label-sm text-on-surface-variant font-bold uppercase text-[10px]">
            Subject:
          </span>
          {['All', 'Literacy', 'Numeracy'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedSubject === sub
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {sub}
            </button>
          ))}

          <span className="font-label-sm text-on-surface-variant font-bold uppercase text-[10px] ml-2">
            Level:
          </span>
          {['All', 'Beginner', 'Letter', 'Word'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => setSelectedActivity(activity)}
            className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:border-secondary/40 cursor-pointer transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wide block">
                    {activity.subject}
                  </span>
                  <h3 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mt-0.5">
                    {activity.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-surface-container-high text-on-surface font-semibold shrink-0">
                  {activity.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container text-on-surface-variant">
                  {activity.grade}
                </span>
                <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container-highest text-secondary font-bold">
                  {activity.targetLevel}
                </span>
                <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container text-on-surface-variant">
                  {activity.language}
                </span>
              </div>

              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                {activity.description}
              </p>

              <div className="pt-1 text-[11px] text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  architecture
                </span>
                <span className="truncate">{activity.materials}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-surface-container flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedActivity(activity)}
                className="text-xs font-bold text-secondary hover:underline"
              >
                View Facilitation Steps
              </button>
              <button
                onClick={(e) => handleUseActivity(e, activity)}
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">bookmark_add</span>
                <span>Use in Next Session</span>
              </button>
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="col-span-2 text-center p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
              search_off
            </span>
            <p className="font-headline-sm text-sm font-bold text-on-surface">
              No matching activities found
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Try adjusting your search query or removing level filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
