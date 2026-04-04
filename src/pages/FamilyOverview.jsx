import { useState, useCallback } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getLatestReport, getOverallTrend } from '../data';
import { useData } from '../store/DataContext';
import { useTranslatedChildren } from '../hooks/useTranslatedChild';
import { igcseActionPlans } from '../data/igcseActionPlans';
import { schoolCalendar, newsletterSummary } from '../data/weeklyCalendar';
import { Upload, TrendingUp, TrendingDown, Minus, Target, ChevronRight, Star, Sparkles, AlertTriangle, CheckCircle, Clock, ArrowRight, Flag, Calendar, Maximize2, Minimize2, CircleCheck } from 'lucide-react';
import { useLang } from '../i18n';
import Avatar from '../components/Avatar';
import CheckInModal from '../components/CheckInModal';
import FamilyExercise from '../components/FamilyExercise';
import { generateWeekTasks, useTasks, isCheckedIn } from '../store/TaskStore';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

// ─── Helpers ────────────────────────────────────────────────
function getChildMetrics(child) {
  const reports = child.reports || [];
  const latest = reports[reports.length - 1];
  const trend = getOverallTrend(child);
  if (!latest) return null;
  const avg = +(latest.subjects.reduce((s, sub) => s + (sub.standardised?.academic || 0), 0) / latest.subjects.length).toFixed(1);
  const prevAvg = trend.length >= 2 ? trend[trend.length - 2].academic : avg;
  const delta = +(avg - prevAvg).toFixed(1);
  const strong = latest.subjects.filter(s => (s.standardised?.academic || 0) >= 4);
  const weak = latest.subjects.filter(s => (s.standardised?.academic || 0) <= 2);
  const bestEffort = latest.subjects.filter(s => (s.standardised?.effort || 0) >= 5);
  return { latest, trend, avg, delta, strong, weak, bestEffort, reports };
}

const goalPct = (g) => ({ achieved: 100, 'on-track': 65, 'in-progress': 30, 'at-risk': 15 }[g.status] || 0);

// Merge static calendar + uploaded newsletter events from DataContext
function getMergedCalendar(children) {
  const merged = [...schoolCalendar];
  // Collect keyDates from uploaded newsletters
  children.forEach(child => {
    (child.newsletters || []).forEach(nl => {
      (nl.keyDates || []).forEach(kd => {
        if (kd.date && kd.event) {
          // Avoid duplicates
          const exists = merged.some(e => e.date === kd.date && e.event === kd.event);
          if (!exists) {
            merged.push({
              date: kd.date,
              event: kd.event,
              eventZh: kd.event,
              category: kd.category || 'event',
              relevance: kd.childRelevant ? [child.id] : ['parents'],
              priority: kd.relevance || 'medium',
              source: 'upload',
            });
          }
        }
      });
      // Also add action items as events
      (nl.actionRequired || []).forEach((action, i) => {
        if (nl.date) {
          merged.push({
            date: nl.date,
            event: typeof action === 'string' ? action : action.item || '',
            eventZh: typeof action === 'string' ? action : action.item || '',
            category: 'event',
            relevance: [child.id, 'parents'],
            priority: 'high',
            source: 'upload',
          });
        }
      });
    });
  });
  return merged.sort((a, b) => a.date.localeCompare(b.date));
}

function getUpcoming(calendar, days = 45) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today); cutoff.setDate(cutoff.getDate() + days);
  return calendar.filter(e => { const d = new Date(e.date); return d >= today && d <= cutoff; });
}

const catIcons = { holiday: '🏖️', trip: '✈️', event: '🎭', school: '🏫', sport: '⚽' };

