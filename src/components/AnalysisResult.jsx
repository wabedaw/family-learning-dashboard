import { CheckCircle, AlertTriangle, Lightbulb, TrendingUp, BookOpen, ChevronDown, ChevronRight, User, Calendar, School } from 'lucide-react';
import { useState } from 'react';

export default function AnalysisResult({ result, onDismiss }) {
  const [expandedSubject, setExpandedSubject] = useState(null);

  if (!result) return null;

  // Handle parse errors — show raw text
  if (result.parseError) {
    return (
      <div className="retro-card border-2 border-mustard p-5 mb-6">
        <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-2">Analysis Result</h3>
        <p className="text-[11px] text-brown-light mb-3">The analysis completed but couldn't be fully structured. Here's the raw output:</p>
        <pre className="text-[11px] text-navy bg-cream rounded-lg p-3 whitespace-pre-wrap max-h-96 overflow-y-auto">{result.rawAnalysis}</pre>
        <button onClick={onDismiss} className="retro-btn mt-3 px-4 py-2 bg-cream-light text-navy border-navy text-[12px]">Dismiss</button>
      </div>
    );
  }

  // For non-report document types (exam, teacher message, etc.)
  if (result.documentType && result.documentType !== 'report') {
    return <GenericResult result={result} onDismiss={onDismiss} />;
  }

  // Full report analysis
  const subjects = result.subjects || [];
  const analysis = result.overallAnalysis || {};

  return (
    <div className="retro-card border-2 border-teal p-5 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-navy font-[family-name:var(--font-display)]">
            <CheckCircle className="w-5 h-5 text-teal inline mr-2" />
            Report Analysis Complete
          </h3>
          <p className="text-[11px] text-brown-light mt-1">AI-powered structured extraction from school report</p>
        </div>
        <button onClick={onDismiss} className="text-brown-light hover:text-brown text-sm">✕</button>
      </div>

      {/* Report Meta */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {result.childName && (
          <div className="p-2.5 bg-teal-light rounded-lg flex items-center gap-2">
            <User className="w-4 h-4 text-teal-dark" />
            <div>
              <div className="text-[9px] text-teal-dark uppercase tracking-wider font-semibold">Student</div>
              <div className="text-[12px] font-bold text-navy">{result.childName}</div>
            </div>
          </div>
        )}
        {result.yearGroup && (
          <div className="p-2.5 bg-mustard-light rounded-lg flex items-center gap-2">
            <School className="w-4 h-4 text-mustard" />
            <div>
              <div className="text-[9px] text-mustard uppercase tracking-wider font-semibold">Year</div>
              <div className="text-[12px] font-bold text-navy">{result.yearGroup}</div>
            </div>
          </div>
        )}
        {result.term && (
          <div className="p-2.5 bg-cream-dark/40 rounded-lg flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brown-light" />
            <div>
              <div className="text-[9px] text-brown-light uppercase tracking-wider font-semibold">Term</div>
              <div className="text-[12px] font-bold text-navy">{result.term}</div>
            </div>
          </div>
        )}
        {result.academicYear && (
          <div className="p-2.5 bg-cream-dark/40 rounded-lg flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brown-light" />
            <div>
              <div className="text-[9px] text-brown-light uppercase tracking-wider font-semibold">Year</div>
              <div className="text-[12px] font-bold text-navy">{result.academicYear}</div>
            </div>
          </div>
        )}
      </div>

      {/* Overall Analysis */}
      {analysis.topStrengths?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
          <div className="p-3 bg-teal-light rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-dark" />
              <span className="text-[10px] text-teal-dark font-bold uppercase tracking-wider">Top Strengths</span>
            </div>
            {analysis.topStrengths.map((s, i) => (
              <p key={i} className="text-[11px] text-teal-dark">• {s}</p>
            ))}
          </div>
          <div className="p-3 bg-coral-light rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-coral" />
              <span className="text-[10px] text-coral font-bold uppercase tracking-wider">Top Concerns</span>
            </div>
            {(analysis.topConcerns || []).map((c, i) => (
              <p key={i} className="text-[11px] text-coral">• {c}</p>
            ))}
          </div>
          <div className="p-3 bg-mustard-light rounded-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-mustard" />
              <span className="text-[10px] text-mustard font-bold uppercase tracking-wider">Recommendations</span>
            </div>
            {(analysis.keyRecommendations || []).map((r, i) => (
              <p key={i} className="text-[11px] text-brown">• {r}</p>
            ))}
          </div>
        </div>
      )}

      {analysis.overallTrend && (
        <div className="p-3 bg-cream rounded-lg mb-4 flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] text-navy font-bold uppercase tracking-wider">Overall Trend</span>
            <p className="text-[11px] text-navy">{analysis.overallTrend}</p>
          </div>
        </div>
      )}

      {/* Overall Comment */}
      {result.overallComment && (
        <div className="mb-4">
          <h4 className="text-[10px] text-brown-light font-bold uppercase tracking-wider mb-1">Tutor Comment</h4>
          <p className="text-[11px] text-navy bg-cream rounded-lg p-3 leading-relaxed max-h-32 overflow-y-auto">{result.overallComment}</p>
        </div>
      )}

      {/* Pupil Reflection */}
      {result.pupilReflection && (
        <div className="mb-4 p-3 bg-teal-light rounded-lg">
          <h4 className="text-[10px] text-teal-dark font-bold uppercase tracking-wider mb-1">Pupil Reflection</h4>
          <p className="text-[11px] text-navy leading-relaxed">{result.pupilReflection}</p>
        </div>
      )}

      {/* Subjects */}
      {subjects.length > 0 && (
        <div>
          <h4 className="text-[10px] text-brown-light font-bold uppercase tracking-wider mb-2">
            Subjects Extracted ({subjects.length})
          </h4>
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {subjects.map((sub, i) => {
              const isExpanded = expandedSubject === i;
              return (
                <div key={i} className="bg-cream rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedSubject(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-cream-dark/30 transition-colors text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-navy">{sub.name}</span>
                      <span className="text-[10px] text-brown-light">— {sub.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="retro-badge bg-cream-dark text-navy border-cream-dark">{sub.attainment}</span>
                      {sub.effort && <span className="text-[10px] text-brown-light">Effort: {sub.effort}</span>}
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-brown-light" /> : <ChevronRight className="w-3.5 h-3.5 text-brown-light" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="p-2.5 border-t border-cream-dark">
                      {sub.comment && <p className="text-[11px] text-navy mb-2 leading-relaxed">{sub.comment}</p>}
                      {sub.commentInsight && (
                        <div className="flex flex-wrap gap-1">
                          {sub.commentInsight.strengths?.map((s, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 bg-teal-light text-teal-dark rounded border border-teal/20">+ {s}</span>
                          ))}
                          {sub.commentInsight.concerns?.map((c, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 bg-coral-light text-coral rounded border border-coral/20">! {c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function GenericResult({ result, onDismiss }) {
  const sentimentColors = {
    positive: 'bg-teal-light text-teal-dark border-teal',
    neutral: 'bg-cream-dark text-navy border-cream-dark',
    concerned: 'bg-coral-light text-coral border-coral',
  };
  const sc = sentimentColors[result.sentiment] || sentimentColors.neutral;

  return (
    <div className="retro-card border-2 border-teal p-5 mb-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)]">
          <CheckCircle className="w-4 h-4 text-teal inline mr-1.5" />
          Document Analysis
        </h3>
        <button onClick={onDismiss} className="text-brown-light hover:text-brown text-sm">✕</button>
      </div>

      <div className="flex gap-2 mb-3">
        {result.category && <span className="retro-badge bg-cream-dark text-navy border-cream-dark">{result.category}</span>}
        {result.sentiment && <span className={`retro-badge ${sc}`}>{result.sentiment}</span>}
        {result.subject && <span className="retro-badge bg-teal-light text-teal-dark border-teal">{result.subject}</span>}
      </div>

      {result.summary && (
        <p className="text-sm text-navy mb-3 leading-relaxed">{result.summary}</p>
      )}

      {result.keyPoints?.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[10px] text-brown-light font-bold uppercase tracking-wider mb-1">Key Points</h4>
          {result.keyPoints.map((p, i) => <p key={i} className="text-[11px] text-navy">• {p}</p>)}
        </div>
      )}

      {result.actionItems?.length > 0 && (
        <div className="p-3 bg-mustard-light rounded-lg">
          <h4 className="text-[10px] text-mustard font-bold uppercase tracking-wider mb-1">Action Items</h4>
          {result.actionItems.map((a, i) => <p key={i} className="text-[11px] text-brown">• {a}</p>)}
        </div>
      )}
    </div>
  );
}
