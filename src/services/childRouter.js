/**
 * Child Router — Safety Gateway (Web MVP)
 *
 * Handles: identity, intent parsing, permission check, risk classification,
 * child-safe queries, controlled writes, and response generation.
 */

import { getLatestReport, getOverallTrend } from '../data/index';
import { generateDailyTasks } from '../store/TaskStore';

// ─── Intent Detection ──────────────────────────────────────
const INTENT_PATTERNS = [
  { intent: 'today',  patterns: [/^today/i, /^今天/, /^任务/, /^tasks?/i] },
  { intent: 'goal',   patterns: [/^goal/i, /^目标/, /^进度/, /^progress/i] },
  { intent: 'status', patterns: [/^status/i, /^状态/, /^我的/, /^my\s/i] },
  { intent: 'update', patterns: [/^update\s/i, /^完成/, /^做完/, /^done\s/i, /^finished/i] },
  { intent: 'help',   patterns: [/^help/i, /^帮/, /^烦/, /^不想/, /^难/, /^累/, /^upset/i, /^tired/i, /^stressed/i] },
];

export function detectIntent(text) {
  const trimmed = text.trim();
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some(p => p.test(trimmed))) return intent;
  }
  return 'unknown';
}

// ─── Risk Classification ───────────────────────────────────
const L3_KEYWORDS = [
  /不想活/, /想死/, /自杀/, /离家出走/, /run\s*away/i, /kill\s*my/i,
  /don'?t\s*want\s*to\s*live/i, /end\s*(it|my\s*life)/i, /hurt\s*myself/i,
  /没有人在乎/, /nobody\s*cares/i, /hate\s*my\s*life/i,
];

const L2_KEYWORDS = [
  /骂我/, /打我/, /吵架/, /讨厌/, /不公平/, /没人听/,
  /scold/i, /hit\s*me/i, /fight/i, /hate/i, /unfair/i, /nobody\s*listen/i,
  /不想去/, /不想参加/, /don'?t\s*want\s*to\s*go/i,
];

export function classifyRisk(text) {
  if (L3_KEYWORDS.some(p => p.test(text))) return 'L3';
  if (L2_KEYWORDS.some(p => p.test(text))) return 'L2';
  return 'L1';
}

// ─── Response Generation ───────────────────────────────────

function handleToday(child, checkins) {
  const goals = child.goals || [];
  if (goals.length === 0) {
    return { text: '你目前还没有设定目标哦。可以让爸爸妈妈帮你在 Dashboard 里添加。', intent: 'today' };
  }

  const tasks = generateDailyTasks(goals, child.name, child.id);
  if (tasks.length === 0) {
    return { text: '今天没有待完成的任务，好好休息吧！🎉', intent: 'today' };
  }

  const lines = tasks.map((t, i) => {
    const done = checkins[t.id] ? '✅' : '⬜';
    return `${done} ${i + 1}. ${t.title}${t.timeBudget ? ` (${t.timeBudget})` : ''}`;
  });

  const remaining = tasks.filter(t => !checkins[t.id]).length;
  const header = remaining === 0
    ? '🎉 今天的任务全部完成了！太棒了！'
    : `📋 今天你还有 ${remaining} 项任务：`;

  return { text: `${header}\n${lines.join('\n')}`, intent: 'today' };
}

function handleGoal(child) {
  const goals = child.goals || [];
  if (goals.length === 0) {
    return { text: '你还没有本学期的目标。可以和爸爸妈妈一起制定哦。', intent: 'goal' };
  }

  const lines = goals.map(g => {
    const statusEmoji = g.status === 'achieved' ? '🏆' : g.status === 'on-track' ? '🟢' : '🔵';
    return `${statusEmoji} ${g.title} — ${g.status === 'achieved' ? '已达成' : g.status === 'on-track' ? '进行中' : '努力中'}`;
  });

  return { text: `🎯 你的目标：\n${lines.join('\n')}`, intent: 'goal' };
}

function handleStatus(child) {
  const trend = getOverallTrend(child);
  const latest = trend[trend.length - 1];
  const report = getLatestReport(child);

  if (!latest || !report) {
    return { text: '暂时没有足够的数据显示你的状态。', intent: 'status' };
  }

  const lines = [
    `📊 ${child.name} 的最新状态 (${report.term})：`,
    `• 学业水平：${latest.academic}/5`,
    `• 学习投入：${latest.effort}/5`,
    `• 成长稳定性：${latest.stability}/5`,
    `• 独立性：${latest.independence}/5`,
  ];

  // Add a simple encouragement
  const best = ['academic', 'effort', 'stability', 'independence']
    .reduce((a, b) => latest[a] >= latest[b] ? a : b);
  const labels = { academic: '学业', effort: '投入', stability: '稳定性', independence: '独立性' };
  lines.push(`\n💪 你的${labels[best]}表现最好，继续保持！`);

  return { text: lines.join('\n'), intent: 'status' };
}

function handleUpdate(text) {
  // Extract the update content (remove command prefix)
  const content = text.replace(/^(update|完成|做完|done|finished)\s*/i, '').trim();
  if (!content) {
    return { text: '请告诉我你完成了什么，比如："update 数学作业做完了"', intent: 'update' };
  }

  return {
    text: `✅ 收到！我帮你记下来了：\n"${content}"\n\n继续加油！💪`,
    intent: 'update',
    updateContent: content,
  };
}

function handleHelp(text) {
  const risk = classifyRisk(text);

  if (risk === 'L3') {
    return {
      text: '我听到你了。这件事很重要，你不是一个人。\n先深呼吸一下，我会提醒爸爸妈妈尽快关注。❤️',
      intent: 'help',
      risk: 'L3',
      alert: true,
    };
  }

  if (risk === 'L2') {
    return {
      text: '听起来你现在不太开心。你的感受很重要。\n先不用着急解决所有事情，做一件让自己开心的小事吧。',
      intent: 'help',
      risk: 'L2',
      alert: true,
    };
  }

  // L1 — general encouragement
  const responses = [
    '听起来你现在有点累。先休息 5 分钟，喝杯水，然后只做最小一步就好。',
    '没关系，不是每天都要完美。先把最简单的一件事做完，其他的慢慢来。',
    '你已经做得很棒了。先做一个最小的任务，完成后会感觉好很多的。💪',
    '深呼吸一下。今天只需要完成一件事就够了，你选哪个？',
  ];

  return {
    text: responses[Math.floor(Math.random() * responses.length)],
    intent: 'help',
    risk: 'L1',
  };
}

function handleUnknown() {
  return {
    text: '我还不太理解你说的。你可以试试这些命令：\n• today — 查看今天的任务\n• goal — 查看目标进度\n• status — 查看学习状态\n• update + 内容 — 记录完成情况\n• help — 请求帮助',
    intent: 'unknown',
  };
}

// ─── Main Router ───────────────────────────────────────────

export function processMessage(text, child, checkins = {}) {
  if (!text || !text.trim()) {
    return handleUnknown();
  }

  const risk = classifyRisk(text);

  // L3 always takes priority regardless of intent
  if (risk === 'L3') {
    return {
      text: '我听到你了。这件事很重要，你不是一个人。\n先深呼吸一下，我会提醒爸爸妈妈尽快关注。❤️',
      intent: 'help',
      risk: 'L3',
      alert: true,
    };
  }

  const intent = detectIntent(text);

  switch (intent) {
    case 'today':  return handleToday(child, checkins);
    case 'goal':   return handleGoal(child);
    case 'status': return handleStatus(child);
    case 'update': return handleUpdate(text);
    case 'help':   return handleHelp(text);
    default:       return handleUnknown();
  }
}