// ─── Main Page ──────────────────────────────────────────────
export default function FamilyOverview() {
  const { children } = useData();
  const tChildren = useTranslatedChildren(children);
  const { t, lang } = useLang();
  const outletCtx = useOutletContext() || {};
  const isFullscreen = outletCtx.isFullscreen || false;

  const mergedCal = getMergedCalendar(children);
  const upcoming = getUpcoming(mergedCal, 45);
  const [checkInTask, setCheckInTask] = useState(null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <div className={`mx-auto transition-all duration-300 ${isFullscreen ? 'max-w-[1600px] px-10 py-6' : 'max-w-7xl p-6'}`}>
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">{t('overview.title')}</h1>
          <p className="text-[11px] text-brown-light mt-0.5">{t('overview.subtitle')}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={toggleFullscreen} className="w-8 h-8 rounded-lg bg-cream-dark/50 flex items-center justify-center hover:bg-cream-dark transition-colors" title={lang === 'zh' ? '全屏' : 'Fullscreen'}>
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-navy" /> : <Maximize2 className="w-4 h-4 text-navy" />}
          </button>
          <Link to="/upload" className="retro-btn flex items-center gap-1.5 px-3 py-1.5 bg-coral text-cream-light border-coral text-[11px]">
            <Upload className="w-3.5 h-3.5" /> {lang === 'zh' ? '上传' : 'Upload'}
          </Link>
          <Link to="/actions" className="retro-btn flex items-center gap-1.5 px-3 py-1.5 bg-teal text-cream-light border-teal text-[11px]">
            <Target className="w-3.5 h-3.5" /> {lang === 'zh' ? '学习行动' : 'Actions'}
          </Link>
        </div>
      </div>

      {/* ═══════ TOP ROW: Calendar + Exercise Side by Side ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SchoolCalendar upcoming={upcoming} lang={lang} hasUploaded={children.some(c => (c.newsletters || []).length > 0)} allChildren={tChildren} onCheckIn={setCheckInTask} mergedCal={mergedCal} />
        <FamilyExercise />
      </div>

      {/* ═══════ TWO COLUMNS: Michael | Lucas ═══════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {tChildren.map(child => <ChildColumn key={child.id} child={child} lang={lang} />)}
      </div>

      {/* Check-in Modal */}
      {checkInTask && <CheckInModal task={checkInTask} onClose={() => setCheckInTask(null)} />}
    </div>
  );
}

