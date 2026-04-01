import { createContext, useContext, useReducer, useEffect } from 'react';

const TASK_KEY = 'familyDashboardTasks';

// ─── Generate daily tasks from goals ────────────────────────
export function generateDailyTasks(goals, childName, childId) {
  const today = new Date();
  const tasks = [];

  goals.forEach(goal => {
    if (goal.status === 'achieved') return;

    // Parse timeBudget to determine frequency
    const budget = (goal.timeBudget || '').toLowerCase();
    const isDaily = budget.includes('daily') || budget.includes('每天') || budget.includes('min') || budget.includes('分钟');
    const isWeekly = budget.includes('week') || budget.includes('每周') || budget.includes('/week');

    if (isDaily) {
      // Generate task for today
      tasks.push({
        id: `task-${childId}-${goal.id}-${today.toISOString().split('T')[0]}`,
        goalId: goal.id,
        childId,
        childName,
        title: goal.title,
        timeBudget: goal.timeBudget,
        priority: goal.priority,
        date: today.toISOString().split('T')[0],
        type: 'daily',
        completed: false,
        checkedInAt: null,
        proof: null,
      });
    } else if (isWeekly) {
      // Generate tasks for specific days this week (Mon, Wed, Fri)
      const dayOfWeek = today.getDay();
      const targetDays = [1, 3, 5]; // Mon, Wed, Fri
      if (targetDays.includes(dayOfWeek)) {
        tasks.push({
          id: `task-${childId}-${goal.id}-${today.toISOString().split('T')[0]}`,
          goalId: goal.id,
          childId,
          childName,
          title: goal.title,
          timeBudget: goal.timeBudget,
          priority: goal.priority,
          date: today.toISOString().split('T')[0],
          type: 'weekly',
          completed: false,
          checkedInAt: null,
          proof: null,
        });
      }
    } else {
      // Default: show every other day
      const dayNum = Math.floor(today.getTime() / 86400000);
      if (dayNum % 2 === 0) {
        tasks.push({
          id: `task-${childId}-${goal.id}-${today.toISOString().split('T')[0]}`,
          goalId: goal.id,
          childId,
          childName,
          title: goal.title,
          timeBudget: goal.timeBudget,
          priority: goal.priority,
          date: today.toISOString().split('T')[0],
          type: 'goal',
          completed: false,
          checkedInAt: null,
          proof: null,
        });
      }
    }
  });

  return tasks;
}

// Generate tasks for a full week (for calendar display)
export function generateWeekTasks(goals, childName, childId, mondayDate) {
  const tasks = [];
  for (let offset = 0; offset < 7; offset++) {
    const d = new Date(mondayDate);
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    goals.forEach(goal => {
      if (goal.status === 'achieved') return;
      const budget = (goal.timeBudget || '').toLowerCase();
      const isDaily = budget.includes('daily') || budget.includes('每天') || budget.includes('min') || budget.includes('分钟');
      const isWeekly = budget.includes('week') || budget.includes('每周') || budget.includes('/week');

      let shouldAdd = false;
      if (isDaily && isWeekday) shouldAdd = true;
      else if (isWeekly && [1, 3, 5].includes(dayOfWeek)) shouldAdd = true;
      else if (!isDaily && !isWeekly && isWeekday && dayOfWeek % 2 === 1) shouldAdd = true;

      if (shouldAdd) {
        tasks.push({
          id: `task-${childId}-${goal.id}-${dateStr}`,
          goalId: goal.id,
          childId,
          childName,
          title: goal.title,
          timeBudget: goal.timeBudget,
          priority: goal.priority,
          date: dateStr,
          type: isDaily ? 'daily' : isWeekly ? 'weekly' : 'goal',
          completed: false,
          checkedInAt: null,
          proof: null,
        });
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
