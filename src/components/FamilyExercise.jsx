import { useState } from 'react';
import { Activity, Flame, Settings, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import ExerciseRings, { RingLegend } from './ExerciseRings';
import ExercisePlanEditor from './ExercisePlanEditor';
import { useExerciseData } from '../hooks/useExerciseData';
import { useLang } from '../i18n';

const SPORT_EMOJI = {
  Running: '🏃', Basketball: '🏀', Swimming: '🏊', Cycling: '🚴',
  Yoga: '🧘', Strength: '💪', Walking: '🚶', Badminton: '🏸',
  Tennis: '🎾', Soccer: '⚽', Dance: '💃', Hiking: '🥾',
  default: '🏃',
};

function getSportEmoji(type) {
  if (!type) return '🏃';
  for (const [key, emoji] of Object.entries(SPORT_EMOJI)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return SPORT_EMOJI.default;
}

function formatTime(isoStr) {
  try {
    const d = new Date(isoStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Singapore' });
  } catch { return ''; }
}

export default function FamilyExercise() {
  const { data, loading, error, refresh } = useExerciseData();
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const { lang } = useLang();

  if (loading && !data) {
    return (
      <div className="bg-navy rounded-2xl p-5 shadow-lg text-center text-cream-light/60 h-full flex items-center justify-center">
        <Activity className="w-5 h-5 animate-pulse inline mr-2" />
        {lang === 'en' ? 'Loading...' : '加载中...'}
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-navy rounded-2xl p-5 shadow-lg text-center text-cream-light/60 h-full flex items-center justify-center">
        <Activity className="w-4 h-4 inline mr-1" />
        {lang === 'en' ? 'Connecting...' : '连接中...'}
      </div>
    );
  }

  if (!data) return null;

  const { memberRings, streak, recentRecords, totalCompleted, activeMemberCount, streakValid } = data;
  const members = Object.entries(memberRings || {});

  // Family ring: average of member ring2 percentages (non-rest)
  const activeMembers = members.filter(([, r]) => !r.restDay);
  const familyRing1 = activeMembers.length > 0 ? activeMembers.reduce((s, [, r]) => s + (r.ring1_pct || 0), 0) / activeMembers.length : 0;
  const familyRing2 = activeMembers.length > 0 ? activeMembers.reduce((s, [, r]) => s + (r.ring2_pct || 0), 0) / activeMembers.length : 0;
  const familyRing3 = activeMembers.length > 0 ? activeMembers.reduce((s, [, r]) => s + (r.ring3_pct || 0), 0) / activeMembers.length : 0;

  const streakDays = streak?.current || 0;
  const completed = totalCompleted || 0;
  const active = activeMemberCount || members.length;

  return (
    <div className="bg-navy rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-cream-light/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-cream-light" />
          </div>
          <div>
            <h2 className="text-base font-bold text-cream-light font-[family-name:var(--font-display)]">
              {lang === 'en' ? 'Family Exercise' : '家庭运动'}
            </h2>
            {streakDays > 0 && (
              <span className="text-[9px] text-coral font-bold flex items-center gap-0.5">
                <Flame className="w-3 h-3" />
                {streakDays} {lang === 'en' ? 'day streak' : '天连续'}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPlanEditor(!showPlanEditor)} className="text-cream-light/50 hover:text-cream-light transition-colors" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={refresh} className="text-cream-light/50 hover:text-cream-light transition-colors" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Plan Editor (toggle) */}
      {showPlanEditor && (
        <div className="border-b border-cream-light/10">
          <ExercisePlanEditor onClose={() => setShowPlanEditor(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Rings Row: Family ring + 4 individual */}
        <div className="flex items-center justify-center gap-5">
          {/* Family Ring */}
          <div className="flex flex-col items-center shrink-0">
            <ExerciseRings
              ring1Pct={familyRing1}
              ring2Pct={familyRing2}
              ring3Pct={familyRing3}
              size={110}
              showLabel={false}
            />
            <div className="mt-1 text-center">
              <div className="text-[11px] font-bold text-cream-light">
                {completed}/{active} {lang === 'en' ? 'done' : '完成'}
              </div>
              {streakValid && (
                <div className="text-[9px] text-teal-light font-medium">
                  ✓ {lang === 'en' ? 'Family goal met!' : '家庭目标达成！'}
                </div>
              )}
            </div>
          </div>

          {/* Individual Rings (2x2 grid) */}
          <div className="grid grid-cols-2 gap-3">
            {members.map(([id, rings]) => (
              <ExerciseRings
                key={id}
                ring1Pct={rings.ring1_pct || 0}
                ring2Pct={rings.ring2_pct || 0}
                ring3Pct={rings.ring3_pct || 0}
                size={52}
                restDay={rings.restDay}
                label={rings.name}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 flex justify-center">
          <RingLegend compact={true} />
        </div>

        {/* Recent Activity */}
        {recentRecords && recentRecords.length > 0 && (
          <div className="mt-3 pt-2 border-t border-cream-light/10">
            <button
              onClick={() => setShowRecent(!showRecent)}
              className="flex items-center gap-1 text-[10px] font-bold text-cream-light/50 uppercase tracking-wide mb-1.5 hover:text-cream-light/80 transition-colors"
            >
              {lang === 'en' ? 'Recent' : '记录'}
              {showRecent ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showRecent && (
              <div className="space-y-1">
                {recentRecords.slice(0, 4).map(rec => (
                  <div key={rec.id} className="flex items-center gap-1.5 text-[10px] text-cream-light/80 bg-cream-light/5 rounded px-2 py-1">
                    <span>{getSportEmoji(rec.sport_type)}</span>
                    <span className="font-medium">{rec.actor_id.charAt(0).toUpperCase() + rec.actor_id.slice(1)}</span>
                    <span className="text-cream-light/40">·</span>
                    <span>{rec.sport_type}</span>
                    <span className="text-cream-light/40">·</span>
                    <span className="font-medium">{rec.duration_min}min</span>
                    <span className="ml-auto text-cream-light/40 text-[9px]">{formatTime(rec.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {(!recentRecords || recentRecords.length === 0) && activeMembers.length > 0 && (
          <div className="mt-3 text-center text-[10px] text-cream-light/40 py-1">
            {lang === 'en'
              ? '💪 Send "sport + activity" via WhatsApp to check in!'
              : '💪 通过 WhatsApp 发送「运动+内容」打卡！'}
          </div>
        )}
      </div>
    </div>
  );
}
