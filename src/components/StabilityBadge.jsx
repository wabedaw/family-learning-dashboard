import { useLang } from '../i18n';

export default function StabilityBadge({ name, label, data }) {
  const { t } = useLang();
  const { current, trend, history } = data;
  const trendLabel = t(`trend.${trend}`);
  const trendColor = trend === 'improving' ? 'text-teal' : trend === 'declining' ? 'text-coral' : 'text-brown-light';

  return (
    <div className="retro-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-[13px] font-bold text-navy">{label}</h4>
          <span className={`text-[11px] font-bold ${trendColor}`}>{trendLabel}</span>
        </div>
        <div className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">{current}<span className="text-sm text-brown-light font-normal">/5</span></div>
      </div>
      <div className="flex items-end gap-1.5 h-10">
        {history.map((v, i) => (
          <div key={i} className="flex-1 rounded-sm transition-all"
            style={{ height: `${(v / 5) * 100}%`, backgroundColor: i === history.length - 1 ? '#2A9D8F' : '#F5E6D3' }}
            title={`Term ${i + 1}: ${v}/5`} />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        {history.map((_, i) => (
          <span key={i} className="text-[9px] text-brown-light flex-1 text-center font-semibold">T{i + 1}</span>
        ))}
      </div>
    </div>
  );
}

export function StabilityOverview({ indicators, labels }) {
  const { t } = useLang();
  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('behavior.title')}</h3>
      <p className="text-[11px] text-brown-light mb-4">{t('behavior.sub')}</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(indicators).map(([key, data]) => (
          <StabilityBadge key={key} name={key} label={labels[key] || key} data={data} />
        ))}
      </div>
    </div>
  );
}
