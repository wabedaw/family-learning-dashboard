import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLang } from '../i18n';

const trendIcons = { improving: TrendingUp, declining: TrendingDown, stable: Minus };
const trendColors = { improving: 'text-teal', declining: 'text-coral', stable: 'text-brown-light' };

const colorMap = {
  teal: 'bg-teal text-cream-light',
  coral: 'bg-coral text-cream-light',
  mustard: 'bg-mustard text-navy',
  navy: 'bg-navy text-cream-light',
  wine: 'bg-wine text-cream-light',
};

export default function StatusCard({ title, subtitle, value, trend, icon: Icon, color = 'teal' }) {
  const { t } = useLang();
  const TrendIcon = trendIcons[trend] || Minus;

  return (
    <div className="retro-card p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2.5 rounded-lg ${colorMap[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-navy">{title}</p>
            {subtitle && <p className="text-[11px] text-brown-light">{subtitle}</p>}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trendColors[trend]}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{t(`trend.${trend}`)}</span>
          </div>
        )}
      </div>
      <div className="mt-3 text-3xl font-black text-navy font-[family-name:var(--font-display)]">{value}</div>
    </div>
  );
}
