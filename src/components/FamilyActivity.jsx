import { useState } from 'react';
import { Activity, BookOpen, Flame, Settings, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import ExerciseRings from './ExerciseRings';
import ReadingRings from './ReadingRings';
import ExercisePlanEditor from './ExercisePlanEditor';
import { useExerciseData, useReadingData } from '../hooks/useExerciseData';
import { useLang } from '../i18n';

const SPORT_EMOJI = {
  Running: '🏃', Basketball: '🏀', Swimming: '🏊', Cycling: '🚴',
  Yoga: '🧘', Strength: '💪', Walking: '🚶', Badminton: '🏸',
  Tennis: '🎾', Soccer: '⚽', Dance: '💃', Hiking: '🥾',
  Reading: '📖', default: '🏃',
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

const READING_GOAL = 60; // fixed 60 min per day
const READING_EXCEED = 30; // 30 min extra for full outer ring

/** Compute reading ring percentages from minutes */
function readingRingPcts(minutes) {
  const ring1 = Math.min(minutes / READING_GOAL, 1); // progress toward 60 min
  const ring2 = minutes >= READING_GOAL ? 1 : 0;      // goal met
  const ring3 = minutes > READING_GOAL ? Math.min((minutes - READING_GOAL) / READING_EXCEED, 1) : 0; // exceeded
  return { ring1, ring2, ring3 };
}

export default function FamilyActivity() {
  const { data: exData, loading: exLoading, error: exError, refresh: exRefresh } = useExerciseData();
  const { data: rdData, loading: rdLoading, error: rdError, refresh: rdRefresh } = useReadingData();
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [activeTab, setActiveTab] = useState('exercise'); // 'exercise' | 'reading'
  const { lang } = useLang();

  const loading = exLoading && rdLoading;
  const hasExData = !!exData;
  const hasRdData = !!rdData;

  function refresh() { exRefresh(); rdRefresh(); }

  if (loading && !hasExData && !hasRdData) {
    return (
      <div className="bg-navy rounded-2xl p-5 shadow-lg text-center text-cream-light/60 h-full flex items-center justify-center">
        <Activity className="w-5 h-5 animate-pulse inline mr-2" />
        {lang === 'en' ? 'Loading...' : '加载中...'}
      </div>
    );
  }

  if ((exError && rdError) && !hasExData && !hasRdData) {
    return (
      <div className="bg-navy rounded-2xl p-5 shadow-lg text-center text-cream-light/60 h-full flex items-center justify-center">
        <Activity className="w-4 h-4 inline mr-1" />
        {lang === 'en' ? 'Connecting...' : '连接中...'}
      </div>
    );
  }

  // ----- Exercise data -----
  const exMembers = Object.entries(exData?.memberRings || {});
  const exActive = exMembers.filter(([, r]) => !r.restDay);
  const exFam1 = exActive.length > 0 ? exActive.reduce((s, [, r]) => s + (r.ring1_pct || 0), 0) / exActive.length : 0;
  const exFam2 = exActive.length > 0 ? exActive.reduce((s, [, r]) => s + (r.ring2_pct || 0), 0) / exActive.length : 0;
  const exFam3 = exActive.length > 0 ? exActive.reduce((s, [, r]) => s + (r.ring3_pct || 0), 0) / exActive.length : 0;
  const exStreakDays = exData?.streak?.current || 0;
  const exCompleted = exData?.totalCompleted || 0;
  const exActiveCount = exData?.activeMemberCount || exMembers.length;

  // ----- Reading data -----
  const rdMembers = Object.entries(rdData?.memberReadings || {});
  // Fallback: if no reading endpoint yet, create placeholders from exercise members
  const readingMembers = rdMembers.length > 0 ? rdMembers : exMembers.map(([id, r]) => [id, { name: r.name, minutes: 0 }]);
  const rdRings = readingMembers.map(([id, r]) => [id, { ...r, ...readingRingPcts(r.minutes || 0) }]);
  const rdActiveCount = rdRings.length;
  const rdFam = rdActiveCount > 0
    ? rdRings.reduce((acc, [, r]) => ({ r1: acc.r1 + r.ring1, r2: acc.r2 + r.ring2, r3: acc.r3 + r.ring3 }), { r1: 0, r2: 0, r3: 0 })
    : { r1: 0, r2: 0, r3: 0 };
  const rdFam1 = rdActiveCount > 0 ? rdFam.r1 / rdActiveCount : 0;
  const rdFam2 = rdActiveCount > 0 ? rdFam.r2 / rdActiveCount : 0;
  const rdFam3 = rdActiveCount > 0 ? rdFam.r3 / rdActiveCount : 0;
  const rdCompleted = rdRings.filter(([, r]) => r.ring2 >= 1).length;
  const rdStreak = rdData?.streak?.current || 0;

  // Recent records: combine exercise + reading
  const exRecent = (exData?.recentRecords || []).map(r => ({ ...r, _type: 'exercise' }));
  const rdRecent = (rdData?.recentRecords || []).map(r => ({ ...r, _type: 'reading', sport_type: 'Reading' }));
  const allRecent = [...exRecent, ...rdRecent]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, 6);

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
              Family Activity
            </h2>
            <div className="flex items-center gap-2">
              {exStreakDays > 0 && (
                <span className="text-[9px] text-coral font-bold flex items-center gap-0.5">
                  <Flame className="w-3 h-3" />
                  {exStreakDays}🏃
                </span>
              )}
              {rdStreak > 0 && (
                <span className="text-[9px] text-purple-400 font-bold flex items-center gap-0.5">
                  <Flame className="w-3 h-3" />
                  {rdStreak}📖
                </span>
              )}
            </div>
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

      {/* Plan Editor */}
      {showPlanEditor && (
        <div className="border-b border-cream-light/10">
          <ExercisePlanEditor onClose={() => setShowPlanEditor(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* === Rings Row: [Exercise Big] [4 Individual] [Reading Big] === */}
        <div className="flex items-center justify-center gap-4">
          {/* LEFT — Exercise Family Ring */}
          <div className="flex flex-col items-center shrink-0">
            <ExerciseRings
              ring1Pct={exFam1} ring2Pct={exFam2} ring3Pct={exFam3}
              size={100} showLabel={false}
            />
            <div className="mt-1 text-center">
              <div className="text-[10px] font-bold text-cream-light">
                🏃 {lang === 'en' ? 'Exercise' : '运动'}
              </div>
              <div className="text-[9px] text-cream-light/50">
                {exCompleted}/{exActiveCount}
              </div>
            </div>
          </div>

          {/* CENTER — 4 Individual Rings (2x2) */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 shrink-0">
            {exMembers.map(([id, rings]) => {
              const rd = rdRings.find(([rid]) => rid === id);
              const rdPcts = rd ? rd[1] : { ring1: 0, ring2: 0, ring3: 0 };
              return (
                <div key={id} className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-1">
                    <ExerciseRings
                      ring1Pct={rings.ring1_pct || 0}
                      ring2Pct={rings.ring2_pct || 0}
                      ring3Pct={rings.ring3_pct || 0}
                      size={34} restDay={rings.restDay}
                      showLabel={false}
                    />
                    <ReadingRings
                      ring1Pct={rdPcts.ring1 || 0}
                      ring2Pct={rdPcts.ring2 || 0}
                      ring3Pct={rdPcts.ring3 || 0}
                      size={34}
                      noData={!hasRdData && (rdPcts.ring1 || 0) === 0}
                      showLabel={false}
                    />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wide text-navy-light">
                    {rings.name || id}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT — Reading Family Ring */}
          <div className="flex flex-col items-center shrink-0">
            <ReadingRings
              ring1Pct={rdFam1} ring2Pct={rdFam2} ring3Pct={rdFam3}
              size={100} showLabel={false}
              noData={!hasRdData && rdFam1 === 0}
            />
            <div className="mt-1 text-center">
              <div className="text-[10px] font-bold text-cream-light">
                📖 {lang === 'en' ? 'Reading' : '阅读'}
              </div>
              <div className="text-[9px] text-cream-light/50">
                {rdCompleted}/{rdActiveCount}
              </div>
            </div>
          </div>
        </div>

        {/* Tab switch: Exercise / Reading records */}
        <div className="mt-3 pt-2 border-t border-cream-light/10">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setActiveTab('exercise')}
              className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${
                activeTab === 'exercise' ? 'text-coral' : 'text-cream-light/40 hover:text-cream-light/60'
              }`}
            >
              🏃 {lang === 'en' ? 'Exercise' : '运动'}
            </button>
            <button
              onClick={() => setActiveTab('reading')}
              className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${
                activeTab === 'reading' ? 'text-purple-400' : 'text-cream-light/40 hover:text-cream-light/60'
              }`}
            >
              📖 {lang === 'en' ? 'Reading' : '阅读'}
            </button>
            <div className="ml-auto">
              <button
                onClick={() => setShowRecent(!showRecent)}
                className="text-cream-light/40 hover:text-cream-light/60 transition-colors"
              >
                {showRecent ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {showRecent && (
            <div className="space-y-1">
              {allRecent
                .filter(r => activeTab === 'exercise' ? r._type === 'exercise' : r._type === 'reading')
                .slice(0, 4)
                .map(rec => (
                  <div key={rec.id} className="flex items-center gap-1.5 text-[10px] text-cream-light/80 bg-cream-light/5 rounded px-2 py-1">
                    <span>{getSportEmoji(rec.sport_type)}</span>
                    <span className="font-medium">{(rec.actor_id || '').charAt(0).toUpperCase() + (rec.actor_id || '').slice(1)}</span>
                    <span className="text-cream-light/40">·</span>
                    <span>{rec.sport_type}</span>
                    <span className="text-cream-light/40">·</span>
                    <span className="font-medium">{rec.duration_min}min</span>
                    <span className="ml-auto text-cream-light/40 text-[9px]">{formatTime(rec.created_at)}</span>
                  </div>
                ))}
              {allRecent.filter(r => activeTab === 'exercise' ? r._type === 'exercise' : r._type === 'reading').length === 0 && (
                <div className="text-center text-[10px] text-cream-light/40 py-1">
                  {activeTab === 'exercise'
                    ? (lang === 'en' ? '💪 Send "sport + activity" via WhatsApp!' : '💪 通过 WhatsApp 发送「运动+内容」打卡！')
                    : (lang === 'en' ? '📖 Send "read 30min" via WhatsApp!' : '📖 通过 WhatsApp 发送「阅读30分钟」打卡！')
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