// ─── 3-Day Calendar Cell (yesterday / today / tomorrow) ─────
function ThreeDayCell({ date, todayStr, events, tasks, checkins, lang, onCheckIn, isToday, isPast }) {
  const [expanded, setExpanded] = useState(false);
  const dateStr = date.toISOString().split('T')[0];

  const dayEvents = events.filter(e => e.date === dateStr);
  const dayTasks = tasks.filter(t => t.date === dateStr);
  const allItems = [
    ...dayEvents.map(e => ({ type: 'event', data: e })),
    ...dayTasks.map(t => ({ type: 'task', data: t })),
  ];
  const maxVisible = 4;
  const hiddenCount = allItems.length - maxVisible;
  const visibleItems = expanded ? allItems : allItems.slice(0, maxVisible);

  const bgMap = { holiday: 'bg-coral', trip: 'bg-teal', event: 'bg-mustard', school: 'bg-cream-light/20', sport: 'bg-teal-dark' };
  const dayLabel = isToday
    ? (lang === 'zh' ? '今天' : 'Today')
    : isPast
      ? (lang === 'zh' ? '昨天' : 'Yesterday')
      : (lang === 'zh' ? '明天' : 'Tomorrow');

  const dayName = date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short' });

  return (
    <div className={`flex-1 min-h-[120px] rounded-lg p-2.5 transition-all ${
      isToday ? 'bg-mustard/20 ring-2 ring-mustard' :
      isPast ? 'bg-cream-light/5' :
      'bg-cream-light/8 border border-cream-light/10'
    }`}>
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className={`text-[13px] font-black ${isToday ? 'text-mustard' : isPast ? 'text-cream-light/40' : 'text-cream-light/70'}`}>
            {date.getDate()}
          </span>
          <span className={`ml-1 text-[10px] font-bold ${isToday ? 'text-mustard/80' : 'text-cream-light/30'}`}>
            {dayName}
          </span>
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
          isToday ? 'bg-mustard text-navy' : 'bg-cream-light/10 text-cream-light/50'
        }`}>
          {dayLabel}
        </span>
      </div>

      {allItems.length === 0 && (
        <div className="text-[9px] text-cream-light/25 italic py-2 text-center">
          {lang === 'zh' ? '无日程' : 'No events'}
        </div>
      )}

      {visibleItems.map((item, i) => {
        if (item.type === 'event') {
          const e = item.data;
          return (
            <div key={`e-${i}`} className={`text-[9px] px-2 py-1 rounded mb-1 font-bold leading-tight ${bgMap[e.category] || 'bg-cream-light/20'} ${e.category === 'school' ? 'text-cream-light/80' : 'text-cream-light'}`}>
              {catIcons[e.category] || '📌'} {(lang === 'zh' ? e.eventZh : e.event)?.slice(0, 30)}
            </div>
          );
        }
        const task = item.data;
        const done = isCheckedIn(checkins, task.id);
        return (
          <button key={`t-${i}`} onClick={() => !done && !isPast && onCheckIn?.(task)}
            className={`w-full text-left text-[9px] px-2 py-1 rounded mb-1 font-bold leading-tight border transition-all ${
              done
                ? 'bg-teal/40 border-teal/50 text-teal-light line-through'
                : isToday
                  ? 'bg-mustard/30 border-mustard/50 text-mustard hover:bg-mustard/50 cursor-pointer'
                  : isPast
                    ? 'bg-cream-light/5 border-cream-light/10 text-cream-light/25'
                    : 'bg-cream-light/10 border-cream-light/15 text-cream-light/50'
            }`}>
            {done ? '✅' : isToday ? '☐' : '○'}
            {' '}{task.childName?.[0]}: {task.title?.slice(0, 22)}
          </button>
        );
      })}
      {hiddenCount > 0 && !expanded && (
        <button onClick={() => setExpanded(true)} className="w-full text-[8px] text-mustard/80 font-bold text-center hover:text-mustard py-0.5">
          +{hiddenCount} {lang === 'zh' ? '更多' : 'more'}
        </button>
      )}
      {expanded && hiddenCount > 0 && (
        <button onClick={() => setExpanded(false)} className="w-full text-[8px] text-cream-light/40 font-bold text-center hover:text-cream-light/60 py-0.5">
          {lang === 'zh' ? '收起' : 'Less'}
        </button>
      )}
    </div>
  );
}

// ─── School Calendar — Compact 3-Day View (Dark Theme) ──────
function SchoolCalendar({ upcoming, lang, hasUploaded, allChildren, onCheckIn, mergedCal }) {
  const { checkins } = useTasks();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

  // Get week monday for task generation
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  // All events within the 3-day window
  const threeDayEvents = (mergedCal || []).filter(e => {
    const d = e.date;
    return d >= yesterday.toISOString().split('T')[0] && d <= tomorrow.toISOString().split('T')[0];
  });

  // Future events beyond tomorrow
  const futureEvents = upcoming.filter(e => new Date(e.date) > tomorrow);

  const summary = newsletterSummary;

  // Generate daily tasks from all children's goals
  const weekTasks = (allChildren || []).flatMap(child =>
    generateWeekTasks(child.goals || [], child.name, child.id, monday)
  );

  return (
    <div className="bg-navy rounded-2xl p-5 shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mustard rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-navy" />
          </div>
          <div>
            <h2 className="text-base font-bold text-cream-light font-[family-name:var(--font-display)]">
              {lang === 'zh' ? '校园日程' : 'School Calendar'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-mustard font-bold">{summary.week}</span>
              {hasUploaded && <span className="text-[8px] px-1.5 py-0.5 bg-teal/30 text-teal-light rounded-full font-semibold">{lang === 'zh' ? '✓ Newsletter' : '✓ Synced'}</span>}
            </div>
          </div>
        </div>
        <span className="text-[11px] text-cream-light/60 font-semibold">
          {today.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Highlights (compact) */}
      <div className="p-2.5 bg-navy-light/50 rounded-lg mb-3 border border-cream-light/10">
        <p className="text-[8px] text-mustard font-bold uppercase tracking-wider mb-1">{lang === 'zh' ? '本周要点' : 'Highlights'}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {(summary.highlights[lang] || summary.highlights.en).slice(0, 4).map((h, i) => (
            <span key={i} className="text-[9px] text-cream-light/80">• {h}</span>
          ))}
        </div>
      </div>

      {/* 3-Day Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3 flex-1">
        <ThreeDayCell date={yesterday} todayStr={todayStr} events={threeDayEvents} tasks={weekTasks}
          checkins={checkins} lang={lang} onCheckIn={onCheckIn} isToday={false} isPast={true} />
        <ThreeDayCell date={today} todayStr={todayStr} events={threeDayEvents} tasks={weekTasks}
          checkins={checkins} lang={lang} onCheckIn={onCheckIn} isToday={true} isPast={false} />
        <ThreeDayCell date={tomorrow} todayStr={todayStr} events={threeDayEvents} tasks={weekTasks}
          checkins={checkins} lang={lang} onCheckIn={onCheckIn} isToday={false} isPast={false} />
      </div>

      {/* Upcoming Events (compact) */}
      {futureEvents.filter(e => e.priority !== 'low').length > 0 && (
        <div>
          <p className="text-[8px] text-cream-light/40 font-bold uppercase tracking-wider mb-1.5">{lang === 'zh' ? '即将到来' : 'Coming Up'}</p>
          <div className="flex flex-wrap gap-1">
            {futureEvents.filter(e => e.priority !== 'low').slice(0, 5).map((e, i) => {
              const d = new Date(e.date);
              return (
                <div key={i} className="flex items-center gap-1 px-2 py-0.5 bg-cream-light/10 rounded-lg text-[8px]">
                  <span>{catIcons[e.category] || '📌'}</span>
                  <span className="font-bold text-mustard">{d.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="text-cream-light/60">{(lang === 'zh' ? e.eventZh : e.event)?.slice(0, 20)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Child Column ───────────────────────────────────────────
function ChildColumn({ child, lang }) {
  const m = getChildMetrics(child);
  if (!m) return null;
  const { latest, trend, avg, delta, strong, weak, bestEffort } = m;
  const plan = igcseActionPlans[child.id];
  const allGoals = child.goals || [];
  const achievedAll = allGoals.filter(g => g.status === 'achieved').length;
  const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const trendColor = delta > 0 ? 'text-teal' : delta < 0 ? 'text-coral' : 'text-brown-light';
  const trendBg = delta > 0 ? 'bg-teal' : delta < 0 ? 'bg-coral' : 'bg-brown-light';

  const insight = plan?.overview?.[lang] || plan?.overview?.en || '';
  const shortInsight = insight.length > 80 ? insight.slice(0, 80) + '…' : insight;

  const radarData = (() => {
    const dims = ['academic', 'effort', 'stability', 'independence'];
    const labels = lang === 'zh' ? ['学业', '投入', '稳定', '独立'] : ['Acad', 'Effort', 'Stable', 'Indep'];
    return dims.map((d, i) => ({
      dim: labels[i],
      value: +(latest.subjects.reduce((s, sub) => s + (sub.standardised?.[d] || 0), 0) / latest.subjects.length).toFixed(1),
    }));
  })();

  const sorted = [...allGoals].sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (b.priority === 'High' && a.priority !== 'High') return 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Name + Score */}
      <div className="retro-card p-4">
        <div className="flex items-center gap-3">
          <Avatar src={child.avatar} size="md" />
          <div className="flex-1">
            <h2 className="text-lg font-black text-navy font-[family-name:var(--font-display)]">{child.name}</h2>
            <p className="text-[10px] text-brown-light font-semibold">{child.yearGroup} · {child.stage} · {latest.term}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`${trendBg} text-cream-light rounded-lg px-3 py-1.5 text-center`}>
              <div className="text-xl font-black">{avg}</div>
              <div className="text-[7px] uppercase tracking-wider font-bold opacity-80">{lang === 'zh' ? '均分' : 'AVG'}</div>
            </div>
            <div className="text-center">
              <TrendIcon className={`w-4 h-4 ${trendColor} mx-auto`} />
              <span className={`text-sm font-black ${trendColor}`}>{delta > 0 ? '+' : ''}{delta}</span>
            </div>
          </div>
          <Link to={`/child/${child.id}`} className="text-teal hover:text-teal-dark"><ChevronRight className="w-5 h-5" /></Link>
        </div>
        <div className="mt-2 flex items-start gap-1.5">
          <Sparkles className="w-3 h-3 text-teal mt-0.5 shrink-0" />
          <p className="text-[9px] text-navy leading-relaxed">{shortInsight}</p>
        </div>
      </div>

      {/* Goal Pathway */}
      <div className="retro-card p-4 border-2 border-mustard/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flag className="w-4 h-4 text-mustard" />
            <h3 className="text-[12px] font-bold text-navy font-[family-name:var(--font-display)]">{lang === 'zh' ? '目标路径' : 'Goal Pathway'}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#F5E6D3" strokeWidth="3" />
                <circle cx="16" cy="16" r="13" fill="none" stroke="#2A9D8F" strokeWidth="3"
                  strokeDasharray={`${(achievedAll / Math.max(allGoals.length, 1)) * 81.7} 81.7`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-navy">{achievedAll}/{allGoals.length}</span>
            </div>
            <Link to="/actions" className="text-[9px] text-teal font-bold">{lang === 'zh' ? '管理→' : 'Manage→'}</Link>
          </div>
        </div>
        <div className="space-y-2">
          {sorted.map(g => {
            const pct = goalPct(g);
            const isHigh = g.priority === 'High';
            const barColor = g.status === 'achieved' ? 'bg-teal' : g.status === 'on-track' ? 'bg-teal/60' : 'bg-coral/70';
            const nodeColor = g.status === 'achieved' ? 'bg-teal' : g.status === 'on-track' ? 'bg-teal' : 'bg-coral';
            return (
              <div key={g.id} className={`p-2 rounded-lg ${isHigh ? 'bg-cream border border-cream-dark' : 'bg-cream-dark/10'}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${nodeColor}`}>
                    {g.status === 'achieved' ? <CheckCircle className="w-2.5 h-2.5 text-cream-light" /> :
                     g.status === 'on-track' ? <TrendingUp className="w-2.5 h-2.5 text-cream-light" /> :
                     <Clock className="w-2.5 h-2.5 text-cream-light" />}
                  </div>
                  <span className="text-[10px] text-navy font-semibold flex-1 truncate">{g.title}</span>
                  {isHigh && <span className="text-[6px] px-1 py-0 bg-coral text-cream-light rounded font-bold">HIGH</span>}
                  <span className={`text-[9px] font-black ${g.status === 'achieved' || g.status === 'on-track' ? 'text-teal' : 'text-coral'}`}>{pct}%</span>
                </div>
                <div className="relative h-2">
                  <div className="absolute inset-0 bg-cream-dark/40 rounded-full" />
                  <div className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-cream-light shadow ${nodeColor} transition-all duration-500`} style={{ left: `calc(${Math.min(pct, 95)}% - 6px)` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-0.5 text-[8px]">🏁</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-teal-light rounded-xl border border-teal">
          <div className="flex items-center gap-1 mb-1.5">
            <Star className="w-3 h-3 text-teal-dark" />
            <span className="text-[9px] font-bold text-teal-dark uppercase tracking-wider">{lang === 'zh' ? '优势' : 'Strengths'}</span>
          </div>
          {strong.length > 0 ? strong.map((s, i) => <p key={i} className="text-[9px] text-teal-dark font-semibold">⭐ {s.name}</p>) :
           bestEffort.length > 0 ? bestEffort.slice(0, 3).map((s, i) => <p key={i} className="text-[9px] text-teal-dark font-medium">💪 {s.name}</p>) :
           child.strengths?.map((s, i) => <p key={i} className="text-[9px] text-teal-dark font-semibold">⭐ {s.subject}</p>)}
        </div>
        <div className="p-3 bg-coral-light rounded-xl border border-coral">
          <div className="flex items-center gap-1 mb-1.5">
            <AlertTriangle className="w-3 h-3 text-coral" />
            <span className="text-[9px] font-bold text-coral uppercase tracking-wider">{lang === 'zh' ? '需提升' : 'Needs Work'}</span>
          </div>
          {weak.length > 0 ? weak.slice(0, 4).map((s, i) => <p key={i} className="text-[9px] text-navy font-semibold">⚠️ {s.name}</p>) :
           <p className="text-[9px] text-brown-light italic">{lang === 'zh' ? '全部达标' : 'All meeting'}</p>}
          {weak.length > 4 && <p className="text-[8px] text-coral">+{weak.length - 4} more</p>}
        </div>
      </div>

      {/* Radar + Trend */}
      <div className="grid grid-cols-2 gap-3">
        <div className="retro-card p-2">
          <p className="text-[8px] text-brown-light font-bold uppercase tracking-wider text-center mb-0.5">{lang === 'zh' ? '能力' : 'Capability'}</p>
          <ResponsiveContainer width="100%" height={100}>
            <RadarChart data={radarData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
              <PolarGrid stroke="#F5E6D3" />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 7, fill: '#5C4033' }} />
              <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#2A9D8F" fill="#2A9D8F" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="retro-card p-2">
          <p className="text-[8px] text-brown-light font-bold uppercase tracking-wider text-center mb-0.5">{lang === 'zh' ? '趋势' : 'Trend'}</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={trend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="term" tick={{ fontSize: 7, fill: '#8B6F5E' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 7, fill: '#8B6F5E' }} />
              <Line type="monotone" dataKey="academic" stroke="#2A9D8F" strokeWidth={2} dot={{ r: 2, fill: '#FFF9F0' }} />
              <Line type="monotone" dataKey="effort" stroke="#E9C46A" strokeWidth={1.5} dot={{ r: 1.5, fill: '#FFF9F0' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
