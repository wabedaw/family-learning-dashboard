import { CheckCircle, AlertTriangle, Lightbulb, Sparkles, Home } from 'lucide-react';
import { useLang } from '../i18n';

export default function CommentInsight({ insight }) {
  const { t } = useLang();

  const categories = [
    { key: 'strengths', label: t('comment.strengths'), icon: CheckCircle, color: 'text-teal-dark', bg: 'bg-teal-light', border: 'border-teal/30' },
    { key: 'concerns', label: t('comment.concerns'), icon: AlertTriangle, color: 'text-coral', bg: 'bg-coral-light', border: 'border-coral/30' },
    { key: 'suggestions', label: t('comment.suggestions'), icon: Lightbulb, color: 'text-navy', bg: 'bg-cream-dark/50', border: 'border-navy/20' },
    { key: 'signals', label: t('comment.signals'), icon: Sparkles, color: 'text-wine', bg: 'bg-wine-light', border: 'border-wine/30' },
    { key: 'familyAction', label: t('comment.familyAction'), icon: Home, color: 'text-brown', bg: 'bg-mustard-light', border: 'border-mustard/50' },
  ];

  if (!insight) return null;

  return (
    <div className="space-y-3">
      {categories.map(cat => {
        const data = insight[cat.key];
        if (!data || (Array.isArray(data) && data.length === 0)) return null;
        const items = Array.isArray(data) ? data : [data];
        return (
          <div key={cat.key}>
            <div className={`flex items-center gap-1.5 mb-1.5 ${cat.color}`}>
              <cat.icon className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">{cat.label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item, i) => (
                <span key={i} className={`text-[11px] px-2.5 py-1 rounded-md border ${cat.bg} ${cat.color} ${cat.border} font-medium`}>{item}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CommentSummary({ reports }) {
  const { t } = useLang();
  const latestReport = reports[reports.length - 1];
  if (!latestReport) return null;

  const allInsights = latestReport.subjects.map(s => s.commentInsight).filter(Boolean);
  const aggregate = { strengths: [], concerns: [], suggestions: [], signals: [] };
  allInsights.forEach(insight => {
    if (insight.strengths) aggregate.strengths.push(...insight.strengths);
    if (insight.concerns) aggregate.concerns.push(...insight.concerns);
    if (insight.suggestions) aggregate.suggestions.push(...insight.suggestions);
    if (insight.signals) aggregate.signals.push(...insight.signals);
  });
  Object.keys(aggregate).forEach(key => { aggregate[key] = [...new Set(aggregate[key])]; });

  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('comment.title')}</h3>
      <p className="text-[11px] text-brown-light mb-4">{t('comment.sub')} {latestReport.term}</p>
      <CommentInsight insight={aggregate} />
    </div>
  );
}
