import { AlertTriangle, AlertCircle, Info, TrendingDown, Star } from 'lucide-react';
import { useLang } from '../i18n';

const severityConfig = {
  high: { icon: AlertTriangle, color: 'text-coral', bg: 'bg-coral-light', border: 'border-coral' },
  medium: { icon: AlertCircle, color: 'text-mustard', bg: 'bg-mustard-light', border: 'border-mustard' },
  low: { icon: Info, color: 'text-teal-dark', bg: 'bg-teal-light', border: 'border-teal' },
};
const typeIcons = { declining: TrendingDown, recurring: AlertCircle, monitor: Info, transition: AlertTriangle };

export function WarningCard({ warning }) {
  const config = severityConfig[warning.severity] || severityConfig.low;
  const TypeIcon = typeIcons[warning.type] || Info;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border-2 ${config.bg} ${config.border}`}>
      <TypeIcon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-navy">{warning.subject}</span>
          <span className={`retro-badge ${config.bg} ${config.color} border-current`}>{warning.type}</span>
        </div>
        <p className="text-[11px] text-brown leading-relaxed">{warning.message}</p>
      </div>
    </div>
  );
}

export function StrengthCard({ strength }) {
  const { t } = useLang();
  return (
    <div className="bg-gradient-to-br from-teal-light to-cream-light rounded-xl border-2 border-teal p-4 shadow-[3px_3px_0_#2A9D8F33]">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-mustard" />
        <h4 className="text-sm font-bold text-navy font-[family-name:var(--font-display)]">{strength.subject}</h4>
        <span className={`retro-badge ${strength.investmentLevel === 'high' ? 'bg-coral text-cream-light border-coral' : 'bg-mustard text-navy border-mustard'}`}>
          {strength.investmentLevel === 'high' ? t('strength.high') : t('strength.medium')}
        </span>
      </div>
      <div className="mb-3">
        <p className="text-[9px] text-teal-dark uppercase tracking-wider font-bold mb-1">{t('strength.evidence')}</p>
        <div className="flex flex-wrap gap-1">
          {strength.evidence.map((e, i) => (
            <span key={i} className="text-[11px] px-2 py-0.5 bg-white/70 rounded border border-teal/20 text-navy font-medium">{e}</span>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-navy leading-relaxed">{strength.recommendation}</p>
    </div>
  );
}

export function WarningsAndStrengths({ warnings, strengths }) {
  const { t } = useLang();
  return (
    <div className="space-y-4">
      {warnings?.length > 0 && (
        <div className="retro-card p-5">
          <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('warning.title')}</h3>
          <p className="text-[11px] text-brown-light mb-3">{t('warning.sub')}</p>
          <div className="space-y-2">{warnings.map((w, i) => <WarningCard key={i} warning={w} />)}</div>
        </div>
      )}
      {strengths?.length > 0 && (
        <div className="retro-card p-5">
          <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('strength.title')}</h3>
          <p className="text-[11px] text-brown-light mb-3">{t('strength.sub')}</p>
          <div className="space-y-3">{strengths.map((s, i) => <StrengthCard key={i} strength={s} />)}</div>
        </div>
      )}
    </div>
  );
}
