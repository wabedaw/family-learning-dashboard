import { useState, useEffect, useCallback } from 'react';
import { BRIDGE_URL } from '../config';

const PLANS_CACHE_KEY = 'fdash_exercise_plans_cache';
const EX_STREAK_KEY = 'fdash_exercise_streak';
const RD_STREAK_KEY = 'fdash_reading_streak';

function getSGDateStr() {
  const sg = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
  const y = sg.getFullYear();
  const m = String(sg.getMonth() + 1).padStart(2, '0');
  const d = String(sg.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ── Local streak helpers ────────────────────────────────────────────────────

function loadStreak(key) {
  try {
    const s = localStorage.getItem(key);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return { current: 0, last_date: null, history: [] };
}

function saveStreak(key, streak) {
  try { localStorage.setItem(key, JSON.stringify(streak)); } catch (e) {}
}

function computeStreakFromHistory(history) {
  if (!history || history.length === 0) return 0;
  const sorted = [...new Set(history)].sort().reverse();
  const today = getSGDateStr();
  let streak = 0;
  let expected = today;
  for (const d of sorted) {
    if (d === expected) {
      streak++;
      const prev = new Date(expected + 'T00:00:00');
      prev.setDate(prev.getDate() - 1);
      expected = prev.toISOString().split('T')[0];
    } else if (d < expected) {
      break;
    }
  }
  return streak;
}

function mergeStreak(backendStreak, localStreakKey, activityDetectedToday) {
  const local = loadStreak(localStreakKey);
  const today = getSGDateStr();
  let history = local.history || [];

  if (activityDetectedToday && !history.includes(today)) {
    history = [...history, today];
    const cutoff = new Date(today + 'T00:00:00');
    cutoff.setDate(cutoff.getDate() - 90);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    history = history.filter(d => d >= cutoffStr);
  }

  const localCurrent = computeStreakFromHistory(history);
  const backendCurrent = backendStreak?.current || 0;
  const current = Math.max(localCurrent, backendCurrent);

  saveStreak(localStreakKey, { current, last_date: today, history });
  return { ...backendStreak, current };
}

// ── Exercise data ───────────────────────────────────────────────────────────

export function useExerciseData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const dateStr = getSGDateStr();
      const res = await fetch(`${BRIDGE_URL}/api/exercise/family?date=${dateStr}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const memberRings = json.memberRings || {};
      const activityToday = Object.values(memberRings).some(
        r => !r.restDay && (r.ring1_pct || 0) > 0
      );

      const mergedStreak = mergeStreak(json.streak, EX_STREAK_KEY, activityToday);
      setData({ ...json, streak: mergedStreak });
      setError(null);
    } catch (e) {
      console.warn('Exercise data fetch failed:', e);
      setError(e.message);
      const localStreak = loadStreak(EX_STREAK_KEY);
      setData(prev => prev
        ? { ...prev, streak: { current: localStreak.current } }
        : null
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    const id = setInterval(refresh, 60000);
    return () => clearInterval(id);
  }, [refresh]);

  return { data, loading, error, refresh };
}

// ── Reading data ────────────────────────────────────────────────────────────

export function useReadingData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const dateStr = getSGDateStr();
      const res = await fetch(`${BRIDGE_URL}/api/reading/family?date=${dateStr}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const memberReadings = json.memberReadings || {};
      const activityToday = Object.values(memberReadings).some(r => (r.minutes || 0) > 0);

      const mergedStreak = mergeStreak(json.streak, RD_STREAK_KEY, activityToday);
      setData({ ...json, streak: mergedStreak });
      setError(null);
    } catch (e) {
      console.warn('Reading data fetch failed:', e);
      setError(e.message);
      const localStreak = loadStreak(RD_STREAK_KEY);
      setData(prev => prev
        ? { ...prev, streak: { current: localStreak.current } }
        : null
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    const id = setInterval(refresh, 60000);
    return () => clearInterval(id);
  }, [refresh]);

  return { data, loading, error, refresh };
}

// ── Exercise plans — backend-first, localStorage as offline cache ───────────

function loadCachedPlans() {
  try {
    const s = localStorage.getItem(PLANS_CACHE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return null;
}

function cachePlans(plans) {
  try { localStorage.setItem(PLANS_CACHE_KEY, JSON.stringify(plans)); } catch (e) {}
}

export function useExercisePlans() {
  const [plans, setPlans] = useState(() => loadCachedPlans()); // init from cache instantly
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch plans from backend — backend is the source of truth
  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${BRIDGE_URL}/api/exercise/plans`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const backendPlans = json.plans || {};
      setPlans(backendPlans);
      cachePlans(backendPlans); // update cache with fresh backend data
    } catch (e) {
      console.warn('Exercise plans fetch failed, using cache:', e);
      // Keep showing cached plans if backend unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  /**
   * Save a single actor/day plan to the backend.
   * Returns true if successful.
   */
  const savePlanToBackend = useCallback(async (actorId, day, plan) => {
    const params = new URLSearchParams({
      actor_id: actorId,
      day: String(day),
      sport_type: plan.sport_type || 'Rest',
      target: String(plan.target_duration_min || 0),
      challenge: String(!!plan.has_challenge),
      challenge_min: String(plan.challenge_duration_min || 60),
    });
    const res = await fetch(`${BRIDGE_URL}/api/exercise/plan/set?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  }, []);

  /**
   * Save all plans for all actors to the backend.
   * Updates state and cache only after successful backend save.
   */
  const saveAllPlans = useCallback(async (localPlans) => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const ACTOR_ORDER = ['michael', 'lucas', 'fay', 'david'];
    const failed = [];

    for (const actorId of ACTOR_ORDER) {
      for (let d = 0; d < 7; d++) {
        const plan = localPlans[actorId]?.[d];
        if (!plan) continue;
        try {
          await savePlanToBackend(actorId, d, plan);
        } catch (e) {
          failed.push(`${actorId} day ${d}`);
          console.warn(`Failed to save plan ${actorId} day ${d}:`, e);
        }
      }
    }

    if (failed.length > 0) {
      setSaveError(`部分保存失败，请重试 (${failed.length} 项)`);
      setSaving(false);
      return false;
    }

    // All saved successfully — refresh from backend to get canonical data
    try {
      const res = await fetch(`${BRIDGE_URL}/api/exercise/plans`);
      if (res.ok) {
        const json = await res.json();
        const backendPlans = json.plans || {};
        setPlans(backendPlans);
        cachePlans(backendPlans);
      }
    } catch (e) {
      // Saved OK, just couldn't re-fetch — update state from local copy
      setPlans(buildPlansFromLocal(localPlans, plans));
      cachePlans(buildPlansFromLocal(localPlans, plans));
    }

    setSaveSuccess(true);
    setSaving(false);
    setTimeout(() => setSaveSuccess(false), 3000);
    return true;
  }, [savePlanToBackend, plans]);

  // Also expose single-plan save (used in ExercisePlanEditor for compatibility)
  const savePlan = useCallback(async (actorId, day, plan) => {
    // Optimistically update local state
    setPlans(prev => {
      const next = { ...(prev || {}) };
      if (!next[actorId]) next[actorId] = { name: actorId, plan: {} };
      next[actorId] = {
        ...next[actorId],
        plan: { ...(next[actorId].plan || {}), [String(day)]: plan },
      };
      cachePlans(next);
      return next;
    });
    // Save to backend
    await savePlanToBackend(actorId, day, plan);
  }, [savePlanToBackend]);

  return { plans, loading, saving, saveError, saveSuccess, refresh, savePlan, saveAllPlans };
}

/** Helper: merge local editor state into current plans shape */
function buildPlansFromLocal(localPlans, currentPlans) {
  const result = { ...(currentPlans || {}) };
  for (const [actorId, actorData] of Object.entries(localPlans)) {
    if (!result[actorId]) result[actorId] = { name: actorId, plan: {} };
    result[actorId] = {
      ...result[actorId],
      plan: { ...(result[actorId].plan || {}), ...actorData },
    };
  }
  return result;
}
