import { CheckCircle, AlertTriangle, PauseCircle } from 'lucide-react';
import { useLang } from '../../i18n';

export default function NextWeekGuideTab({ child }) {
  const { lang } = useLang();
  const guide = child.nextWeekGuide;
  const lbl = (en, zh) => lang === 'zh' ? zh : en;

  if (!guide) {
    return (
      <div className="retro-card p-8 text-center text-brown-light">
        <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">{lbl('Generate a Weekly Summary first — the Next Week Guide is created at the same time.', '请先生成本周总结 — 下周指南会同时生成。')}</p>
      </div>
    );
  }

  const sections = [
    {
      key: 'doMore',
      icon: CheckCircle,
      headerEn: 'DO MORE — Continue & Strengthen',
      headerZh: '继续做 — 保持并加强',
      bg: 'bg-teal-light',
      border: 'border-teal',
      headerBg: '#DCFCE7',
      headerColor: '#166534',
      items: guide.doMore || [],
    },
    {
      key: 'doLess',
      icon: AlertTriangle,
      headerEn: 'DO LESS — Reduce & Adjust',
      headerZh: '减少做 — 调整策略',
      bg: 'bg-mustard-light',
      border: 'border-mustard',
      headerBg: '#FEF3C7',
      headerColor: '#92400E',
      items: guide.doLess || [],
    },
    {
      key: 'parkIt',
      icon: PauseCircle,
      headerEn: 'PARK IT — Pause for Now',
      headerZh: '暂时不管 — 以后再说',
      bg: 'bg-cream',
      border: 'border-cream-dark',
      headerBg: '#F1F5F9',
      headerColor: '#64748B',
      items: guide.parkIt || [],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy">{lbl('Next Week Guide', '下周指南')}</h3>
        {guide.generatedAt && (
          <span className="text-[9px] text-brown-light">
            {lbl('Generated', '生成于')} {new Date(guide.generatedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {sections.map(sec => {
        const Icon = sec.icon;
        if (!sec.items.length) return null;
        return (
          <div key={sec.key} className="retro-card overflow-hidden">
            <div className="px-4 py-2.5 font-bold text-[13px] flex items-center gap-2" style={{ background: sec.headerBg, color: sec.headerColor }}>
              <Icon className="w-4 h-4" /> {lang === 'zh' ? sec.headerZh : sec.headerEn}
            </div>
            <div className="p-4 space-y-3">
              {sec.items.map((item, i) => (
                <div key={i} className={`p-3 rounded-lg ${sec.bg} border ${sec.border}`}>
                  <div className="font-bold text-[12px] text-navy mb-1">{i + 1}. {item.action || item.item || ''}</div>
                  {(item.reason || '') && <p className="text-[11px] text-brown-light leading-relaxed">{item.reason}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
