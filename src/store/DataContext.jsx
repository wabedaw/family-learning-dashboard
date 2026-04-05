import { createContext, useContext, useReducer, useEffect } from 'react';
import { michael } from '../data/michael';
import { lucas } from '../data/lucas';

// ─── Constants ──────────────────────────────────────────────
const STORAGE_KEY = 'familyDashboardUploads';

const DOC_TYPES = {
  report: 'reports',
  exam: 'exams',
  newsletter: 'newsletters',
  homework: 'homework',
  parentNote: 'parentNotes',
  reflection: 'reflections',
  whatsapp: 'whatsappEvents',
};

const ACTION_MAP = {
  report: 'ADD_REPORT',
  exam: 'ADD_EXAM',
  newsletter: 'ADD_NEWSLETTER',
  homework: 'ADD_HOMEWORK',
  parentNote: 'ADD_PARENT_NOTE',
  reflection: 'ADD_REFLECTION',
  whatsapp: 'ADD_WHATSAPP',
};

const EMPTY_PROFILE = {
  dimensions: { cognitive: 0, motivation: 0, strategy: 0, eq: 0, quality: 0 },
  stuckPoints: [],
  insights: [],
  weeklyWins: [],
  timeline: [],
  lastUpdated: null,
};

// ─── Attainment → Standardised Score ────────────────────────
const attainmentScores = {
  'Excelling': 5, 'Above': 4, 'Meeting': 3, 'Below': 2,
  'Advanced': 5, 'Secure': 3, 'Developing': 2, 'Concern': 1,
  'A*': 5, 'A': 5, 'A-': 4, 'B+': 4, 'B': 3, 'B-': 3, 'C+': 2, 'C': 2,
};

function computeStandardised(subject) {
  if (subject.standardised) return subject.standardised;
  const academic = attainmentScores[subject.attainment] || 3;
  const invertGrade = (v) => v ? ({ 1: 5, 2: 4, 3: 3, 4: 2 }[v] || 3) : 3;
  return {
    academic,
    effort: typeof subject.effort === 'number' ? invertGrade(subject.effort) : 3,
    stability: typeof subject.classwork === 'number' ? invertGrade(subject.classwork) : 3,
    independence: typeof subject.organisation === 'number' ? invertGrade(subject.organisation) : 3,
    progress: 3,
  };
}

// ─── Build initial state ────────────────────────────────────
function buildInitialState() {
  const addEmptyArrays = (child) => ({
    ...child,
    exams: child.exams || [],
    newsletters: child.newsletters || [],
    homework: child.homework || [],
    parentNotes: child.parentNotes || [],
    reflections: child.reflections || [],
    whatsappEvents: child.whatsappEvents || [],
    childProfile: child.childProfile || { ...EMPTY_PROFILE },
    weeklySummary: child.weeklySummary || null,
    nextWeekGuide: child.nextWeekGuide || null,
  });

  const base = [addEmptyArrays({ ...michael }), addEmptyArrays({ ...lucas })];

  // Load uploaded data from localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const uploads = JSON.parse(stored); // { childId: { reports: [], exams: [], ... } }
      base.forEach(child => {
        const childUploads = uploads[child.id];
        if (!childUploads) return;
        Object.entries(DOC_TYPES).forEach(([, arrayKey]) => {
          const uploaded = childUploads[arrayKey] || [];
          const existingIds = new Set((child[arrayKey] || []).map(d => d.id));
          uploaded.forEach(doc => {
            if (!existingIds.has(doc.id)) {
              child[arrayKey] = [...(child[arrayKey] || []), doc];
            }
          });
        });
        // Restore saved goals (overrides static defaults if present)
        if (childUploads._goals) {
          child.goals = childUploads._goals;
        }
        // Restore Phase 3 data
        if (childUploads._childProfile) child.childProfile = childUploads._childProfile;
        if (childUploads._weeklySummary) child.weeklySummary = childUploads._weeklySummary;
        if (childUploads._nextWeekGuide) child.nextWeekGuide = childUploads._nextWeekGuide;
      });
    }
  } catch (e) {
    console.warn('Failed to load uploads from localStorage:', e);
  }

  return { children: base };
}

