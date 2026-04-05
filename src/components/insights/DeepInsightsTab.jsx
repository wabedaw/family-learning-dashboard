import { useState } from 'react';
import { RefreshCw, AlertTriangle, Lightbulb, Star, MessageCircle, Loader2 } from 'lucide-react';
import { useLang } from '../../i18n';
import { useData } from '../../store/DataContext';
import { generateDeepInsights, generateCommunicationTip } from '../../services/insightService';

const Q_COLORS = {
  forced:    { bg: '#FEF3C7', text: '#92400E', label: 'Forced/Helpless',       labelZh: '被逼无奈' },
  cantdo:    { bg: '#DBEAFE', text: '#1E40AF', label: "Genuinely Can't",       labelZh: '真不会做' },
  emotional: { bg: '#FEE2E2', text: '#991B1B', label: 'Emotional Resistance',  labelZh: '情绪反抗' },
  support:   { bg: '#E0E7FF', text: '#4338CA', label: 'Insufficient Support',  labelZh: '支持不足' },
};

export default function DeepInsightsTab({ child }) {
  const { lang } = useLang();
  const { dispatch } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commTips, setCommTips] = useState({}); // { stuckPointId: { loading, data, error } }
  const profile = child.childProfile || {};
  const lbl = (en, zh) => lang === 'zh' ? zh : en;

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateDeepInsights(child);
      dispatch({
        type: 'UPDATE_CHILD_PROFILE',
        payload: {
          childId: child.id,
          profile: {
            stuckPoints: result.stuckPoints || [],
            quadrantAnalysis: result.quadrantAnalysis || null,
            fourLayers: result.fourLayers || null,
            coreInsights: result.coreInsights || [],
            weeklyWins: (result.weeklyWins || []).map(w => ({ ...w, week: new Date().toISOString().split('T')[0] })),
          },
        },
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommTip = async (sp) => {
    setCommTips(prev => ({ ...prev, [sp.id]: { loading: true } }));
    try {
      const data = await generateCommunicationTip(child, sp);
      setCommTips(prev => ({ ...prev, [sp.id]: { loading: false, data } }));
    } catch (e) {
      setCommTips(prev => ({ ...prev, [sp.id]: { loading: false, error: e.message } }));
    }
  };

  const stuckPoints = profile.stuckPoints || [];
  const quadrant = profile.quadrantAnalysis || null;
  const fourLayers = profile.fourLayers || null;
  const coreInsights = profile.coreInsights || [];
  const weeklyWins = profile.weeklyWins || [];
  const hasData = stuckPoints.length > 0 || coreInsights.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy">{lbl('Deep Insights', '深度洞察')}</h3>
        <button onClick={handleRefresh} disabled={loading}
          className="retro-btn px-3 py-1.5 bg-teal text-cream-light border-teal text-[11px] flex items-center gap-1 disabled:opacity-50">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? lbl('Analyzing...', '分析中...') : hasData ? lbl('Refresh', '刷新') : lbl('Generate Insights', '生成洞察')}
        </button>
      </div>

      {error && <div className="text-coral text-[11px] p-2 bg-coral-light rounded-lg">{error}</div>}

      {!hasData && !loading && (
        <div className="retro-card p-8 text-center text-brown-light">
          <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{lbl('Click "Generate Insights" to create AI-powered analysis.', '点击"生成洞察"创建 AI 深度分析。')}</p>
        </div>
      )}

      {hasData && (
        <>
          {/* Stuck Points */}
          {stuckPoints.length > 0 && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">
                {lbl(`Current Stuck Points (${stuckPoints.length})`, `当前卡点 (${stuckPoints.length}个)`)}
              </h4>
              <div className="space-y-3">
                {stuckPoints.map(sp => {
                  const tip = commTips[sp.id];
                  return (
                    <div key={sp.id} className="p-3 bg-coral-light rounded-lg border-l-4 border-coral">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1 font-bold text-coral text-[12px] mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> {sp.label}
                          </div>
                          <p className="text-[12px] text-navy leading-relaxed">{sp.description}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleCommTip(sp); }}
                          disabled={tip?.loading}
                          className="retro-btn px-2 py-1 bg-cream-light text-navy border-navy text-[9px] flex items-center gap-1 shrink-0 ml-2 disabled:opacity-50">
                          {tip?.loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageCircle className="w-3 h-3" />}
                          {lbl('Comm Tip', '沟通建议')}
                        </button>
                      </div>
                      {/* Communication Tip inline */}
                      {tip?.data && (
                        <div className="mt-3 p-3 bg-cream-light rounded-lg border border-cream-dark text-[11px] space-y-2">
                          <div className="font-bold text-teal">{lbl('Communication Suggestion', '沟通建议')}</div>
                          {tip.data.scenario && <p><strong>{lbl('Scenario:', '场景:')}</strong> {tip.data.scenario}</p>}
                          {tip.data.approach && <p><strong>{lbl('Approach:', '方法:')}</strong> {tip.data.approach}</p>}
                          {tip.data.examplePhrases?.length > 0 && (
                            <div>
                              <strong>{lbl('Example phrases:', '示例话术:')}</strong>
                              <ul className="list-disc list-inside mt-1">{tip.data.examplePhrases.map((p, i) => <li key={i}>"{p}"</li>)}</ul>
                            </div>
                          )}
                          {tip.data.whatToAvoid?.length > 0 && (
                            <div>
                              <strong>{lbl('Avoid:', '避免:')}</strong>
                              <ul className="list-disc list-inside mt-1">{tip.data.whatToAvoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
                            </div>
                          )}
                          {tip.data.eriksonContext && <p className="text-brown-light italic">{tip.data.eriksonContext}</p>}
                        </div>
                      )}
                      {tip?.error && <p className="mt-2 text-coral text-[10px]">{tip.error}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Four-Quadrant Analysis */}
          {quadrant && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">{lbl('Problem Quadrant Analysis', '四象限问题分析')}</h4>
              <div className="grid grid-cols-2 gap-1 max-w-sm mx-auto">
                {Object.entries(Q_COLORS).map(([key, cfg]) => {
                  const q = quadrant[key] || {};
                  return (
                    <div key={key} className="p-3 rounded-lg text-center" style={{ background: cfg.bg }}>
                      <div className="text-[11px] font-bold" style={{ color: cfg.text }}>{lang === 'zh' ? cfg.labelZh : cfg.label}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: cfg.text }}>{q.percentage || 0}%</div>
                      <div className="text-[9px] mt-1" style={{ color: cfg.text + '99' }}>{q.description?.slice(0, 40)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Four Learning Layers */}
          {fourLayers && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">{lbl('Learning Four Layers', '学习四层面')}</h4>
              {['cognitive', 'motivation', 'strategy', 'emotional'].map(key => {
                const layer = fourLayers[key] || {};
                const labels = {
                  cognitive:  { en: 'Can Learn (Cognitive)',    zh: '能学 (认知)' },
                  motivation: { en: 'Want to Learn (Motivation)', zh: '愿学 (动力)' },
                  strategy:   { en: 'Know How (Strategy)',      zh: '会学 (策略)' },
                  emotional:  { en: 'Emotional Layer',          zh: '情感层' },
                };
                const colors = { cognitive: '#6366F1', motivation: '#F59E0B', strategy: '#22C55E', emotional: '#EC4899' };
                return (
                  <div key={key} className="mb-3">
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="font-semibold text-navy">{lang === 'zh' ? labels[key].zh : labels[key].en}</span>
                      <span className="font-bold text-navy">{layer.score || 0}/10</span>
                    </div>
                    <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(layer.score || 0) * 10}%`, background: colors[key] }} />
                    </div>
                    {layer.description && <p className="text-[10px] text-brown-light mt-1">{layer.description}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Core Insights */}
          {coreInsights.length > 0 && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">{lbl(`Core Insights (${coreInsights.length})`, `核心洞察 (${coreInsights.length}项)`)}</h4>
              <div className="space-y-2">
                {coreInsights.map((ci, idx) => (
                  <div key={ci.id || idx} className="p-3 bg-teal-light rounded-lg border-l-4 border-teal">
                    <div className="font-bold text-[12px] text-teal mb-1">
                      <Lightbulb className="w-3 h-3 inline mr-1" />{idx + 1}. {ci.title}
                    </div>
                    <p className="text-[11px] text-navy leading-relaxed">{ci.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Wins */}
          {weeklyWins.length > 0 && (
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">{lbl(`Wins (${weeklyWins.length})`, `小成功 (${weeklyWins.length}个)`)}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {weeklyWins.map((w, i) => (
                  <div key={w.id || i} className="p-2.5 bg-mustard-light rounded-lg text-[11px] text-navy leading-relaxed">
                    <Star className="w-3 h-3 text-mustard inline mr-1" />{w.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
