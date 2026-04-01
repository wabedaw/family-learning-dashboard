import { michael } from './michael';
import { lucas } from './lucas';

export const children = [michael, lucas];

export function getChild(id) {
  return children.find(c => c.id === id);
}

export function getLatestReport(child) {
  return child.reports[child.reports.length - 1];
}

export function getAllSubjectsFlat(child) {
  return child.reports.flatMap((r, ri) =>
    r.subjects.map(s => ({ ...s, term: r.term, termIndex: ri, reportId: r.id }))
  );
}

export function getSubjectTrend(child, subjectName) {
  return child.reports.map(r => {
    const s = r.subjects.find(sub => sub.name === subjectName);
    return s ? { term: r.term, ...s.standardised, attainment: s.attainment, effort: s.effort } : null;
  }).filter(Boolean);
}

export function getOverallTrend(child) {
  return child.reports.map(r => {
    const avg = field => {
      const vals = r.subjects.map(s => s.standardised[field]).filter(Boolean);
      return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : 0;
    };
    return {
      term: r.term,
      academic: avg('academic'),
      progress: avg('progress'),
      effort: avg('effort'),
      stability: avg('stability'),
      independence: avg('independence')
    };
  });
}

export { michael, lucas };
