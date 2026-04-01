import { ChevronRight } from 'lucide-react';

const levelColors = {
  5: 'bg-teal text-cream-light border-teal',
  4: 'bg-teal/80 text-cream-light border-teal',
  3: 'bg-mustard text-navy border-mustard',
  2: 'bg-coral/90 text-cream-light border-coral',
  1: 'bg-wine text-cream-light border-wine',
};
const levelLabels = { 5: 'Excelling', 4: 'Above', 3: 'Meeting', 2: 'Below/Dev', 1: 'Concern' };

const attainmentColors = {
  'Excelling': 'bg-teal text-cream-light', 'Above': 'bg-teal/70 text-cream-light',
  'Meeting': 'bg-mustard text-navy', 'Below': 'bg-coral text-cream-light',
  'Secure': 'bg-mustard text-navy', 'Developing': 'bg-coral/80 text-cream-light',
  'Concern': 'bg-wine text-cream-light', 'Advanced': 'bg-teal text-cream-light',
};

export default function SubjectCard({ subject, prevSubject, onClick }) {
  const level = subject.standardised?.academic || 3;
  const prevLevel = prevSubject?.standardised?.academic;
  const change = prevLevel ? level - prevLevel : 0;
  const attColor = attainmentColors[subject.attainment] || levelColors[level] || 'bg-mustard text-navy';

  return (
    <div onClick={onClick} className="retro-card p-4 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-navy text-sm font-[family-name:var(--font-display)]">{subject.name}</h3>
          <p className="text-[11px] text-brown-light">{subject.teacherName}</p>
        </div>
        <span className={`retro-badge ${attColor}`}>
          {subject.attainment || levelLabels[level]}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="text-[10px] text-brown-light mb-0.5 uppercase tracking-wider">Effort</div>
          <div className="text-xs font-bold text-navy">{subject.effort || subject.classwork}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-brown-light mb-0.5 uppercase tracking-wider">Stability</div>
          <div className="flex justify-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (subject.standardised?.stability || 0) ? 'bg-teal' : 'bg-cream-dark'}`} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-brown-light mb-0.5 uppercase tracking-wider">Trend</div>
          <div className={`text-xs font-bold ${change > 0 ? 'text-teal' : change < 0 ? 'text-coral' : 'text-brown-light'}`}>
            {change > 0 ? `+${change}` : change < 0 ? `${change}` : '='}
          </div>
        </div>
      </div>
      <p className="text-[11px] text-brown line-clamp-2 leading-relaxed">
        {subject.commentInsight?.strengths?.[0] && <span className="text-teal-dark font-medium">+ {subject.commentInsight.strengths[0]}</span>}
        {subject.commentInsight?.concerns?.[0] && <span className="text-coral ml-1 font-medium">! {subject.commentInsight.concerns[0]}</span>}
      </p>
      <div className="flex items-center justify-end mt-2 text-[11px] text-brown-light group-hover:text-teal transition-colors font-semibold uppercase tracking-wider">
        Details <ChevronRight className="w-3 h-3 ml-0.5" />
      </div>
    </div>
  );
}
