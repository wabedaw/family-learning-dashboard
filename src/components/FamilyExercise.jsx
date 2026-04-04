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
  const [showRecent, setShowRecent] = useState(true);
  const { lang } = useLang();

  if (loading && !data) {
    return (
      <div className="retro-card mt-6 p-6 text-center text-navy-light">
        <Activity className="w-5 h-5 animate-pulse inline mr-2" />
        {lang === 'en' ? 'Loading exercise data...' : '加载运动数据...'}
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="retro-card mt-6 p-4 text-center text-brown-light text-sm">
        <Activity className="w-4 h-4 inline mr-1" />
        {lang === 'en' ? 'Exercise system connecting...' : '运动系统连接中...'}
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
    <div className="retro-card mt-6 overflow-hidden">
      {/* Header */}
      <div className="bg-navy text-cream px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span className="font-display text-sm font-bold tracking-wide uppercase">
            {lang === 'en' ? 'Family Exercise' : '家庭运动'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {streakDays > 0 && (
            <span className="bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {streakDays} {lang === 'en' ? 'day streak' : '天连续'}
            </span>
          )}
          <button onClick={() => setShowPlanEditor(!showPlanEditor)} className="text-cream/70 hover:text-cream transition-colors" title="Exercise Plan Settings">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={refresh} className="text-cream/70 hover:text-cream transition-colors" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Plan Editor (toggle) */}
      {showPlanEditor && (
        <div className="border-b-2 border-cream-dark">
          <ExercisePlanEditor onClose={() => setShowPlanEditor(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="p-4">
        {/* Family Ring + Individual Rings */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Family Ring (large) */}
          <div className="flex flex-col items-center">
            <ExerciseRings
              ring1Pct={familyRing1}
              ring2Pct={familyRing2}
              ring3Pct={familyRing3}
              size={140}
              showLabel={false}
            />
            <div className="mt-1 text-center">
              <div className="text-xs font-bold text-navy">
                {completed}/{active} {lang === 'en' ? 'completed' : '已完成'}
              </div>
              {streakValid && (
                <div className="text-[10px] text-teal font-medium">
                  ✓ {lang === 'en' ? 'Family goal met today!' : '今日家庭目标达成！'}
                </div>
              )}
            </div>
          </div>

          {/* Individual Rings (4 small) */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {members.map(([id, rings]) => (
              <ExerciseRings
                key={id}
                ring1Pct={rings.ring1_pct || 0}
                ring2Pct={rings.ring2_pct || 0}
                ring3Pct={rings.ring3_pct || 0}
                size={64}
                restDay={rings.restDay}
                label={rings.name}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex justify-center">
          <RingLegend compact={lang !== 'en'} />
        </div>

        {/* Recent Activity */}
        {recentRecords && recentRecords.length > 0 && (
          <div className="mt-4 border-t border-cream-dark pt-3">
            <button
              onClick={() => setShowRecent(!showRecent)}
              className="flex items-center gap-1 text-xs font-bold text-navy-light uppercase tracking-wide mb-2 hover:text-navy transition-colors"
            >
              {lang === 'en' ? 'Recent Activity' : '最近运动'}
              {showRecent ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showRecent && (
              <div className="space-y-1.5">
                {recentRecords.slice(0, 5).map(rec => (
                  <div key={rec.id} className="flex items-center gap-2 text-xs text-navy bg-cream-light/50 rounded px-2 py-1.5">
                    <span>{getSportEmoji(rec.sport_type)}</span>
                    <span className="font-medium">{rec.actor_id.charAt(0).toUpperCase() + rec.actor_id.slice(1)}</span>
                    <span className="text-navy-light">·</span>
                    <span>{rec.sport_type}</span>
                    <span className="text-navy-light">·</span>
                    <span className="font-medium">{rec.duration_min}min</span>
                    <span className="ml-auto text-navy-light text-[10px]">{formatTime(rec.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {(!recentRecords || recentRecords.length === 0) && activeMembers.length > 0 && (
          <div className="mt-4 text-center text-xs text-brown-light py-2">
            {lang === 'en'
              ? '💪 No exercise logged today yet. Send "sport + activity" via WhatsApp!'
              : '💪 今天还没有运动记录。通过 WhatsApp 发送「运动 + 内容」打卡！'}
          </div>
        )}
      </div>
    </div>
  );
}
