import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useExercisePlans } from '../hooks/useExerciseData';
import { useLang } from '../i18n';

const DAY_LABELS = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], zh: ['日', '一', '二', '三', '四', '五', '六'] };
const SPORT_OPTIONS = ['Rest', 'Running', 'Basketball', 'Swimming', 'Cycling', 'Yoga', 'Strength', 'Walking', 'Badminton', 'Tennis', 'Soccer', 'Dance', 'Hiking', 'Other'];
const ACTOR_ORDER = ['michael', 'lucas', 'fay', 'david'];

export default function ExercisePlanEditor({ onClose }) {
  const { plans, loading, savePlan } = useExercisePlans();
  const [localPlans, setLocalPlans] = useState({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const { lang } = useLang();

  const dayLabels = lang === 'en' ? DAY_LABELS.en : DAY_LABELS.zh;

  // Initialize local state from server data
  useEffect(() => {
    if (!plans) return;
    const local = {};
    for (const id of ACTOR_ORDER) {
      local[id] = {};
      for (let d = 0; d < 7; d++) {
        const p = plans[id]?.plan?.[String(d)];
        local[id][d] = p || { sport_type: 'Rest', target_duration_min: 0, has_challenge: false, challenge_duration_min: 60 };
      }
    }
    setLocalPlans(local);
  }, [plans]);

  function updateCell(actorId, day, field, value) {
    setLocalPlans(prev => {
      const next = { ...prev };
      next[actorId] = { ...next[actorId] };
      next[actorId][day] = { ...next[actorId][day], [field]: value };

      // Auto-set target when sport changes
      if (field === 'sport_type') {
        if (value === 'Rest') {
          next[actorId][day].target_duration_min = 0;
          next[actorId][day].has_challenge = false;
        } else if (next[actorId][day].target_duration_min === 0) {
          next[actorId][day].target_duration_min = 30;
        }
      }
      return next;
    });
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      for (const actorId of ACTOR_ORDER) {
        for (let d = 0; d < 7; d++) {
          const plan = localPlans[actorId]?.[d];
          if (plan) await savePlan(actorId, d, plan);
        }
      }
      setDirty(false);
    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !plans) return <div className="p-4 text-xs text-navy-light">Loading plans...</div>;

  return (
    <div className="p-4 bg-cream-light/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
          {lang === 'en' ? '⚙️ Weekly Exercise Plan' : '⚙️ 每周运动计划'}
        </h3>
        <div className="flex gap-2">
          {dirty && (
            <button onClick={handleSave} disabled={saving}
              className="retro-btn text-[10px] px-2 py-1 bg-teal text-white border-teal-dark">
              <Save className="w-3 h-3 inline mr-1" />
              {saving ? '...' : lang === 'en' ? 'Save' : '保存'}
            </button>
          )}
          <button onClick={onClose} className="text-navy-light hover:text-navy">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr>
              <th className="text-left text-navy-light font-medium p-1 w-16"></th>
              {dayLabels.map((d, i) => (
                <th key={i} className="text-center text-navy-light font-medium p-1 min-w-[70px]">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ACTOR_ORDER.map(actorId => {
              const actorName = plans[actorId]?.name || actorId;
              return (
                <tr key={actorId} className="border-t border-cream-dark/50">
                  <td className="p-1 font-bold text-navy text-[11px]">{actorName}</td>
                  {Array.from({ length: 7 }, (_, d) => {
                    const cell = localPlans[actorId]?.[d] || {};
                    const isRest = cell.sport_type === 'Rest' || !cell.sport_type;
                    return (
                      <td key={d} className={`p-1 ${isRest ? 'bg-cream/50' : 'bg-white'}`}>
                        <select
                          value={cell.sport_type || 'Rest'}
                          onChange={e => updateCell(actorId, d, 'sport_type', e.target.value)}
                          className="w-full text-[10px] bg-transparent border-none outline-none cursor-pointer font-medium text-navy"
                        >
                          {SPORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {!isRest && (
                          <div className="flex items-center gap-0.5 mt-0.5">
                            <input
                              type="number" min="10" max="120" step="5"
                              value={cell.target_duration_min || 30}
                              onChange={e => updateCell(actorId, d, 'target_duration_min', parseInt(e.target.value) || 30)}
                              className="w-8 text-[9px] bg-cream-light rounded px-0.5 text-center border border-cream-dark/30"
                            />
                            <span className="text-[8px] text-navy-light">min</span>
                            <label className="flex items-center gap-0.5 ml-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={cell.has_challenge || false}
                                onChange={e => updateCell(actorId, d, 'has_challenge', e.target.checked)}
                                className="w-2.5 h-2.5"
                              />
                              <span className="text-[8px] text-coral">⚡</span>
                            </label>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-[9px] text-navy-light">
        ⚡ = {lang === 'en' ? 'Challenge mode (60min to exceed)' : '挑战模式（60分钟超越）'}
      </div>
    </div>
  );
}
