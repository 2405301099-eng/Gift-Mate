import React, { useState, useEffect } from 'react';
import { fetchReminders, createReminder, deleteReminder } from '../api/client';
import { formatINR } from '../utils/currency';
import { useToast } from '../context/ToastContext';

export default function FestiveReminders({ onNavigate, onOpenProductDetail }) {
  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const [newTitle, setNewTitle] = useState('');
  const [newPerson, setNewPerson] = useState('');
  const [newOccasion, setNewOccasion] = useState('Diwali');
  const [newDate, setNewDate] = useState('');
  const [newBudget, setNewBudget] = useState('3000');
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await fetchReminders();
      setReminders(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPerson.trim() || !newDate) {
      showToast('Please fill all required fields');
      return;
    }

    try {
      const res = await createReminder({
        title: newTitle,
        person: newPerson,
        occasion: newOccasion,
        date: newDate,
        budget: Number(newBudget) || 2000,
        notify
      });

      if (res.success) {
        showToast('Festive reminder added successfully!');
        const updated = await fetchReminders();
        setReminders(updated);
        setShowAddForm(false);
        setNewTitle('');
        setNewPerson('');
        setNewDate('');
      }
    } catch (err) {
      showToast('Failed to create reminder');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
      setReminders(prev => prev.filter(r => r.id !== id));
      showToast('Reminder deleted');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-3xl mx-auto pt-space-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-space-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold mb-1 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">calendar_month</span>
            <span>Occasion Reminders</span>
          </div>
          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
            Never Miss a Milestone
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Automated alerts &amp; smart gift suggestions 14 days before every Indian celebration.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showAddForm ? 'close' : 'add'}
          </span>
          <span>{showAddForm ? 'Cancel' : 'Add Reminder'}</span>
        </button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-surface-container-lowest/90 backdrop-blur-md rounded-3xl p-space-md sm:p-space-lg shadow-md border border-outline-variant/30 mb-space-lg animate-fadeIn">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
            Create Occasion Alert
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mb-space-sm">
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Event Title *
              </label>
              <input 
                type="text"
                placeholder="e.g. Papa's 60th Milestone"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Person / Recipient *
              </label>
              <input 
                type="text"
                placeholder="e.g. Dad, Sister, Ananya & Rohit"
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-sm">
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Occasion Type
              </label>
              <select
                value={newOccasion}
                onChange={(e) => setNewOccasion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Diwali">Diwali &amp; Festive</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding">Wedding</option>
                <option value="Farewell">Farewell / Career</option>
                <option value="Housewarming">Housewarming</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Celebration Date *
              </label>
              <input 
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Budget Target (₹)
              </label>
              <input 
                type="number"
                step="500"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-space-md">
            <input 
              type="checkbox"
              id="notify-check"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="notify-check" className="font-label-md text-[13px] text-on-surface">
              Send smart gift recommendation reminder 10 days in advance
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg font-bold shadow-md active:scale-95 transition-all"
          >
            Save Occasion Reminder
          </button>
        </form>
      )}

      {/* Reminders List */}
      {isLoading ? (
        <div className="py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
          <p className="mt-2 font-label-md">Loading your festive reminders...</p>
        </div>
      ) : reminders.length === 0 ? (
        <div className="p-space-xl rounded-3xl bg-surface-container-lowest text-center border border-outline-variant/30 shadow-sm my-6">
          <span className="material-symbols-outlined text-4xl text-secondary mb-2">event_available</span>
          <h2 className="font-headline-sm text-on-surface">No upcoming reminders set</h2>
          <p className="font-body-md text-on-surface-variant mt-1">
            Stay ahead of birthdays and Indian festivals by adding your first reminder above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-space-sm">
          {reminders.map((rem) => {
            const isSoon = rem.daysLeft <= 20;
            return (
              <div 
                key={rem.id}
                className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm"
              >
                <div className="flex items-start gap-space-sm">
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 ${
                    isSoon ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-high text-primary'
                  }`}>
                    <span className="font-price-headline text-[15px] leading-tight">
                      {rem.daysLeft !== undefined ? `${rem.daysLeft}d` : '📅'}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-label-md">Left</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
                        {rem.title}
                      </h3>
                      <span className="px-2 py-0.2 rounded-full bg-surface-container text-primary font-label-md text-[10px]">
                        {rem.occasion}
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                      For: <strong>{rem.person}</strong> • Target: {formatINR(rem.budget)} • Date: {rem.date}
                    </p>

                    {/* AI Suggested Gift Badge */}
                    {rem.suggestedProduct && (
                      <div 
                        onClick={() => onOpenProductDetail(rem.suggestedProduct)}
                        className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg bg-surface-container-low text-primary text-[11px] font-label-md cursor-pointer hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px] text-tertiary-container">auto_awesome</span>
                        <span>AI Suggestion: <strong>{rem.suggestedProduct.name}</strong> ({formatINR(rem.suggestedProduct.price)})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('ai-gift-finder')}
                    className="px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-[12px] font-bold hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    Find Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(rem.id)}
                    className="p-1.5 rounded-full text-on-surface-variant hover:text-error transition-colors"
                    title="Delete reminder"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
