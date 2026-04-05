import { createContext, useContext, useReducer, useEffect } from 'react';

const TASK_KEY = 'familyDashboardTasks';

// ─── Helpers ───────────────────────────────────────────────
function shouldGoalRunOnDate(goal, dateStr) {
  // Check date range
  if (goal.startDate && dateStr < goal.startDate) return false;
  if (goal.endDate && dateStr > goal.endDate) return false;

  const d = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = d.getDay(); // 0=Sun .. 6=Sat

  // New structured fields
  if (goal.frequency) {
    if (goal.frequency === 'daily') return true;
    if (goal.frequency === 'weekdays') return dayOfWeek >= 1 && dayOfWeek <= 5;
    if (goal.frequency === 'weekly') {
      const days = goal.weekDays || [1, 2, 3, 4, 5];
      return days.includes(dayOfWeek);
    }
  }

  // Legacy fallback: parse timeBudget string for old goals without frequency field
  const budget = (goal.timeBudget || '').toLowerCase();
  const isDaily = budget.includes('daily') || budget.includes('每天') || budget.includes('min') || budget.includes('分钟');
  const isWeekly = budget.includes('week') || budget.includes('每周') || budget.includes('/week');

  if (isDaily) return dayOfWeek >= 1 && dayOfWeek <= 5; // weekdays
  if (isWeekly) return [1, 3, 5].includes(dayOfWeek); // Mon, Wed, Fri
  // Default: every other weekday
  return dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek % 2 === 1;
}

function makeTask(goal, childId, childName, dateStr) {
  return {
    id: `task-${childId}-${goal.id}-${dateStr}`,
    goalId: goal.id,
    childId,
    childName,
    title: goal.title,
    timeBudget: goal.timeBudget,
    priority: goal.priority,
    date: dateStr,
    type: goal.frequency || 'goal',
    completed: false,
    checkedInAt: null,
    proof: null,
  };
}

// ─── Generate daily tasks from goals ────────────────────────
export function generateDailyTasks(goals, childName, childId) {
  const todayStr = new Date().toISOString().split('T')[0];
  return goals
    .filter(g => g.status !== 'achieved' && shouldGoalRunOnDate(g, todayStr))
    .map(g => makeTask(g, childId, childName, todayStr));
}

// Generate tasks for a full week (for calendar display)
export function generateWeekTasks(goals, childName, childId, mondayDate) {
  const tasks = [];
  for (let offset = 0; offset < 7; offset++) {
    const d = new Date(mondayDate);
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split('T')[0];

    goals.forEach(goal => {
      if (goal.status === 'achieved') return;
      if (shouldGoalRunOnDate(goal, dateStr)) {
        tasks.push(makeTask(goal, childId, childName, dateStr));
      }
    });
  }
  return tasks;
}

// ─── Reducer ────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'CHECK_IN': {
      const { taskId, proof } = action.payload;
      const existing = state.checkins[taskId];
      if (existing) return state; // already checked in
      return {
        ...state,
        checkins: {
          ...state.checkins,
          [taskId]: {
            completedAt: new Date().toISOString(),
            proof: proof || null,
          },
        },
      };
    }
    default:
      return state;
  }
}

function loadState() {
  try {
    const stored = localStorage.getItem(TASK_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return { checkins: {} };
}

// ─── Context ────────────────────────────────────────────────
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    try { localStorage.setItem(TASK_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  return (
    <TaskContext.Provider value={{ checkins: state.checkins, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export function isCheckedIn(checkins, taskId) {
  return !!checkins[taskId];
}
