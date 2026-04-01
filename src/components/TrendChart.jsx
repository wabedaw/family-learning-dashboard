import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useLang } from '../i18n';

const COLORS = {
  academic: '#2A9D8F',
  progress: '#E9C46A',
  effort: '#E76F51',
  stability: '#264653',
  independence: '#9B2335',
};

export function OverallTrendChart({ data }) {
  const { t } = useLang();
  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('chart.overall')}</h3>
      <p className="text-[11px] text-brown-light mb-4">{t('chart.overall.sub')}</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E6D3" />
          <XAxis dataKey="term" tick={{ fontSize: 10, fill: '#5C4033' }} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#5C4033' }} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '2px solid #F5E6D3', background: '#FFF9F0', fontFamily: 'DM Sans' }} />
          <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'DM Sans' }} />
          {Object.entries(COLORS).map(([key, color]) => (
            <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#FFF9F0' }}
              name={key.charAt(0).toUpperCase() + key.slice(1)} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SubjectTrendChart({ data, subjects }) {
  const { t } = useLang();
  const subColors = ['#2A9D8F', '#E76F51', '#E9C46A', '#264653', '#9B2335'];
  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('chart.subject')}</h3>
      <p className="text-[11px] text-brown-light mb-4">{t('chart.subject.sub')}</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E6D3" />
          <XAxis dataKey="term" tick={{ fontSize: 10, fill: '#5C4033' }} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#5C4033' }} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '2px solid #F5E6D3', background: '#FFF9F0' }} />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          {subjects.map((s, i) => (
            <Line key={s} type="monotone" dataKey={s} stroke={subColors[i % subColors.length]} strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 2, fill: '#FFF9F0' }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CapabilityRadar({ data, name }) {
  const { t } = useLang();
  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('chart.radar')}</h3>
      <p className="text-[11px] text-brown-light mb-4">{name}{t('chart.radar.sub')}</p>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#F5E6D3" />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#5C4033' }} />
          <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 9, fill: '#8B6F5E' }} />
          <Radar name={name} dataKey="value" stroke="#2A9D8F" fill="#2A9D8F" fillOpacity={0.15} strokeWidth={2.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
