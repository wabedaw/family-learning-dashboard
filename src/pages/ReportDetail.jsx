import { useState } from 'react';
import { getLatestReport } from '../data';
import { useData } from '../store/DataContext';
import CommentInsight from '../components/CommentInsight';
import { FileText, Calendar, ChevronDown, ChevronRight, ArrowLeft, BookOpen, ClipboardList, Newspaper, PenTool, MessageSquare, Star, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useTranslatedChild, useTranslatedChildren } from '../hooks/useTranslatedChild';
import Avatar from '../components/Avatar';

const TABS = [
  { id: 'reports', icon: FileText, labelEn: 'Reports', labelZh: '学期报告' },
  { id: 'exams', icon: ClipboardList, labelEn: 'Exams', labelZh: '考试测验' },
  { id: 'newsletters', icon: Newspaper, labelEn: 'Newsletters', labelZh: '校报通讯' },
  { id: 'homework', icon: BookOpen, labelEn: 'Homework', labelZh: '作业记录' },
  { id: 'parentNotes', icon: PenTool, labelEn: 'Notes', labelZh: '家长记录' },
  { id: 'reflections', icon: MessageSquare, labelEn: 'Reflections', labelZh: '孩子反思' },
];

export default function ReportDetail() {
  const { children } = useData();
  const tChildren = useTranslatedChildren(children);
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const [selectedReportIdx, setSelectedReportIdx] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [selectedTab, setSelectedTab] = useState('reports');
  const [expandedDoc, setExpandedDoc] = useState(null);
  const { t, lang } = useLang();

  const child = tChildren.find(c => c.id === selectedChild);
  const report = selectedReportIdx !== null ? child.reports[selectedReportIdx] : getLatestReport(child);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-brown-light hover:text-brown"><ArrowLeft className="w-5 h-5" /></Link>
        <FileText className="w-5 h-5 text-teal" />
        <div>
          <h1 className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">{t('report.title')}</h1>
          <p className="text-[11px] text-brown-light font-semibold">{t('report.subtitle')}</p>
        </div>
      </div>

      {/* Child Selector */}
      <div className="flex gap-2 mb-4">
        {tChildren.map(c => (
          <button key={c.id}
            onClick={() => { setSelectedChild(c.id); setSelectedReportIdx(null); setExpandedSubject(null); setExpandedDoc(null); }}
            className={`retro-btn px-4 py-2 text-sm flex items-center gap-1.5 ${selectedChild === c.id ? 'bg-teal text-cream-light border-teal' : 'bg-cream-light text-navy border-navy'}`}>
            <Avatar src={c.avatar} size="xs" /> {c.name}
          </button>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map(tab => {
          const count = tab.id === 'reports' ? child.reports.length : (child[tab.id] || []).length;
          const isActive = selectedTab === tab.id;
          return (
            <button key={tab.id} onClick={() => { setSelectedTab(tab.id); setExpandedDoc(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap ${isActive ? 'bg-teal text-cream-light shadow-md' : 'bg-cream-light text-brown-light border border-cream-dark hover:text-navy'}`}>
              <tab.icon className="w-3.5 h-3.5" />
              {lang === 'zh' ? tab.labelZh : tab.labelEn}
              {count > 0 && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-cream-light/30 text-cream-light' : 'bg-cream-dark text-brown-light'}`}>{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {selectedTab === 'reports' && <ReportsTab child={child} report={report} selectedReportIdx={selectedReportIdx} setSelectedReportIdx={setSelectedReportIdx} expandedSubject={expandedSubject} setExpandedSubject={setExpandedSubject} t={t} lang={lang} />}
      {selectedTab === 'exams' && <DocsTab docs={child.exams || []} lang={lang} expandedDoc={expandedDoc} setExpandedDoc={setExpandedDoc} type="exam" />}
      {selectedTab === 'newsletters' && <DocsTab docs={child.newsletters || []} lang={lang} expandedDoc={expandedDoc} setExpandedDoc={setExpandedDoc} type="newsletter" />}
      {selectedTab === 'homework' && <DocsTab docs={child.homework || []} lang={lang} expandedDoc={expandedDoc} setExpandedDoc={setExpandedDoc} type="homework" />}
      {selectedTab === 'parentNotes' && <DocsTab docs={child.parentNotes || []} lang={lang} expandedDoc={expandedDoc} setExpandedDoc={setExpandedDoc} type="parentNote" />}
      {selectedTab === 'reflections' && <DocsTab docs={child.reflections || []} lang={lang} expandedDoc={expandedDoc} setExpandedDoc={setExpandedDoc} type="reflection" />}
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────
function EmptyState({ lang }) {
  return (
    <div className="retro-card p-8 text-center">
      <FileText className="w-8 h-8 text-cream-dark mx-auto mb-2" />
      <p className="text-sm text-brown-light font-semibold">{lang === 'zh' ? '暂无数据' : 'No data yet'}</p>
      <p className="text-[11px] text-brown-light mt-1">
        <Link to="/upload" className="text-teal font-semibold hover:underline">{lang === 'zh' ? '去上传数据' : 'Upload data'}</Link>
      </p>
    </div>
  );
}

// ─── Reports Tab (existing) ─────────────────────────────────
function ReportsTab({ child, report, selectedReportIdx, setSelectedReportIdx, expandedSubject, setExpandedSubject, t, lang }) {
  if (!report) return <EmptyState lang={lang} />;
  return (
    <>
      <div className="flex gap-3 mb-6">
        <select value={selectedReportIdx !== null ? selectedReportIdx : child.reports.length - 1}
          onChange={e => { setSelectedReportIdx(Number(e.target.value)); setExpandedSubject(null); }}
          className="px-3 py-2 rounded-lg border-2 border-cream-dark text-sm bg-cream-light text-navy">
          {child.reports.map((r, i) => <option key={r.id} value={i}>{r.term} ({r.academicYear}) {r.source === 'upload' ? '📤' : ''}</option>)}
        </select>
      </div>

      <div className="retro-card p-5 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-navy font-[family-name:var(--font-display)]">{child.name} — {report.term}</h2>
            <p className="text-[11px] text-brown-light font-semibold">{report.academicYear} · {report.schoolSection} {report.source === 'upload' ? '· 📤 Uploaded' : ''}</p>
          </div>
          <div className="text-right">
            {report.reportDate && <div className="flex items-center gap-1 text-[11px] text-brown-light font-semibold"><Calendar className="w-3.5 h-3.5" />{report.reportDate}</div>}
            {report.attendance && <p className="text-[11px] text-brown-light font-semibold mt-1">Attendance: {report.attendance.present}% · Late: {report.attendance.late}</p>}
          </div>
        </div>

        {report.overallComment && (
          <div className="mb-4">
            <h3 className="text-[11px] font-semibold text-brown-light uppercase tracking-wider mb-1">{t('report.overallComment')}</h3>
            <p className="text-sm text-navy leading-relaxed">{report.overallComment}</p>
          </div>
        )}
        {report.pupilReflection && (
          <div className="bg-teal-light rounded-lg p-3 mb-3">
            <p className="text-[11px] text-navy font-semibold uppercase tracking-wider mb-1">{t('report.pupilReflection')}</p>
            <p className="text-[11px] text-navy">{report.pupilReflection}</p>
          </div>
        )}
        {report.nextSteps && (
          <div className="bg-teal-light rounded-lg p-3 mb-3">
            <p className="text-[11px] text-teal-dark font-semibold uppercase tracking-wider mb-1">{t('report.nextSteps')}</p>
            <p className="text-[11px] text-teal-dark">{report.nextSteps}</p>
          </div>
        )}
        {report.overallAnalysis && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
            {report.overallAnalysis.topStrengths?.length > 0 && <div className="p-3 bg-teal-light rounded-lg"><p className="text-[10px] text-teal-dark font-bold uppercase mb-1">Strengths</p>{report.overallAnalysis.topStrengths.map((s, i) => <p key={i} className="text-[11px] text-teal-dark">• {s}</p>)}</div>}
            {report.overallAnalysis.topConcerns?.length > 0 && <div className="p-3 bg-coral-light rounded-lg"><p className="text-[10px] text-coral font-bold uppercase mb-1">Concerns</p>{report.overallAnalysis.topConcerns.map((c, i) => <p key={i} className="text-[11px] text-coral">• {c}</p>)}</div>}
            {report.overallAnalysis.keyRecommendations?.length > 0 && <div className="p-3 bg-mustard-light rounded-lg"><p className="text-[10px] text-mustard font-bold uppercase mb-1">Recommendations</p>{report.overallAnalysis.keyRecommendations.map((r, i) => <p key={i} className="text-[11px] text-brown">• {r}</p>)}</div>}
          </div>
        )}
      </div>

      <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-3">{t('report.subjects')}</h2>
      <div className="space-y-3">
        {(report.subjects || []).map(subject => {
          const isExpanded = expandedSubject === subject.name;
          const level = subject.standardised?.academic || 3;
          return (
            <div key={subject.name} className="retro-card overflow-hidden">
              <button onClick={() => setExpandedSubject(isExpanded ? null : subject.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-cream transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${level >= 4 ? 'bg-teal' : level >= 3 ? 'bg-mustard' : 'bg-coral'}`} />
                  <div className="text-left">
                    <h3 className="font-bold text-navy font-[family-name:var(--font-display)] text-sm">{subject.name}</h3>
                    <p className="text-[11px] text-brown-light font-semibold">{subject.teacherName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-brown-light font-semibold">Attainment: <span className="font-bold text-navy">{subject.attainment}</span></span>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-brown-light" /> : <ChevronRight className="w-4 h-4 text-brown-light" />}
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-cream-dark p-4">
                  {subject.standardised && (
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Object.entries(subject.standardised).map(([key, val]) => (
                        <div key={key} className="text-center p-2 bg-teal-light rounded-lg">
                          <div className="text-lg font-bold text-teal-dark">{val}</div>
                          <div className="text-[10px] text-teal uppercase tracking-wider font-semibold capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {subject.comment && (
                    <div className="mb-4">
                      <h4 className="text-[11px] font-semibold text-brown-light uppercase tracking-wider mb-1">{t('report.teacherComment')}</h4>
                      <p className="text-sm text-navy leading-relaxed bg-cream rounded-lg p-3">{subject.comment}</p>
                    </div>
                  )}
                  {subject.commentInsight && <CommentInsight insight={subject.commentInsight} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Generic Document Tab ───────────────────────────────────
function DocsTab({ docs, lang, expandedDoc, setExpandedDoc, type }) {
  if (!docs.length) return <EmptyState lang={lang} />;

  const typeConfig = {
    exam: { icon: ClipboardList, color: 'text-teal', getTitle: d => `${d.subject || 'Exam'} — ${d.examType || 'Assessment'}`, getSubtitle: d => `${d.date || d.uploadDate || ''} ${d.score != null ? `· Score: ${d.score}${d.maxScore ? '/' + d.maxScore : ''}` : ''} ${d.percentage != null ? `(${d.percentage}%)` : ''}` },
    newsletter: { icon: Newspaper, color: 'text-mustard', getTitle: d => d.title || 'Newsletter', getSubtitle: d => d.date || d.uploadDate || '' },
    homework: { icon: BookOpen, color: 'text-coral', getTitle: d => d.assignmentName || d.subject || 'Homework', getSubtitle: d => `${d.subject ? d.subject + ' · ' : ''}${d.date || d.uploadDate || ''}` },
    parentNote: { icon: PenTool, color: 'text-wine', getTitle: d => d.observationType || (lang === 'zh' ? '观察记录' : 'Observation'), getSubtitle: d => `${d.date || d.uploadDate || ''} ${d.summary ? '· ' + d.summary.slice(0, 50) + '...' : ''}` },
    reflection: { icon: MessageSquare, color: 'text-navy', getTitle: () => lang === 'zh' ? '每周反思' : 'Weekly Reflection', getSubtitle: d => d.date || d.uploadDate || '' },
  };

  const cfg = typeConfig[type] || typeConfig.exam;
  const Icon = cfg.icon;

  return (
    <div className="space-y-3">
      {docs.map((doc, i) => {
        const isOpen = expandedDoc === i;
        return (
          <div key={doc.id || i} className="retro-card overflow-hidden">
            <button onClick={() => setExpandedDoc(isOpen ? null : i)} className="w-full flex items-center justify-between p-4 hover:bg-cream transition-colors text-left">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${cfg.color} shrink-0`} />
                <div>
                  <h3 className="font-bold text-navy text-sm font-[family-name:var(--font-display)]">{cfg.getTitle(doc)}</h3>
                  <p className="text-[11px] text-brown-light">{cfg.getSubtitle(doc)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.completionStatus && <span className={`retro-badge border-current ${doc.completionStatus === 'complete' ? 'bg-teal-light text-teal-dark' : 'bg-coral-light text-coral'}`}>{doc.completionStatus}</span>}
                {doc.selfAwarenessAssessment?.score && <span className="retro-badge bg-teal-light text-teal-dark border-teal">{lang === 'zh' ? '自我认知' : 'Awareness'}: {doc.selfAwarenessAssessment.score}/5</span>}
                {doc.actionRequired?.length > 0 && <span className="retro-badge bg-coral-light text-coral border-coral">{doc.actionRequired.length} {lang === 'zh' ? '待办' : 'actions'}</span>}
                {isOpen ? <ChevronDown className="w-4 h-4 text-brown-light" /> : <ChevronRight className="w-4 h-4 text-brown-light" />}
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-cream-dark p-4 space-y-3">
                <DocDetail doc={doc} type={type} lang={lang} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Document Detail Renderer ───────────────────────────────
function DocDetail({ doc, type, lang }) {
  return (
    <>
      {doc.summary && <p className="text-sm text-navy leading-relaxed">{doc.summary}</p>}

      {/* Exam: baseline comparison */}
      {doc.comparedToBaseline && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {doc.comparedToBaseline.improved?.length > 0 && <InfoBlock icon={TrendingUp} color="teal" label={lang === 'zh' ? '进步' : 'Improved'} items={doc.comparedToBaseline.improved} />}
          {doc.comparedToBaseline.declined?.length > 0 && <InfoBlock icon={TrendingDown} color="coral" label={lang === 'zh' ? '需提升' : 'Declined'} items={doc.comparedToBaseline.declined} />}
          {doc.comparedToBaseline.consistent?.length > 0 && <InfoBlock color="navy" label={lang === 'zh' ? '保持' : 'Consistent'} items={doc.comparedToBaseline.consistent} />}
        </div>
      )}

      {/* Newsletter: key dates */}
      {doc.keyDates?.length > 0 && (
        <div>
          <p className="text-[10px] text-brown-light font-bold uppercase tracking-wider mb-1"><Calendar className="w-3 h-3 inline mr-1" />{lang === 'zh' ? '关键日期' : 'Key Dates'}</p>
          <div className="space-y-1">{doc.keyDates.map((d, j) => (
            <div key={j} className={`flex items-center gap-2 p-2 rounded-lg ${d.relevance === 'high' ? 'bg-coral-light' : d.relevance === 'medium' ? 'bg-mustard-light' : 'bg-cream'}`}>
              <span className="text-[11px] font-bold text-navy">{d.date}</span>
              <span className="text-[11px] text-brown">{d.event}</span>
            </div>
          ))}</div>
        </div>
      )}

      {/* Newsletter: action required */}
      {doc.actionRequired?.length > 0 && <InfoBlock color="coral" label={lang === 'zh' ? '需要行动' : 'Action Required'} items={doc.actionRequired} />}

      {/* Homework: quality & feedback */}
      {doc.qualityAssessment && <p className="text-[11px] text-navy bg-cream rounded-lg p-2"><b>{lang === 'zh' ? '质量：' : 'Quality: '}</b>{doc.qualityAssessment}</p>}
      {doc.teacherFeedback && <p className="text-[11px] text-navy bg-teal-light rounded-lg p-2"><b>{lang === 'zh' ? '反馈：' : 'Feedback: '}</b>{doc.teacherFeedback}</p>}
      {doc.comparedToPattern && <p className="text-[11px] text-brown bg-mustard-light rounded-lg p-2"><b>{lang === 'zh' ? '模式：' : 'Pattern: '}</b>{doc.comparedToPattern}</p>}

      {/* Parent notes: alignment */}
      {doc.alignmentWithSchoolData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {doc.alignmentWithSchoolData.confirmed?.length > 0 && <InfoBlock color="teal" label={lang === 'zh' ? '与学校一致' : 'Confirmed'} items={doc.alignmentWithSchoolData.confirmed} />}
          {doc.alignmentWithSchoolData.newInsights?.length > 0 && <InfoBlock color="mustard" label={lang === 'zh' ? '新发现' : 'New Insights'} items={doc.alignmentWithSchoolData.newInsights} />}
          {doc.alignmentWithSchoolData.contradictions?.length > 0 && <InfoBlock color="coral" label={lang === 'zh' ? '差异' : 'Contradictions'} items={doc.alignmentWithSchoolData.contradictions} />}
        </div>
      )}

      {/* Reflections: wins/struggles/plans */}
      {(doc.wins || doc.struggles || doc.improvementPlans) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {doc.wins?.length > 0 && <InfoBlock icon={Star} color="teal" label={lang === 'zh' ? '成就' : 'Wins'} items={doc.wins} />}
          {doc.struggles?.length > 0 && <InfoBlock icon={AlertTriangle} color="coral" label={lang === 'zh' ? '困难' : 'Struggles'} items={doc.struggles} />}
          {doc.improvementPlans?.length > 0 && <InfoBlock icon={TrendingUp} color="mustard" label={lang === 'zh' ? '计划' : 'Plans'} items={doc.improvementPlans} />}
        </div>
      )}

      {/* Encouragement */}
      {doc.encouragement && <div className="p-3 bg-teal-light rounded-lg"><p className="text-[11px] text-teal-dark font-semibold">{doc.encouragement}</p></div>}

      {/* Practical suggestions (shared across types) */}
      {doc.practicalSuggestions?.length > 0 && (
        <div className="p-3 bg-teal-light rounded-lg">
          <p className="text-[10px] text-teal-dark font-bold uppercase tracking-wider mb-1">{lang === 'zh' ? '实用建议' : 'Practical Suggestions'}</p>
          {doc.practicalSuggestions.map((s, j) => (
            <p key={j} className="text-[11px] text-navy mb-0.5">• {typeof s === 'string' ? s : `${s.suggestion}${s.reason ? ` — ${s.reason}` : ''}`}</p>
          ))}
        </div>
      )}

      {/* Conversation starter */}
      {doc.parentConversationStarter && (
        <div className="p-2 bg-mustard-light rounded-lg">
          <p className="text-[10px] text-mustard font-bold uppercase mb-1">{lang === 'zh' ? '亲子对话' : 'Conversation Starter'}</p>
          <p className="text-[11px] text-brown italic">"{doc.parentConversationStarter}"</p>
        </div>
      )}

      {/* Generic lists */}
      <TagList label={lang === 'zh' ? '优势' : 'Strengths'} items={doc.strengths} color="teal" />
      <TagList label={lang === 'zh' ? '薄弱点' : 'Weaknesses'} items={doc.weaknesses} color="coral" />
      <TagList label={lang === 'zh' ? '建议' : 'Recommendations'} items={doc.recommendations} color="mustard" />
      <TagList label={lang === 'zh' ? '家长行动' : 'Parent Actions'} items={doc.parentActions} color="navy" />
      <TagList label={lang === 'zh' ? '与老师沟通' : 'Discuss with Teachers'} items={doc.schoolCommunication} color="mustard" />
      {doc.suggestions?.length > 0 && <TagList label={lang === 'zh' ? '建议' : 'Suggestions'} items={doc.suggestions} color="teal" />}
      <TagList label={lang === 'zh' ? '注意事项' : 'Attention'} items={doc.attentionItems?.map(a => typeof a === 'string' ? a : a.item)} color="coral" />
    </>
  );
}

// ─── Shared Components ──────────────────────────────────────
function InfoBlock({ icon: Icon, color, label, items }) {
  const colors = { teal: 'bg-teal-light text-teal-dark', coral: 'bg-coral-light text-coral', mustard: 'bg-mustard-light text-brown', navy: 'bg-cream-dark/40 text-navy' };
  const c = colors[color] || colors.teal;
  return (
    <div className={`p-2 rounded-lg ${c}`}>
      <p className={`text-[10px] font-bold uppercase mb-1`}>{Icon && <Icon className="w-3 h-3 inline mr-1" />}{label}</p>
      {items.map((s, j) => <p key={j} className="text-[11px]">• {s}</p>)}
    </div>
  );
}

function TagList({ label, items, color }) {
  if (!items?.length) return null;
  const colors = { teal: 'text-teal-dark bg-teal-light', coral: 'text-coral bg-coral-light', mustard: 'text-brown bg-mustard-light', navy: 'text-navy bg-cream-dark/40' };
  const c = colors[color] || colors.teal;
  return (
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${c.split(' ')[0]}`}>{label}</p>
      <div className="flex flex-wrap gap-1">
        {items.map((item, i) => <span key={i} className={`text-[11px] px-2 py-0.5 rounded ${c}`}>• {item}</span>)}
      </div>
    </div>
  );
}
