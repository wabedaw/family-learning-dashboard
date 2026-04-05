import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, User, Clock, Lightbulb, ClipboardList } from 'lucide-react';
import { useChild } from '../store/DataContext';
import { useLang } from '../i18n';
import Avatar from '../components/Avatar';
import WeeklySummaryTab from '../components/insights/WeeklySummaryTab';
import ChildProfileTab from '../components/insights/ChildProfileTab';
import TimelineTab from '../components/insights/TimelineTab';
import DeepInsightsTab from '../components/insights/DeepInsightsTab';
import NextWeekGuideTab from '../components/insights/NextWeekGuideTab';

const TABS = [
  { id: 'summary',  icon: Mail,          labelEn: 'Weekly Summary', labelZh: '本周总结' },
  { id: 'profile',  icon: User,          labelEn: 'Child Profile',  labelZh: '孩子画像' },
  { id: 'timeline', icon: Clock,         labelEn: 'Timeline',       labelZh: '时间线' },
  { id: 'insights', icon: Lightbulb,     labelEn: 'Deep Insights',  labelZh: '深度洞察' },
  { id: 'guide',    icon: ClipboardList, labelEn: 'Next Week',      labelZh: '下周指南' },
];

export default function ChildInsights() {
  const { childId } = useParams();
  const child = useChild(childId);
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('summary');

  if (!child) {
    return (
      <div className="p-6">
        <p className="text-brown-light">Child not found.</p>
        <Link to="/" className="text-teal underline">Back to overview</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link to={`/child/${childId}`} className="text-brown-light hover:text-brown"><ArrowLeft className="w-5 h-5" /></Link>
        <Avatar src={child.avatar} size="md" />
        <div>
          <h1 className="text-xl font-black text-navy font-[family-name:var(--font-display)]">
            {child.name} {lang === 'zh' ? '的洞察' : 'Insights'}
          </h1>
          <p className="text-[11px] text-brown-light font-semibold">{child.yearGroup} · {child.stage}</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-cream-dark/40 p-1 rounded-xl mb-5 overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-teal text-cream-light shadow-md'
                  : 'text-brown-light hover:bg-cream-dark/60 hover:text-navy'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              {lang === 'zh' ? tab.labelZh : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'summary'  && <WeeklySummaryTab child={child} />}
      {activeTab === 'profile'  && <ChildProfileTab child={child} />}
      {activeTab === 'timeline' && <TimelineTab child={child} />}
      {activeTab === 'insights' && <DeepInsightsTab child={child} />}
      {activeTab === 'guide'    && <NextWeekGuideTab child={child} />}
    </div>
  );
}
