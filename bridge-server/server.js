import express from 'express';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3847;
const app = express();

// ─── Data Loading ──────────────────────────────────────────
const DATA_DIR = join(__dirname, '..', 'family-learning-dashboard', 'src', 'data');
const STATE_FILE = join(__dirname, 'state.json');

function loadChild(id) {
  const file = join(DATA_DIR, `${id}-data.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8'));
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { checkins: {}, updates: [], alerts: [], goals: { michael: [], lucas: [] } };
  }
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Task Generation (mirrors TaskStore.jsx) ───────────────
function generateDailyTasks(goals, childId) {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const dayOfWeek = today.getDay();
  const dayNum = Math.floor(today.getTime() / 86400000);
  const tasks = [];

  goals.forEach(goal => {
    if (goal.status === 'achieved') return;
    const budget = (goal.timeBudget || '').toLowerCase();
    const isDaily = budget.includes('daily') || budget.includes('每天') || budget.includes('min') || budget.includes('分钟');
    const isWeekly = budget.includes('week') || budget.includes('每周') || budget.includes('/week');

    let shouldAdd = false;
    if (isDaily) shouldAdd = true;
    else if (isWeekly && [1, 3, 5].includes(dayOfWeek)) shouldAdd = true;
    else if (!isDaily && !isWeekly && dayNum % 2 === 0) shouldAdd = true;

    if (shouldAdd) {
      tasks.push({
        id: `task-${childId}-${goal.id}-${dateStr}`,
        goalId: goal.id,
        childId,
        title: goal.title,
        timeBudget: goal.timeBudget,
        priority: goal.priority,
        date: dateStr,
        type: isDaily ? 'daily' : isWeekly ? 'weekly' : 'goal',
      });
    }
  });
  return tasks;
}

// ─── Helper: get latest report ─────────────────────────────
function getLatestReport(child) {
  if (!child?.reports?.length) return null;
  return child.reports[child.reports.length - 1];
}

// ─── Helper: compute status summary ────────────────────────
function getStatusSummary(child) {
  const report = getLatestReport(child);
  if (!report) return { term: 'N/A', subjects: [] };

  const subjects = report.subjects.map(s => ({
    name: s.name,
    attainment: s.attainment,
    effort: s.effort || s.classwork || 'N/A',
    academic: s.standardised?.academic || 3,
    effortScore: s.standardised?.effort || 3,
  }));

  const avgAcademic = subjects.reduce((sum, s) => sum + s.academic, 0) / subjects.length;
  const avgEffort = subjects.reduce((sum, s) => sum + s.effortScore, 0) / subjects.length;

  return {
    childId: child.id,
    name: child.name,
    yearGroup: child.yearGroup,
    term: report.term,
    reportDate: report.reportDate,
    averageAcademic: Math.round(avgAcademic * 10) / 10,
    averageEffort: Math.round(avgEffort * 10) / 10,
    subjectCount: subjects.length,
    subjects,
    overallComment: report.overallComment || '',
    focusSubjects: child.focusSubjects,
  };
}

// ─── API Routes ────────────────────────────────────────────

// List children
app.get('/api/children', (req, res) => {
  const michael = loadChild('michael');
  const lucas = loadChild('lucas');
  res.json({
    children: [
      michael ? { id: 'michael', name: 'Michael', yearGroup: michael.yearGroup } : null,
      lucas ? { id: 'lucas', name: 'Lucas', yearGroup: lucas.yearGroup } : null,
    ].filter(Boolean),
  });
});

// Child full data
app.get('/api/child/:id', (req, res) => {
  const child = loadChild(req.params.id);
  if (!child) return res.status(404).json({ error: 'Child not found' });
  res.json(child);
});

// Today's tasks
app.get('/api/tasks/:childId/today', (req, res) => {
  const { childId } = req.params;
  const child = loadChild(childId);
  if (!child) return res.status(404).json({ error: 'Child not found' });

  const state = loadState();
  const goals = state.goals[childId] || [];
  const tasks = generateDailyTasks(goals, childId);

  // Merge check-in state
  const enriched = tasks.map((t, idx) => ({
    ...t,
    index: idx + 1,
    completed: !!state.checkins[t.id],
    completedAt: state.checkins[t.id]?.completedAt || null,
    proof: state.checkins[t.id]?.proof || null,
  }));

  const done = enriched.filter(t => t.completed).length;
  const total = enriched.length;

  res.json({
    childId,
    name: child.name,
    date: new Date().toISOString().split('T')[0],
    tasks: enriched,
    summary: { total, done, remaining: total - done },
  });
});

// Goals
app.get('/api/goals/:childId', (req, res) => {
  const { childId } = req.params;
  const child = loadChild(childId);
  if (!child) return res.status(404).json({ error: 'Child not found' });

  const state = loadState();
  const goals = state.goals[childId] || [];

  res.json({
    childId,
    name: child.name,
    goals,
    count: goals.length,
  });
});

// Status (latest report summary)
app.get('/api/status/:childId', (req, res) => {
  const { childId } = req.params;
  const child = loadChild(childId);
  if (!child) return res.status(404).json({ error: 'Child not found' });
  res.json(getStatusSummary(child));
});

// Check-in (mark task done) — GET for web_fetch compatibility
app.get('/api/checkin', (req, res) => {
  const { childId, taskId, proof } = req.query;
  if (!childId || !taskId) return res.status(400).json({ error: 'childId and taskId required' });

  const state = loadState();
  if (state.checkins[taskId]) {
    return res.json({ status: 'already_done', taskId, message: 'Task already completed' });
  }

  state.checkins[taskId] = {
    completedAt: new Date().toISOString(),
    proof: proof || null,
  };
  saveState(state);

  res.json({ status: 'ok', taskId, message: 'Task marked as completed' });
});

// Check-in by task index (easier for WhatsApp: "done 1")
app.get('/api/checkin-by-index', (req, res) => {
  const { childId, index, proof } = req.query;
  if (!childId || !index) return res.status(400).json({ error: 'childId and index required' });

  const state = loadState();
  const goals = state.goals[childId] || [];
  const tasks = generateDailyTasks(goals, childId);
  const idx = parseInt(index, 10) - 1;

  if (idx < 0 || idx >= tasks.length) {
    return res.json({ status: 'error', message: `Invalid task number. You have ${tasks.length} tasks today.` });
  }

  const task = tasks[idx];
  if (state.checkins[task.id]) {
    return res.json({ status: 'already_done', taskId: task.id, title: task.title, message: 'Task already completed' });
  }

  state.checkins[task.id] = {
    completedAt: new Date().toISOString(),
    proof: proof || null,
  };
  saveState(state);

  res.json({ status: 'ok', taskId: task.id, title: task.title, message: `"${task.title}" marked as completed!` });
});

// Record update from child
app.get('/api/update', (req, res) => {
  const { childId, content } = req.query;
  if (!childId || !content) return res.status(400).json({ error: 'childId and content required' });

  const state = loadState();
  state.updates.push({
    childId,
    content: decodeURIComponent(content),
    timestamp: new Date().toISOString(),
  });
  saveState(state);

  res.json({ status: 'ok', message: 'Update recorded' });
});

// Combined summary for parent
app.get('/api/summary', (req, res) => {
  const michael = loadChild('michael');
  const lucas = loadChild('lucas');
  const state = loadState();

  const result = {};
  for (const childId of ['michael', 'lucas']) {
    const child = childId === 'michael' ? michael : lucas;
    if (!child) continue;

    const goals = state.goals[childId] || [];
    const tasks = generateDailyTasks(goals, childId);
    const done = tasks.filter(t => !!state.checkins[t.id]).length;

    result[childId] = {
      name: child.name,
      yearGroup: child.yearGroup,
      tasksTotal: tasks.length,
      tasksDone: done,
      goalsCount: goals.length,
      latestTerm: getLatestReport(child)?.term || 'N/A',
      recentUpdates: state.updates
        .filter(u => u.childId === childId)
        .slice(-3),
    };
  }

  res.json({ date: new Date().toISOString().split('T')[0], children: result });
});

// Alerts (L2/L3 risk events)
app.get('/api/alerts', (req, res) => {
  const state = loadState();
  res.json({
    alerts: state.alerts.slice(-20),
    count: state.alerts.length,
  });
});

// Record alert (from agent when detecting L2/L3)
app.get('/api/alert', (req, res) => {
  const { childId, level, message } = req.query;
  if (!childId || !level) return res.status(400).json({ error: 'childId and level required' });

  const state = loadState();
  state.alerts.push({
    childId,
    level,
    message: decodeURIComponent(message || ''),
    timestamp: new Date().toISOString(),
  });
  saveState(state);

  res.json({ status: 'ok', message: 'Alert recorded' });
});

// Add goal (parent action)
app.get('/api/goal/add', (req, res) => {
  const { childId, title, timeBudget, priority } = req.query;
  if (!childId || !title) return res.status(400).json({ error: 'childId and title required' });

  const state = loadState();
  if (!state.goals[childId]) state.goals[childId] = [];

  const goal = {
    id: `goal-${childId}-${Date.now()}`,
    title: decodeURIComponent(title),
    timeBudget: decodeURIComponent(timeBudget || 'daily 30min'),
    priority: priority || 'medium',
    status: 'on-track',
    createdAt: new Date().toISOString(),
  };

  state.goals[childId].push(goal);
  saveState(state);

  res.json({ status: 'ok', goal, message: `Goal "${goal.title}" added for ${childId}` });
});

// Update goal status
app.get('/api/goal/update', (req, res) => {
  const { childId, goalId, status } = req.query;
  if (!childId || !goalId || !status) return res.status(400).json({ error: 'childId, goalId, status required' });

  const state = loadState();
  const goals = state.goals[childId] || [];
  const goal = goals.find(g => g.id === goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  goal.status = status;
  saveState(state);

  res.json({ status: 'ok', goal, message: `Goal "${goal.title}" updated to ${status}` });
});

// Delete goal
app.get('/api/goal/delete', (req, res) => {
  const { childId, goalId } = req.query;
  if (!childId || !goalId) return res.status(400).json({ error: 'childId and goalId required' });

  const state = loadState();
  const goals = state.goals[childId] || [];
  const idx = goals.findIndex(g => g.id === goalId);
  if (idx === -1) return res.status(404).json({ error: 'Goal not found' });

  const removed = goals.splice(idx, 1)[0];
  saveState(state);

  res.json({ status: 'ok', message: `Goal "${removed.title}" deleted` });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// ─── Start ─────────────────────────────────────────────────
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🌉 Family Dashboard Bridge Server running at http://127.0.0.1:${PORT}`);
  console.log(`   Data: ${DATA_DIR}`);
  console.log(`   State: ${STATE_FILE}`);
});
