import { useState } from 'react';
import { FileText, MessageSquare, ClipboardList, Newspaper, GraduationCap, BookOpen, ChevronDown, ChevronRight, AlertTriangle, Lightbulb, Star } from 'lucide-react';
import { useLang } from '../../i18n';

const TYPE_CONFIG = {
  report:     { icon: FileText,      color: '#2A9D8F', label: 'Report',     labelZh: '报告' },
  newsletter: { icon: Newspaper,     color: '#E9C46A', label: 'Newsletter', labelZh: '通讯' },
  exam:       { icon: GraduationCap, color: '#6366F1', label: 'Exam',       labelZh: '考试' },
  homework:   { icon: ClipboardList, color: '#06B6D4', label: 'Homework',   labelZh: '作业' },
  parentNote: { icon: BookOpen,      color: '#E76F51', label: 'Parent Note',labelZh: '家长笔记' },
  reflection: { icon: BookOpen,      color: '#1B2838', label: 'Reflection', labelZh: '周反思' },
  whatsapp:   { icon: MessageSquare, color: '#8B5CF6', label: 'WhatsApp',   labelZh: 'WhatsApp' },
};

export default function TimelineTab({ child }) {
  const { lang } = useLang();
  const timeline = [...(child.childProfile?.timeline || [])].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const [expandedId, setExpandedId] = useState(null);
  const lbl = (en, zh) => lang === 'zh' ? zh : en;

  if (!timeline.length) {
    return (
      <div className="retro-card p-8 text-center text-brown-light">
        <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">{lbl('No timeline entries yet. Upload reports, parent notes, reflections, or WhatsApp chats to build the timeline.', '暂无时间线记录。上传报告、家长笔记、周反思或 WhatsApp 聊天记录来构建时间线。')}</p>
      </div>
    );
  }

  return (
    <div className="retro-card p-5">
      <h3 className="text-sm font-bold text-navy mb-1">{lbl('Timeline', '记录时间线')}</h3>
      <p className="text-[10px] text-brown-light mb-4">{lbl('Click any entry to expand details and AI insights', '点击记录查看详情和 AI 分析')}</p>

      <div className="relative pl-7">
        {/* Vertical line */}
        <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-cream-dark" />

        {timeline.map((entry) => {
          const cfg = TYPE_CONFIG[entry.type] || TYPE_CONFIG.report;
          const Icon = cfg.icon;
          const isOpen = expandedId === entry.id;

          return (
            <div key={entry.id} className="relative mb-5 cursor-pointer" onClick={() => setExpandedId(isOpen ? null : entry.id)}>
              {/* Dot */}
              <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full border-2 bg-cream-light" style={{ borderColor: cfg.color }} />

              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-brown-light">
                    <span>{entry.date}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{ background: cfg.color + '15', color: cfg.color }}>
                      <Icon className="w-2.5 h-2.5 inline mr-0.5" />
                      {lang === 'zh' ? cfg.labelZh : cfg.label}
                    </span>
                  </div>
                  <div className="text-[13px] font-semibold text-navy mt-0.5">{entry.title}</div>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4 text-brown-light shrink-0 mt-1" /> : <ChevronRight className="w-4 h-4 text-brown-light shrink-0 mt-1" />}
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="mt-2 p-3 bg-cream rounded-lg text-[12px] text-navy leading-relaxed space-y-2">
                  {entry.detail && <p>{entry.detail}</p>}

                  {/* AI Insight cards */}
                  {entry.aiInsight?.stuckPoints?.length > 0 && (
                    <div className="p-2.5 bg-coral-light rounded-lg border-l-3 border-coral">
                      <div className="flex items-center gap-1 font-bold text-coral text-[11px] mb-1">
                        <AlertTriangle className="w-3 h-3" /> {lbl('Stuck Points', '卡点')}
                      </div>
                      {entry.aiInsight.stuckPoints.map((sp, i) => <p key={i} className="text-[11px]">{sp}</p>)}
                    </div>
                  )}
                  {entry.aiInsight?.insights?.length > 0 && (
                    <div className="p-2.5 bg-teal-light rounded-lg border-l-3 border-teal">
                      <div className="flex items-center gap-1 font-bold text-teal text-[11px] mb-1">
                        <Lightbulb className="w-3 h-3" /> {lbl('Insights', '洞察')}
                      </div>
                      {entry.aiInsight.insights.map((ins, i) => <p key={i} className="text-[11px]">{ins}</p>)}
                    </div>
                  )}
                  {entry.aiInsight?.wins?.length > 0 && (
                    <div className="p-2.5 bg-mustard-light rounded-lg border-l-3 border-mustard">
                      <div className="flex items-center gap-1 font-bold text-mustard text-[11px] mb-1">
                        <Star className="w-3 h-3" /> {lbl('Wins', '小成功')}
                      </div>
                      {entry.aiInsight.wins.map((w, i) => <p key={i} className="text-[11px]">{w}</p>)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
