import { useState } from 'react';
import { RefreshCw, Mail, TrendingUp, Star, AlertTriangle, BarChart3 } from 'lucide-react';
import { useLang } from '../../i18n';
import { useData } from '../../store/DataContext';
import { generateWeeklySummary } from '../../services/insightService';

export default function WeeklySummaryTab({ child }) {
  const { lang } = useLang();
  const { dispatch } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const summary = child.weeklySummary;
  const lbl = (en, zh) => lang === 'zh' ? zh : en;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateWeeklySummary(child);
      if (result.summary) {
        dispatch({ type: 'SET_WEEKLY_SUMMARY', payload: { childId: child.id, summary: result.summary } });
      }
      if (result.guide) {
        dispatch({ type: 'SET_NEXT_WEEK_GUIDE', payload: { childId: child.id, guide: result.guide } });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy">{lbl('Weekly Summary', '本周总结')}</h3>
        <button onClick={handleGenerate} disabled={loading}
          className="retro-btn px-3 py-1.5 bg-teal text-cream-light border-teal text-[11px] flex items-center gap-1 disabled:opacity-50">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? lbl('Generating...', '生成中...') : summary ? lbl('Refresh', '刷新') : lbl('Generate Summary', '生成总结')}
        </button>
      </div>

      {error && <div className="text-coral text-[11px] p-2 bg-coral-light rounded-lg">{error}</div>}

      {!summary && !loading && (
        <div className="retro-card p-8 text-center text-brown-light">
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{lbl('Click "Generate Summary" to create this week\'s AI-powered summary. Best done on Sunday mornings.', '点击"生成总结"创建本周 AI 总结。建议每周日上午生成。')}</p>
        </div>
      )}

      {summary && (
        <>
          {/* Letter */}
          {summary.letter && (
            <div className="rounded-2xl p-6 border-2 border-mustard" style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-mustard" />
                <span className="font-bold text-[14px] text-brown">{lbl(`${child.name}'s Week`, `${child.name} 的一周`)}</span>
              </div>
              <div className="text-[13px] text-navy leading-relaxed whitespace-pre-line">{summary.letter}</div>
              {summary.generatedAt && (
                <div className="text-right text-[10px] text-brown-light mt-3">
                  {lbl('Generated', '生成于')} {new Date(summary.generatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          )}

          {/* Stats Row */}
          {summary.stats && (
            <div className="grid grid-cols-4 gap-3">
              <div className="retro-card p-3 text-center">
                <div className="text-2xl font-black text-navy">{summary.stats.weeklyRecords || 0}</div>
                <div className="text-[10px] text-brown-light">{lbl('Records', '周记录')}</div>
              </div>
              <div className="retro-card p-3 text-center">
                <div className="text-2xl font-black text-teal">{summary.stats.wins || 0}</div>
                <div className="text-[10px] text-brown-light flex items-center justify-center gap-0.5"><Star className="w-2.5 h-2.5" />{lbl('Wins', '成功')}</div>
              </div>
              <div className="retro-card p-3 text-center">
                <div className="text-2xl font-black text-coral">{summary.stats.stuckPoints || 0}</div>
                <div className="text-[10px] text-brown-light flex items-center justify-center gap-0.5"><AlertTriangle className="w-2.5 h-2.5" />{lbl('Stuck', '卡点')}</div>
              </div>
              <div className="retro-card p-3 text-center">
                <div className="text-lg font-black text-navy">{summary.stats.progressMetric || '—'}</div>
                <div className="text-[10px] text-brown-light flex items-center justify-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" />{lbl('Progress', '进步')}</div>
              </div>
            </div>
          )}

          {/* Subject Overview */}
          {summary.subjectOverview?.length > 0 && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-teal" /> {lbl('Subject Overview', '学科概览')}
              </h4>
              {summary.subjectOverview.map((s, i) => {
                const trendIcon = s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '→';
                const trendColor = s.trend === 'up' ? 'text-teal' : s.trend === 'down' ? 'text-coral' : 'text-brown-light';
                const pct = parseInt(s.score) || 0;
                return (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="font-semibold text-navy">{s.subject}</span>
                      <span className={`font-bold ${trendColor}`}>{s.score} {trendIcon}</span>
                    </div>
                    {pct > 0 && (
                      <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-teal" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    )}
                    {s.note && <p className="text-[10px] text-brown-light mt-1">{s.note}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {/* One-liner */}
          {summary.oneLiner && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-2">{lbl('In One Sentence', '一句话总结')}</h4>
              <p className="text-[14px] text-navy font-medium leading-relaxed">{summary.oneLiner}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
