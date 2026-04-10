/**
 * ReadingRings — Apple Watch style three concentric rings for reading (SVG)
 *
 * Ring 1 (inner, sky-blue):  Progress toward 60 min
 * Ring 2 (middle, purple):   Goal met (≥60 min)
 * Ring 3 (outer, violet):    Exceeded (>60 min bonus)
 */

const RING_COLORS = {
  ring1: { active: '#38BDF8', bg: '#38BDF822' },  // sky-blue
  ring2: { active: '#A78BFA', bg: '#A78BFA22' },  // purple
  ring3: { active: '#E879F9', bg: '#E879F922' },  // fuchsia
};

export default function ReadingRings({
  ring1Pct = 0,
  ring2Pct = 0,
  ring3Pct = 0,
  size = 120,
  label = '',
  showLabel = true,
  noData = false,
}) {
  const viewBox = 100;
  const center = viewBox / 2;
  const strokeWidth = 8;
  const gap = 2;

  const r3 = center - strokeWidth / 2 - 1;
  const r2 = r3 - strokeWidth - gap;
  const r1 = r2 - strokeWidth - gap;

  function RingCircle({ radius, pct, color, bgColor }) {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - Math.min(pct, 1));
    return (
      <>
        <circle cx={center} cy={center} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        {pct > 0 && (
          <circle
            cx={center} cy={center} r={radius}
            fill="none" stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        )}
      </>
    );
  }

  if (noData) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${viewBox} ${viewBox}`}>
            <circle cx={center} cy={center} r={r2} fill="none" stroke="#E5DDD0" strokeWidth={1} strokeDasharray="4 4" />
          </svg>
          <div className="flex items-center justify-center" style={{ marginTop: -size, height: size }}>
            <span className="text-brown-light" style={{ fontSize: size * 0.14 }}>📖</span>
          </div>
        </div>
        {showLabel && label && <span className="text-[9px] font-bold uppercase tracking-wide text-navy-light">{label}</span>}
      </div>
    );
  }

  const iconSize = size >= 100 ? 'text-lg' : size >= 60 ? 'text-sm' : 'text-xs';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${viewBox} ${viewBox}`}>
          <RingCircle radius={r1} pct={ring1Pct} color={RING_COLORS.ring1.active} bgColor={RING_COLORS.ring1.bg} />
          <RingCircle radius={r2} pct={ring2Pct} color={RING_COLORS.ring2.active} bgColor={RING_COLORS.ring2.bg} />
          <RingCircle radius={r3} pct={ring3Pct} color={RING_COLORS.ring3.active} bgColor={RING_COLORS.ring3.bg} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {ring1Pct >= 1 && ring2Pct >= 1 && ring3Pct >= 1 ? (
            <span className={iconSize}>🌟</span>
          ) : ring2Pct >= 1 ? (
            <span className={iconSize}>📚</span>
          ) : ring1Pct > 0 ? (
            <span className={iconSize}>📖</span>
          ) : null}
        </div>
      </div>
      {showLabel && label && <span className="text-[9px] font-bold uppercase tracking-wide text-navy-light">{label}</span>}
    </div>
  );
}

export function ReadingRingLegend({ compact = false }) {
  const items = [
    { color: RING_COLORS.ring1.active, label: 'Progress (<60min)', labelZh: '进度' },
    { color: RING_COLORS.ring2.active, label: 'Goal (60min)', labelZh: '达标' },
    { color: RING_COLORS.ring3.active, label: 'Exceeded', labelZh: '超越' },
  ];

  return (
    <div className={`flex ${compact ? 'gap-3' : 'gap-4'} text-[10px] text-navy-light`}>
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{compact ? item.labelZh : item.label}</span>
        </div>
      ))}
    </div>
  );
}
