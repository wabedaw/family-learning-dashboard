/**
 * ExerciseRings — Apple Watch style three concentric rings (SVG)
 *
 * Ring 1 (inner, teal):   Check-in (≥30 min)
 * Ring 2 (middle, mustard): Daily goal met
 * Ring 3 (outer, coral):  Exceeded / challenge
 */

const RING_COLORS = {
  ring1: { active: '#2A9D8F', bg: '#2A9D8F22' },  // teal
  ring2: { active: '#E9C46A', bg: '#E9C46A22' },  // mustard
  ring3: { active: '#E76F51', bg: '#E76F5122' },  // coral
};

export default function ExerciseRings({
  ring1Pct = 0,
  ring2Pct = 0,
  ring3Pct = 0,
  size = 120,
  restDay = false,
  label = '',
  showLabel = true,
}) {
  const center = size / 2;
  const strokeWidth = size * 0.1;
  const gap = strokeWidth * 0.4;

  // Radii for each ring (inner to outer)
  const r1 = center - strokeWidth * 2.5;
  const r2 = center - strokeWidth * 1.3;
  const r3 = center - strokeWidth * 0.1;

  function RingCircle({ radius, pct, color, bgColor }) {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - Math.min(pct, 1));

    return (
      <>
        {/* Background track */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none" stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
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

  if (restDay) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <circle cx={center} cy={center} r={center - strokeWidth} fill="none" stroke="#E5DDD0" strokeWidth={1} strokeDasharray="4 4" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brown-light text-xs">REST</span>
          </div>
        </div>
        {showLabel && label && <span className="text-[9px] font-bold uppercase tracking-wide text-navy-light">{label}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <RingCircle radius={r1} pct={ring1Pct} color={RING_COLORS.ring1.active} bgColor={RING_COLORS.ring1.bg} />
          <RingCircle radius={r2} pct={ring2Pct} color={RING_COLORS.ring2.active} bgColor={RING_COLORS.ring2.bg} />
          <RingCircle radius={r3} pct={ring3Pct} color={RING_COLORS.ring3.active} bgColor={RING_COLORS.ring3.bg} />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {ring1Pct >= 1 && ring2Pct >= 1 && ring3Pct >= 1 ? (
            <span className="text-lg">🌟</span>
          ) : ring2Pct >= 1 ? (
            <span className="text-lg">✅</span>
          ) : ring1Pct >= 1 ? (
            <span className="text-sm">🏃</span>
          ) : null}
        </div>
      </div>
      {showLabel && label && <span className="text-[9px] font-bold uppercase tracking-wide text-navy-light">{label}</span>}
    </div>
  );
}

// Ring legend component
export function RingLegend({ compact = false }) {
  const items = [
    { color: RING_COLORS.ring1.active, label: 'Check-in (≥30min)', labelZh: '签到' },
    { color: RING_COLORS.ring2.active, label: 'Daily Goal', labelZh: '目标' },
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