// ─── Persist uploaded items + goal changes to localStorage ──
function persistUploads(state) {
  try {
    const uploads = {};
    state.children.forEach(child => {
      const childUploads = {};
      Object.entries(DOC_TYPES).forEach(([, arrayKey]) => {
        const uploaded = (child[arrayKey] || []).filter(d => d.source === 'upload');
        if (uploaded.length > 0) childUploads[arrayKey] = uploaded;
      });
      // Also persist current goals (to capture edits/deletes/status changes)
      childUploads._goals = child.goals || [];
      // Persist Phase 3 insight data
      if (child.childProfile?.lastUpdated) childUploads._childProfile = child.childProfile;
      if (child.weeklySummary) childUploads._weeklySummary = child.weeklySummary;
      if (child.nextWeekGuide) childUploads._nextWeekGuide = child.nextWeekGuide;
      uploads[child.id] = childUploads;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
  } catch (e) {
    console.warn('Failed to persist uploads:', e);
  }
}

// ─── Reducer ────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_REPORT': {
      const { childId, data } = action.payload;
      // Normalize term report: ensure subjects have standardised scores
      const normalized = {
        ...data,
        id: data.id || `upload-${Date.now()}`,
        source: 'upload',
        termIndex: undefined, // will be computed
        subjects: (data.subjects || []).map(s => ({
          ...s,
          standardised: computeStandardised(s),
        })),
      };
      return {
        ...state,
        children: state.children.map(c => {
          if (c.id !== childId) return c;
          normalized.termIndex = c.reports.length;
          return { ...c, reports: [...c.reports, normalized] };
        }),
      };
    }

    case 'ADD_EXAM':
    case 'ADD_NEWSLETTER':
    case 'ADD_HOMEWORK':
    case 'ADD_PARENT_NOTE':
    case 'ADD_REFLECTION':
    case 'ADD_WHATSAPP': {
      const { childId, data } = action.payload;
      const arrayKey = {
        ADD_EXAM: 'exams',
        ADD_NEWSLETTER: 'newsletters',
        ADD_HOMEWORK: 'homework',
        ADD_PARENT_NOTE: 'parentNotes',
        ADD_REFLECTION: 'reflections',
        ADD_WHATSAPP: 'whatsappEvents',
      }[action.type];
      const doc = { ...data, id: data.id || `upload-${Date.now()}`, source: 'upload' };
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId ? { ...c, [arrayKey]: [...(c[arrayKey] || []), doc] } : c
        ),
      };
    }

    case 'DELETE_DOCUMENT': {
      const { childId, docType, docId } = action.payload;
      const arrayKey = DOC_TYPES[docType];
      if (!arrayKey) return state;
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId
            ? { ...c, [arrayKey]: (c[arrayKey] || []).filter(d => d.id !== docId) }
            : c
        ),
      };
    }

    // ─── Goal CRUD ──────────────────────────────────────────
    case 'SAVE_GOAL': {
      const { childId, goal } = action.payload;
      return {
        ...state,
        children: state.children.map(c => {
          if (c.id !== childId) return c;
          const goals = [...(c.goals || [])];
          const idx = goals.findIndex(g => g.id === goal.id);
          if (idx >= 0) goals[idx] = goal;
          else goals.push(goal);
          return { ...c, goals };
        }),
      };
    }

    case 'DELETE_GOAL': {
      const { childId, goalId } = action.payload;
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId
            ? { ...c, goals: (c.goals || []).filter(g => g.id !== goalId) }
            : c
        ),
      };
    }

    // ─── Phase 3: Insight System ──────────────────────────────
    case 'UPDATE_CHILD_PROFILE': {
      const { childId, profile } = action.payload;
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId
            ? { ...c, childProfile: { ...(c.childProfile || EMPTY_PROFILE), ...profile, lastUpdated: new Date().toISOString() } }
            : c
        ),
      };
    }

    case 'ADD_TIMELINE_ENTRIES': {
      const { childId, entries } = action.payload;
      return {
        ...state,
        children: state.children.map(c => {
          if (c.id !== childId) return c;
          const existing = c.childProfile?.timeline || [];
          const existingIds = new Set(existing.map(e => e.id));
          const newEntries = entries.filter(e => !existingIds.has(e.id));
          return {
            ...c,
            childProfile: {
              ...(c.childProfile || EMPTY_PROFILE),
              timeline: [...existing, ...newEntries],
            },
          };
        }),
      };
    }

    case 'SET_WEEKLY_SUMMARY': {
      const { childId, summary } = action.payload;
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId ? { ...c, weeklySummary: { ...summary, generatedAt: new Date().toISOString() } } : c
        ),
      };
    }

    case 'SET_NEXT_WEEK_GUIDE': {
      const { childId, guide } = action.payload;
      return {
        ...state,
        children: state.children.map(c =>
          c.id === childId ? { ...c, nextWeekGuide: { ...guide, generatedAt: new Date().toISOString() } } : c
        ),
      };
    }

    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────
const DataContext = createContext(null);

export function DataProvider({ children: childrenProp }) {
  const [state, dispatch] = useReducer(reducer, null, buildInitialState);

  // Persist on every state change
  useEffect(() => {
    persistUploads(state);
  }, [state]);

  return (
    <DataContext.Provider value={{ children: state.children, dispatch }}>
      {childrenProp}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export function useChild(childId) {
  const { children } = useData();
  return children.find(c => c.id === childId) || null;
}

// Re-export action type map for convenience
export { ACTION_MAP, DOC_TYPES };
