import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { RefreshCw, Brain, Heart, Lightbulb, Sparkles, BookOpen } from 'lucide-react';
import { useLang } from '../../i18n';
import { CHILD_TRAITS } from '../../services/childTraits';
import { generateChildProfile } from '../../services/insightService';
import { useData } from '../../store/DataContext';

const DIM_META = {
  cognitive:   { en: 'Cognitive (Can Learn)',     zh: '能学 (认知能力)', icon: Brain,     color: '#6366F1' },
  motivation:  { en: 'Motivation (Want to Learn)', zh: '愿学 (学习动力)', icon: Sparkles,  color: '#F59E0B' },
  strategy:    { en: 'Strategy (Know How)',        zh: '会学 (学习策略)', icon: Lightbulb, color: '#22C55E' },
  eq:          { en: 'EQ (Emotional)',             zh: '情商 (情绪智能)', icon: Heart,     color: '#EC4899' },
  quality:     { en: 'Learning Quality',           zh: '学习品质',       icon: BookOpen,  color: '#06B6D4' },
};

export default function ChildProfileTab({ child }) {
  const { lang } = useLang();
  const { dispatch } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const profile = child.childProfile || {};
  const dims = profile.dimensions || {};
  const traits = CHILD_TRAITS[child.id] || {};
  const hasProfile = profile.lastUpdated && Object.values(dims).some(v => v > 0);

  const radarData = Object.entries(DIM_META).map(([key, meta]) => ({
    dim: lang === 'zh' ? meta.zh.split('(')[0].trim() : key.charAt(0).toUpperCase() + key.slice(1),
    value: dims[key] || 0,
    fullMark: 10,
  }));

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateChildProfile(child);
      dispatch({
        type: 'UPDATE_CHILD_PROFILE',
        payload: {
          childId: child.id,
          profile: {
            dimensions: result.dimensions || dims,
            dimensionDescriptions: result.dimensionDescriptions || {},
            stuckPoints: result.stuckPoints || [],
            insights: result.insights || [],
            developmentNotes: result.developmentNotes || '',
          },
        },
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const lbl = (en, zh) => lang === 'zh' ? zh : en;

  return (
    <div className="space-y-4">
      {/* Generate / Refresh button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy">
          {lbl('Child Profile', '孩子画像')}
          {profile.lastUpdated && (
            <span className="text-[9px] text-brown-light font-normal ml-2">
              {lbl('Updated', '更新于')} {new Date(profile.lastUpdated).toLocaleDateString()}
            </span>
          )}
        </h3>
        <button onClick={handleGenerate} disabled={loading}
          className="retro-btn px-3 py-1.5 bg-teal text-cream-light border-teal text-[11px] flex items-center gap-1 disabled:opacity-50">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? lbl('Analyzing...', '分析中...') : hasProfile ? lbl('Refresh', '刷新') : lbl('Generate Profile', '生成画像')}
        </button>
      </div>

      {error && <div className="text-coral text-[11px] p-2 bg-coral-light rounded-lg">{error}</div>}

      {!hasProfile && !loading && (
        <div className="retro-card p-8 text-center text-brown-light">
          <Brain className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{lbl('Click "Generate Profile" to create an AI-powered learning profile from school report data.', '点击"生成画像"从学校报告数据中生成 AI 学习力画像。')}</p>
        </div>
      )}

      {hasProfile && (
        <>
          {/* Top row: Radar + Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar Chart */}
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-2">{lbl('Five-Dimension Profile', '五维学力画像')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E2E0D8" />
                    <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: '#5C4033' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 9 }} />
                    <Radar dataKey="value" stroke="#2A9D8F" fill="#2A9D8F" fillOpacity={0.15} strokeWidth={2} dot={{ r: 4, fill: '#2A9D8F' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Basic Info */}
            <div className="retro-card p-4">
              <h4 className="text-[12px] font-bold text-navy mb-3">{lbl('Basic Info', '基本信息')}</h4>
              <div className="text-[13px] leading-8 text-navy">
                <div><strong>{lbl('Name', '姓名')}:</strong> {child.name}</div>
                <div><strong>{lbl('Year Group', '年级')}:</strong> {child.yearGroup}</div>
                <div><strong>{lbl('School', '学校')}:</strong> Brighton College Singapore</div>
                <div><strong>{lbl('Section', '学部')}:</strong> {child.stage}</div>
              </div>
              {traits.personality && (
                <>
                  <h4 className="text-[12px] font-bold text-navy mt-4 mb-2">{lbl('Personality', '性格特征')}</h4>
                  <p className="text-[12px] text-brown-light leading-relaxed">{traits.personality}</p>
                </>
              )}
            </div>
          </div>

          {/* Dimension scores with progress bars */}
          <div className="retro-card p-4">
            <h4 className="text-[12px] font-bold text-navy mb-3">{lbl('Dimension Scores', '各维度评分')}</h4>
            <div className="space-y-3">
              {Object.entries(DIM_META).map(([key, meta]) => {
                const score = dims[key] || 0;
                const desc = profile.dimensionDescriptions?.[key] || '';
                const Icon = meta.icon;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-[13px] mb-1">
                      <span className="flex items-center gap-1.5 font-semibold text-navy">
                        <Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />
                        {lang === 'zh' ? meta.zh : meta.en}
                      </span>
                      <span className="font-bold text-navy">{score}/10</span>
                    </div>
                    <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score * 10}%`, background: meta.color }} />
                    </div>
                    {desc && <p className="text-[10px] text-brown-light mt-1">{desc}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Development Stage */}
          <div className="retro-card p-4">
            <h4 className="text-[12px] font-bold text-navy mb-3">{lbl('Development Stage', '发展阶段参考')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-cream rounded-lg">
                <div className="text-[10px] text-brown-light uppercase tracking-wider mb-1">Erikson</div>
                <div className="text-[13px] font-bold text-navy">{traits.eriksonStage?.split('—')[0] || 'N/A'}</div>
              </div>
              <div className="p-3 bg-cream rounded-lg">
                <div className="text-[10px] text-brown-light uppercase tracking-wider mb-1">Piaget</div>
                <div className="text-[13px] font-bold text-navy">{traits.piagetStage?.split('—')[0] || 'N/A'}</div>
              </div>
              <div className="p-3 bg-cream rounded-lg">
                <div className="text-[10px] text-brown-light uppercase tracking-wider mb-1">{lbl('Key Needs', '关键需求')}</div>
                <div className="text-[13px] font-bold text-navy">{traits.coreNeeds?.slice(0, 60) || 'N/A'}</div>
              </div>
            </div>
            {profile.developmentNotes && (
              <p className="text-[12px] text-brown-light leading-relaxed mt-3">{profile.developmentNotes}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
