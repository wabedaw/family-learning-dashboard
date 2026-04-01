import { useParams, Link } from 'react-router-dom';
import { getLatestReport, getOverallTrend } from '../data';
import { useData } from '../store/DataContext';
import StatusCard from '../components/StatusCard';
import SubjectCard from '../components/SubjectCard';
import Avatar from '../components/Avatar';
import { OverallTrendChart, SubjectTrendChart, CapabilityRadar } from '../components/TrendChart';
import { CommentSummary } from '../components/CommentInsight';
import GoalCard from '../components/GoalCard';
import { StabilityOverview } from '../components/StabilityBadge';
import { WarningsAndStrengths } from '../components/WarningCard';
import { BookOpen, Award, TrendingUp, Activity, GraduationCap, Calendar, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../i18n';
import { useTranslatedChild, useTranslatedChildren } from '../hooks/useTranslatedChild';

export default function ChildDashboard() {
  const { childId } = useParams();
  const { children } = useData();
  const child = children.find(c => c.id === childId);
  const tChild = useTranslatedChild(child);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { t } = useLang();

  if (!child) {
    return (
      <div className="p-6">
        <p className="text-brown-light">Child not found</p>
        <Link to="/" className="text-teal text-sm mt-2 inline-block">← Back</Link>
      </div>
    );
  }

  const latest = getLatestReport(tChild);
  const prev = tChild.reports.length > 1 ? tChild.reports[tChild.reports.length - 2] : null;
  const overallTrend = getOverallTrend(tChild);

  const allSubjectNames = [...new Set(tChild.reports.flatMap(r => r.subjects.map(s => s.name)))];
  const subjectTrendData = tChild.reports.map(r => {
    const row = { term: r.term };
    r.subjects.forEach(s => { row[s.name] = s.standardised?.academic || 0; });
    return row;
  });

  const capabilityData = latest ? (() => {
    const dims = ['academic', 'progress', 'effort', 'stability', 'independence'];
    return dims.map(d => ({
      dimension: d.charAt(0).toUpperCase() + d.slice(1),
      value: +(latest.subjects.reduce((sum, s) => sum + (s.standardised?.[d] || 0), 0) / latest.subjects.length).toFixed(1)
    }));
  })() : [];

  const avgAcademic = latest ? (latest.subjects.reduce((sum, s) => sum + (s.standardised?.academic || 0), 0) / latest.subjects.length).toFixed(1) : 0;
  const avgEffort = latest ? (latest.subjects.reduce((sum, s) => sum + (s.standardised?.effort || 0), 0) / latest.subjects.length).toFixed(1) : 0;
  const avgStability = latest ? (latest.subjects.reduce((sum, s) => sum + (s.standardised?.stability || 0), 0) / latest.subjects.length).toFixed(1) : 0;
  const avgIndependence = latest ? (latest.subjects.reduce((sum, s) => sum + (s.standardised?.independence || 0), 0) / latest.subjects.length).toFixed(1) : 0;

  const behaviorLabels = {
    organisation: t('behavior.organisation'),
    homeworkPunctuality: t('behavior.homeworkPunctuality'),
    independence: t('behavior.independence'),
    classParticipation: t('behavior.classParticipation'),
    selfAwareness: t('behavior.selfAwareness'),
    speakingConfidence: t('behavior.speakingConfidence'),
    writingSelfCheck: t('behavior.writingSelfCheck'),
    perseverance: t('behavior.perseverance'),
    feedbackResponse: t('behavior.feedbackResponse'),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-brown-light hover:text-brown"><ArrowLeft className="w-5 h-5" /></Link>
        <Avatar src={tChild.avatar} size="lg" />
        <div>
          <h1 className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">{tChild.name}{t('dashboard.title')}</h1>
          <p className="text-[11px] text-brown-light font-semibold">{tChild.yearGroup} · {tChild.stage} · {tChild.school}</p>
        </div>
        {latest && (
          <div className="ml-auto text-right">
            <p className="text-[11px] text-brown-light uppercase tracking-wider font-semibold">{t('dashboard.latestReport')}</p>
            <p className="text-[11px] text-brown">{latest.term} ({latest.academicYear})</p>
          </div>
        )}
      </div>

      {/* Module 1: Academic Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard title={t('dashboard.academicLevel')} subtitle={t('dashboard.academicLevel.sub')} value={avgAcademic + '/5'}
          trend={overallTrend.length >= 2 && overallTrend[overallTrend.length - 1].academic > overallTrend[overallTrend.length - 2].academic ? 'improving' : overallTrend.length >= 2 && overallTrend[overallTrend.length - 1].academic < overallTrend[overallTrend.length - 2].academic ? 'declining' : 'stable'}
          icon={GraduationCap} color="teal" />
        <StatusCard title={t('dashboard.effort')} subtitle={t('dashboard.effort.sub')} value={avgEffort + '/5'} trend="stable" icon={Activity} color="coral" />
        <StatusCard title={t('dashboard.stability')} subtitle={t('dashboard.stability.sub')} value={avgStability + '/5'} trend="improving" icon={TrendingUp} color="navy" />
        <StatusCard title={t('dashboard.independence')} subtitle={t('dashboard.independence.sub')} value={avgIndependence + '/5'} trend="improving" icon={Award} color="mustard" />
      </div>

      {/* Module 2: Subject Status */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('dashboard.subjectStatus')}</h2>
        <p className="text-[11px] text-brown-light uppercase tracking-wider font-semibold mb-3">{t('dashboard.subjectStatus.sub')}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {latest?.subjects.map(subject => {
            const prevSubject = prev?.subjects.find(s => s.name === subject.name);
            return (
              <SubjectCard key={subject.name} subject={subject} prevSubject={prevSubject}
                onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)} />
            );
          })}
        </div>
      </div>

      {/* Selected Subject Detail */}
      {selectedSubject && (() => {
        const subject = latest?.subjects.find(s => s.name === selectedSubject);
        if (!subject) return null;
        return (
          <div className="mb-6 retro-card p-5 border-teal">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-navy font-[family-name:var(--font-display)]">{subject.name}</h3>
                <p className="text-[11px] text-brown-light font-semibold">{subject.teacherName} · {latest.term}</p>
              </div>
              <button onClick={() => setSelectedSubject(null)} className="text-brown-light hover:text-brown text-sm">✕</button>
            </div>
            <p className="text-sm text-navy mb-4 leading-relaxed">{subject.comment}</p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              {Object.entries(subject.standardised || {}).map(([key, val]) => (
                <div key={key} className="text-center p-2 bg-cream rounded-lg">
                  <div className="text-lg font-bold text-navy">{val}</div>
                  <div className="text-[10px] text-brown-light uppercase tracking-wider font-semibold capitalize">{key}</div>
                </div>
              ))}
            </div>
            {subject.commentInsight && (
              <div>
                <h4 className="text-[11px] font-semibold text-navy uppercase tracking-wider mb-2">{t('dashboard.commentAnalysis')}</h4>
                <div className="space-y-2">
                  {subject.commentInsight.strengths?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {subject.commentInsight.strengths.map((s, i) => (
                        <span key={i} className="retro-badge bg-teal-light text-teal-dark">✓ {s}</span>
                      ))}
                    </div>
                  )}
                  {subject.commentInsight.concerns?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {subject.commentInsight.concerns.map((c, i) => (
                        <span key={i} className="retro-badge bg-mustard-light text-mustard">△ {c}</span>
                      ))}
                    </div>
                  )}
                  {subject.commentInsight.familyAction && (
                    <div className="p-2 bg-teal-light rounded-lg">
                      <span className="text-[11px] text-teal-dark font-semibold">🏠 {subject.commentInsight.familyAction}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Module 3: Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OverallTrendChart data={overallTrend} />
        <SubjectTrendChart data={subjectTrendData} subjects={allSubjectNames.slice(0, 5)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CapabilityRadar data={capabilityData} name={tChild.name} />
        {tChild.behaviorIndicators && (
          <StabilityOverview indicators={tChild.behaviorIndicators} labels={behaviorLabels} />
        )}
      </div>

      <div className="mb-6"><CommentSummary reports={tChild.reports} /></div>

      <div className="mb-6"><WarningsAndStrengths warnings={tChild.warnings} strengths={tChild.strengths} /></div>

      {tChild.goals && tChild.goals.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{t('dashboard.currentGoals')}</h2>
          <p className="text-[11px] text-brown-light uppercase tracking-wider font-semibold mb-3">{latest?.term} {t('dashboard.currentGoals.sub')}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {tChild.goals.map(g => <GoalCard key={g.id} goal={g} />)}
          </div>
        </div>
      )}

      {latest && (
        <div className="retro-card p-5">
          <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-2">{t('dashboard.overallComment')}</h3>
          <p className="text-sm text-navy leading-relaxed mb-3">{latest.overallComment}</p>
          {latest.pupilReflection && (
            <div className="bg-teal-light rounded-lg p-3">
              <p className="text-[11px] text-navy font-semibold uppercase tracking-wider mb-1">{t('dashboard.pupilReflection')}</p>
              <p className="text-[11px] text-navy">{latest.pupilReflection}</p>
            </div>
          )}
          {latest.nextSteps && (
            <div className="bg-teal-light rounded-lg p-3 mt-2">
              <p className="text-[11px] text-teal-dark font-semibold uppercase tracking-wider mb-1">{t('dashboard.nextSteps')}</p>
              <p className="text-[11px] text-teal-dark">{latest.nextSteps}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
