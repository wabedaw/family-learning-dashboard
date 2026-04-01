import { useMemo } from 'react';
import { useLang } from '../i18n';
import { zhTranslations as zhData } from '../data/translations';

/**
 * Returns a translated copy of a child object when lang=zh.
 * Reports, goals, warnings, and strengths get Chinese text overlaid.
 * Falls back to original English when no translation exists.
 */
export function useTranslatedChild(child) {
  const { lang } = useLang();

  return useMemo(() => {
    if (!child || lang !== 'zh' || !zhData) return child;

    const zh = zhData[child.id];
    if (!zh) return child;

    // Deep translate reports
    const translatedReports = child.reports.map(report => {
      const zhReport = zh.reports?.[report.id];
      if (!zhReport) return report;

      return {
        ...report,
        overallComment: zhReport.overallComment || report.overallComment,
        pupilReflection: zhReport.pupilReflection || report.pupilReflection,
        headOfCollegeComment: zhReport.headOfCollegeComment || report.headOfCollegeComment,
        nextSteps: zhReport.nextSteps || report.nextSteps,
        subjects: report.subjects.map(sub => {
          const zhSub = zhReport.subjects?.[sub.name];
          if (!zhSub) return sub;
          return {
            ...sub,
            comment: zhSub.comment || sub.comment,
            nextStep: zhSub.nextStep || sub.nextStep,
            commentInsight: sub.commentInsight ? {
              strengths: zhSub.commentInsight?.strengths || sub.commentInsight.strengths,
              concerns: zhSub.commentInsight?.concerns || sub.commentInsight.concerns,
              suggestions: zhSub.commentInsight?.suggestions || sub.commentInsight.suggestions,
              signals: zhSub.commentInsight?.signals || sub.commentInsight.signals,
              familyAction: zhSub.commentInsight?.familyAction || sub.commentInsight.familyAction,
            } : sub.commentInsight,
          };
        }),
      };
    });

    // Translate goals
    const translatedGoals = child.goals?.map(goal => {
      const zhGoal = zh.goals?.[goal.id];
      if (!zhGoal) return goal;
      return {
        ...goal,
        title: zhGoal.title || goal.title,
        reason: zhGoal.reason || goal.reason,
        observations: zhGoal.observations || goal.observations,
      };
    });

    // Translate warnings
    const translatedWarnings = child.warnings?.map((w, i) => {
      const zhW = zh.warnings?.[i];
      if (!zhW) return w;
      return { ...w, message: zhW.message || w.message };
    });

    // Translate strengths
    const translatedStrengths = child.strengths?.map((s, i) => {
      const zhS = zh.strengths?.[i];
      if (!zhS) return s;
      return {
        ...s,
        evidence: zhS.evidence || s.evidence,
        recommendation: zhS.recommendation || s.recommendation,
      };
    });

    return {
      ...child,
      reports: translatedReports,
      goals: translatedGoals,
      warnings: translatedWarnings,
      strengths: translatedStrengths,
    };
  }, [child, lang]);
}

/**
 * Returns translated children array.
 */
export function useTranslatedChildren(children) {
  const { lang } = useLang();

  return useMemo(() => {
    if (lang !== 'zh' || !zhData) return children;
    return children.map(child => {
      const zh = zhData[child.id];
      if (!zh) return child;

      // Only translate top-level display data for overview
      const latestReport = child.reports[child.reports.length - 1];
      const zhLatest = zh.reports?.[latestReport?.id];

      return {
        ...child,
        reports: child.reports.map(r => {
          const zhR = zh.reports?.[r.id];
          return zhR ? { ...r, overallComment: zhR.overallComment || r.overallComment } : r;
        }),
        warnings: child.warnings?.map((w, i) => {
          const zhW = zh.warnings?.[i];
          return zhW ? { ...w, message: zhW.message || w.message } : w;
        }),
        goals: child.goals?.map(g => {
          const zhG = zh.goals?.[g.id];
          return zhG ? { ...g, title: zhG.title || g.title } : g;
        }),
      };
    });
  }, [children, lang]);
}
