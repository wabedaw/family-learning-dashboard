import { Target, CheckCircle, Clock, AlertCircle, Pencil, Calendar, Repeat } from 'lucide-react';
import { useLang } from '../i18n';

export default function GoalCard({ goal, onEdit }) {
  const { t, lang } = useLang();

  const statusConfig = {
    'on-track': { icon: Clock, color: 'text-teal-dark', bg: 'bg-teal-light', border: 'border-teal', label: t('status.onTrack') },
    'in-progress': { icon: Clock, color: 'text-coral', bg: 'bg-coral-light', border: 'border-coral', label: t('status.inProgress') },
    'achieved': { icon: CheckCircle, color: 'text-teal', bg: 'bg-teal-light', border: 'border-teal', label: t('status.achieved') },
    'at-risk': { icon: AlertCircle, color: 'text-wine', bg: 'bg-wine-light', border: 'border-wine', label: '需关注' },
  };
  const typeLabels = { academic: t('goal.academic'), habit: t('goal.habit'), strength: t('goal.strength') };
  const config = statusConfig[goal.status] || statusConfig['in-progress'];
  const StatusIcon = config.icon;

  return (
    <div className={`retro-card border-2 ${config.border} p-4 relative group`}>
      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(goal); }}
          className="absolute top-3 right-3 w-7 h-7 rounded-md bg-cream-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cream-dark"
          title="Edit goal"
        >
          <Pencil className="w-3.5 h-3.5 text-brown" />
        </button>
      )}
      <div className="flex items-start justify-between mb-2 pr-6">
        <div className="flex items-center gap-2">
          <Target className={`w-4 h-4 ${config.color}`} />
          <span className="retro-badge bg-cream-dark text-brown border-cream-dark">{typeLabels[goal.type] || goal.type}</span>
        </div>
        <span className={`retro-badge ${config.bg} ${config.color} border-current`}>
          <StatusIcon className="w-3 h-3 inline mr-1" />{config.label}
        </span>
      </div>
      <h4 className="font-bold text-sm text-navy font-[family-name:var(--font-display)] mb-1">{goal.title}</h4>
      <p className="text-[11px] text-brown-light mb-3">{goal.reason}</p>
      <div className="grid grid-cols-3 gap-2 text-[11px] mb-3">
        <div><span className="text-brown-light uppercase tracking-wider text-[9px]">{t('goal.priority')}</span><div className="font-bold text-navy">{goal.priority}</div></div>
        <div><span className="text-brown-light uppercase tracking-wider text-[9px]">{t('goal.time')}</span><div className="font-bold text-navy">{goal.timeBudget}</div></div>
        <div><span className="text-brown-light uppercase tracking-wider text-[9px]">{t('goal.owner')}</span><div className="font-bold text-navy">{goal.owner}</div></div>
      </div>
      {/* Schedule info */}
      {(goal.startDate || goal.frequency) && (
        <div className="flex flex-wrap items-center gap-2 text-[9px] text-brown-light mb-3">
          {goal.startDate && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-cream rounded border border-cream-dark">
              <Calendar className="w-2.5 h-2.5" />
              {goal.startDate}{goal.endDate ? ` → ${goal.endDate}` : ''}
            </span>
          )}
          {goal.frequency && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-cream rounded border border-cream-dark">
              <Repeat className="w-2.5 h-2.5" />
              {goal.frequency === 'daily' ? (lang === 'zh' ? '每天' : 'Daily')
                : goal.frequency === 'weekdays' ? (lang === 'zh' ? '工作日' : 'Weekdays')
                : (lang === 'zh' ? '每周' : 'Weekly') + (goal.weekDays?.length ? ` (${goal.weekDays.map(d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(', ')})` : '')}
            </span>
          )}
        </div>
      )}
      {goal.observations?.length > 0 && (
        <div className="border-t-2 border-dashed border-cream-dark pt-2">
          <p className="text-[9px] text-brown-light uppercase tracking-wider mb-1">{t('goal.observations')}</p>
          <ul className="space-y-0.5">
            {goal.observations.map((obs, i) => (
              <li key={i} className="text-[11px] text-brown flex items-start gap-1.5">
                <span className="text-teal mt-0.5 font-bold">&#x2022;</span> {obs}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
