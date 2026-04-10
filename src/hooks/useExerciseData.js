import { useState, useEffect, useCallback } from 'react';
import { BRIDGE_URL } from '../config';

function getSGDateStr() {
  const sg = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
  const y = sg.getFullYear();
  const m = String(sg.getMonth() + 1).padStart(2, '0');
  const d = String(sg.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

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
      setData(json);
      setError(null);
    } catch (e) {
      console.warn('Exercise data fetch failed:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Auto-refresh every 60s
  useEffect(() => {
    const id = setInterval(refresh, 60000);
    return () => clearInterval(id);
  }, [refresh]);

  return { data, loading, error, refresh };
}

// ---------------------------------------------------------------------------
// Reading data — fixed 60-min daily goal per person
// ---------------------------------------------------------------------------
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
      setData(json);
      setError(null);
    } catch (e) {
      console.warn('Reading data fetch failed:', e);
      setError(e.message);
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

export function useExercisePlans() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${BRIDGE_URL}/api/exercise/plans`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setPlans(json.plans);
    } catch (e) {
      console.warn('Exercise plans fetch failed:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const savePlan = useCallback(async (actorId, day, plan) => {
    const params = new URLSearchParams({
      actor_id: actorId,
      day: String(day),
      sport_type: plan.sport_type || 'Rest',
      target: String(plan.target_duration_min || 0),
      challenge: String(!!plan.has_challenge),
      challenge_min: String(plan.challenge_duration_min || 60),
    });
    await fetch(`${BRIDGE_URL}/api/exercise/plan/set?${params}`);
    await refresh();
  }, [refresh]);

  return { plans, loading, refresh, savePlan };
}
