import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function ActionLedgerPage() {
  const { actions, setSelectedAction, createAction, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New action form state
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionOwner, setNewActionOwner] = useState('Sunita Rao (Teacher)');
  const [newActionSchool, setNewActionSchool] = useState('ZP Primary School Wadgaon');
  const [newActionDueDate, setNewActionDueDate] = useState('2026-09-30');
  const [newActionPriority, setNewActionPriority] = useState('High');

  const filteredActions = actions.filter((act) => {
    const matchesSearch =
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || act.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    createAction({
      action: newActionTitle,
      owner: newActionOwner,
      targetTeacher: newActionOwner,
      school: newActionSchool,
      dueDate: newActionDueDate,
      priority: newActionPriority,
      evidenceRequired: 'Classroom practice check / tracker update',
      notes: 'Manually logged institutional action item.'
    });

    setIsCreateModalOpen(false);
    setNewActionTitle('');
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">assignment</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              Accountability Matrix
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            Action Ledger
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Track pedagogical commitments, field verifications, and SLA progress.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create Action</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search action items, teachers, schools..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-outline-variant/40 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {['All', 'Open', 'In Progress', 'Verified', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  statusFilter === status
                    ? 'bg-secondary text-on-secondary shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Table (Desktop) / Cards (Mobile) */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container font-headline-sm text-xs text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-4">Action Item</th>
                <th className="py-3 px-4">Owner / School</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredActions.map((action) => {
                const isVerified = action.status === 'Verified';
                const isClosed = action.status === 'Closed';
                const isInProgress = action.status === 'In Progress';

                return (
                  <tr
                    key={action.id}
                    onClick={() => setSelectedAction(action)}
                    className="hover:bg-surface-container-low/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-on-surface max-w-xs md:max-w-md">
                      <div className="truncate">{action.action}</div>
                      <div className="text-[11px] font-normal text-on-surface-variant truncate">
                        Evidence: {action.evidenceRequired}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface">
                      <div className="font-medium">{action.owner}</div>
                      <div className="text-[11px] text-on-surface-variant">{action.school}</div>
                    </td>
                    <td className="py-3.5 px-4 font-numeric font-medium text-error">
                      {action.dueDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isVerified || isClosed
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : isInProgress
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isVerified || isClosed
                              ? 'bg-on-tertiary-container'
                              : isInProgress
                              ? 'bg-secondary'
                              : 'bg-error'
                          }`}
                        ></span>
                        {action.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                        chevron_right
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant space-y-1">
              <span className="material-symbols-outlined text-4xl">task</span>
              <p className="font-bold text-xs">No matching action items</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Action Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 border border-outline-variant/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Create Action Commitment
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block text-on-surface-variant mb-1">
                  Action Item Title
                </label>
                <input
                  type="text"
                  required
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  placeholder="e.g. Conduct daily 4-corner word sorting in Grade 3"
                  className="w-full p-2.5 rounded-lg border border-outline-variant text-xs bg-surface focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block text-on-surface-variant mb-1">
                    Assigned Owner
                  </label>
                  <input
                    type="text"
                    value={newActionOwner}
                    onChange={(e) => setNewActionOwner(e.target.value)}
                    className="w-full p-2 rounded-lg border border-outline-variant text-xs bg-surface"
                  />
                </div>
                <div>
                  <label className="font-bold block text-on-surface-variant mb-1">
                    Target School
                  </label>
                  <input
                    type="text"
                    value={newActionSchool}
                    onChange={(e) => setNewActionSchool(e.target.value)}
                    className="w-full p-2 rounded-lg border border-outline-variant text-xs bg-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block text-on-surface-variant mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newActionDueDate}
                    onChange={(e) => setNewActionDueDate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-outline-variant text-xs bg-surface"
                  />
                </div>
                <div>
                  <label className="font-bold block text-on-surface-variant mb-1">Priority</label>
                  <select
                    value={newActionPriority}
                    onChange={(e) => setNewActionPriority(e.target.value)}
                    className="w-full p-2 rounded-lg border border-outline-variant text-xs bg-surface"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-sm"
                >
                  Save Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
