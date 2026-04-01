import { useState, useEffect } from 'react';
import { getLatestReport } from '../data';
import { useData } from '../store/DataContext';
import { igcseActionPlans } from '../data/igcseActionPlans';
import GoalCard from '../components/GoalCard';
import { Target, ArrowLeft, Plus, X, Trash2, Save, GraduationCap, TrendingUp, AlertTriangle, Star, Lightbulb, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useTranslatedChild, useTranslatedChildren } from '../hooks/useTranslatedChild';
import Avatar from '../components/Avatar';

// ─── IGCSE Action Plan Component (data-driven) ─────────────
function IGCSEActionPlan({ child, lang }) {
  const plan = igcseActionPlans[child.id];
  if (!plan) return null;

  const t = (obj) => obj?.[lang] || obj?.en || '';

  return (
    <div className="retro-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5 text-teal" />
        <h2 className="text-base font-bold text-navy font-[family-name:var(--font-display)]">
          {child.id === 'michael'
            ? (lang === 'zh' ? `${child.name} 的 IGCSE 准备行动计划` : `${child.name}'s IGCSE Prep Action Plan`)
            : (lang === 'zh' ? `${child.name} 的 Senior School 准备行动计划` : `${child.name}'s Senior School Prep Action Plan`)
          }
        </h2>
      </div>
      <p className="text-[11px] text-brown-light leading-relaxed mb-4">{t(plan.overview)}</p>

      {/* Roadmap Timeline */}
      <div className="p-3 bg-cream rounded-lg mb-5 border border-cream-dark">
        <p className="text-[10px] text-brown-light font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3 h-3 inline mr-1" />
          {child.id === 'michael' ? 'IGCSE ROADMAP (YEAR 8→9)' : 'SENIOR SCHOOL ROADMAP (YEAR 6→7)'}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {plan.roadmap.map((item, i) => (
            <div key={i} className="text-center">
              <div className={`${item.color} text-cream-light text-[10px] font-bold rounded-t-md py-1 px-1`}>{t(item.period)}</div>
              <div className="text-[9px] text-navy border border-cream-dark border-t-0 rounded-b-md py-1.5 px-1 leading-tight">{t(item.focus)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Sections */}
      {plan.priorities.map((priority, pi) => (
        <div key={pi} className="mb-5">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-lg">{priority.emoji}</span>
            <h3 className="text-[12px] font-bold uppercase tracking-wider" style={{ color: priority.category === 'critical' ? '#E76F51' : priority.category === 'important' ? '#5C4033' : '#2A9D8F' }}>
              {lang === 'zh' ? priority.labelZh : priority.labelEn}
            </h3>
          </div>
          <div className="space-y-3">
            {priority.subjects.map((sub, si) => (
              <SubjectActionCard key={si} sub={sub} lang={lang} category={priority.category} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Subject Action Card ────────────────────────────────────
function SubjectActionCard({ sub, lang, category }) {
  const [expanded, setExpanded] = useState(false);
  const t = (obj) => obj?.[lang] || obj?.en || '';

  const borderColor = category === 'critical' ? 'border-coral' : category === 'important' ? 'border-mustard' : 'border-teal';
  const bgColor = category === 'critical' ? 'bg-coral-light' : category === 'important' ? 'bg-mustard-light' : 'bg-teal-light';

  return (
    <div className={`rounded-lg border-2 ${borderColor} ${bgColor} overflow-hidden`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-3 flex items-start justify-between text-left hover:bg-cream-light/30 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm">{sub.trendEmoji}</span>
            <h4 className="text-sm font-bold text-navy font-[family-name:var(--font-display)]">{sub.name}</h4>
          </div>
          <p className="text-[10px] text-brown-light font-semibold">{lang === 'zh' ? '成绩' : 'Attainment'}: {sub.attainment} · {lang === 'zh' ? '趋势' : 'Trend'}: {sub.trend}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="retro-badge bg-cream-light/80 text-navy border-cream-dark text-[9px]">{sub.igcseTarget?.split('(')[0]?.split('—')[0]?.trim()}</span>
          {expanded ? <ChevronDown className="w-4 h-4 text-brown-light" /> : <ChevronRight className="w-4 h-4 text-brown-light" />}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3">
          {/* Analysis */}
          <div className="p-2.5 bg-cream-light/70 rounded-lg">
            <p className="text-[11px] text-navy leading-relaxed">{t(sub.analysis)}</p>
          </div>

          {/* Actions */}
          <div>
            <p className="text-[10px] text-navy font-bold uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-3 h-3 inline mr-0.5 text-mustard" />
              {lang === 'zh' ? '行动建议' : 'Action Steps'}
            </p>
            <div className="space-y-1">
              {sub.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-navy">
                  <span className="text-teal font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{t(action)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* IGCSE Skills Tags */}
          {sub.igcseSkills?.length > 0 && (
            <div>
              <p className="text-[9px] text-brown-light font-bold uppercase tracking-wider mb-1">
                {lang === 'zh' ? '需要掌握的技能' : 'Skills to Build'}
              </p>
              <div className="flex flex-wrap gap-1">
                {sub.igcseSkills.map((skill, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 bg-cream-light rounded border border-cream-dark text-navy">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Goal Form ──────────────────────────────────────────────
const emptyGoal = {
  id: '', term: '', type: 'academic', title: '', reason: '',
  priority: 'Medium', timeBudget: '', owner: '', status: 'in-progress', observations: [],
};

function GoalForm({ goal, onSave, onCancel, onDelete, childName, children }) {
  const [form, setForm] = useState({ ...emptyGoal, ...goal, observationsText: (goal?.observations || []).join('\n') });
  const { lang } = useLang();
  const isEditing = !!goal?.id;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    const saved = {
      ...form,
      id: form.id || 'g-' + Date.now(),
      term: form.term || (getLatestReport(children.find(c => c.name === childName))?.term || ''),
      observations: form.observationsText.split('\n').map(s => s.trim()).filter(Boolean),
    };
    delete saved.observationsText;
    onSave(saved);
  };

  const typeOpts = [
    { value: 'academic', label: lang === 'zh' ? '学科目标' : 'Academic' },
    { value: 'habit', label: lang === 'zh' ? '习惯目标' : 'Habit' },
    { value: 'strength', label: lang === 'zh' ? '优势投入' : 'Strength' },
  ];
  const statusOpts = [
    { value: 'in-progress', label: lang === 'zh' ? '努力中' : 'In Progress' },
    { value: 'on-track', label: lang === 'zh' ? '进行中' : 'On Track' },
    { value: 'achieved', label: lang === 'zh' ? '已达成' : 'Achieved' },
    { value: 'at-risk', label: lang === 'zh' ? '需关注' : 'At Risk' },
  ];
  const priOpts = [{ value: 'High', label: lang === 'zh' ? '高' : 'High' }, { value: 'Medium', label: lang === 'zh' ? '中' : 'Medium' }, { value: 'Low', label: lang === 'zh' ? '低' : 'Low' }];
  const lbl = "text-[11px] font-semibold text-navy uppercase tracking-wider block mb-1";
  const inp = "w-full p-2 text-sm border-2 border-cream-dark rounded-lg bg-cream-light focus:outline-none focus:ring-2 focus:ring-teal text-navy";

  return (
    <div className="retro-card border-2 border-teal p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)]">
          {isEditing ? (lang === 'zh' ? '编辑目标' : 'Edit Goal') : (lang === 'zh' ? '新建目标' : 'New Goal')}
        </h3>
        <button onClick={onCancel} className="w-7 h-7 rounded-md bg-cream-dark/60 flex items-center justify-center hover:bg-cream-dark"><X className="w-4 h-4 text-brown" /></button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <div className="lg:col-span-2"><label className={lbl}>{lang === 'zh' ? '目标名称' : 'Goal Title'} *</label><input value={form.title} onChange={e => set('title', e.target.value)} className={inp} /></div>
        <div><label className={lbl}>{lang === 'zh' ? '类型' : 'Type'}</label><select value={form.type} onChange={e => set('type', e.target.value)} className={inp + ' appearance-none'}>{typeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div><label className={lbl}>{lang === 'zh' ? '优先级' : 'Priority'}</label><select value={form.priority} onChange={e => set('priority', e.target.value)} className={inp + ' appearance-none'}>{priOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div><label className={lbl}>{lang === 'zh' ? '状态' : 'Status'}</label><select value={form.status} onChange={e => set('status', e.target.value)} className={inp + ' appearance-none'}>{statusOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div><label className={lbl}>{lang === 'zh' ? '负责人' : 'Owner'}</label><input value={form.owner} onChange={e => set('owner', e.target.value)} className={inp} /></div>
        <div><label className={lbl}>{lang === 'zh' ? '时间' : 'Time'}</label><input value={form.timeBudget} onChange={e => set('timeBudget', e.target.value)} className={inp} /></div>
        <div className="lg:col-span-2"><label className={lbl}>{lang === 'zh' ? '原因' : 'Reason'}</label><textarea value={form.reason} onChange={e => set('reason', e.target.value)} className={inp + ' resize-none'} rows={2} /></div>
        <div className="lg:col-span-2"><label className={lbl}>{lang === 'zh' ? '观察记录' : 'Observations'}</label><textarea value={form.observationsText} onChange={e => set('observationsText', e.target.value)} className={inp + ' resize-none'} rows={2} /></div>
      </div>
      <div className="flex items-center justify-between">
        <div>{isEditing && onDelete && <button onClick={() => { if (confirm(lang === 'zh' ? '确定删除？' : 'Delete?')) onDelete(goal.id); }} className="retro-btn px-3 py-1.5 bg-coral-light text-coral border-coral text-[11px] flex items-center gap-1"><Trash2 className="w-3 h-3" />{lang === 'zh' ? '删除' : 'Delete'}</button>}</div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="retro-btn px-3 py-1.5 bg-cream-light text-navy border-navy text-[11px]">{lang === 'zh' ? '取消' : 'Cancel'}</button>
          <button onClick={handleSave} className="retro-btn px-4 py-1.5 bg-teal text-cream-light border-teal text-[11px] flex items-center gap-1"><Save className="w-3 h-3" />{lang === 'zh' ? '保存' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function LearningAction() {
  const { children, dispatch } = useData();
  const tChildren = useTranslatedChildren(children);
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const child = tChildren.find(c => c.id === selectedChild);
  const { lang } = useLang();

  const [editingGoal, setEditingGoal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const currentGoals = child?.goals || [];

  const handleSaveGoal = (saved) => {
    dispatch({ type: 'SAVE_GOAL', payload: { childId: selectedChild, goal: saved } });
    setEditingGoal(null);
    setShowAddForm(false);
  };
  const handleDeleteGoal = (goalId) => {
    dispatch({ type: 'DELETE_GOAL', payload: { childId: selectedChild, goalId } });
    setEditingGoal(null);
  };

  useEffect(() => { setEditingGoal(null); setShowAddForm(false); }, [selectedChild]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-brown-light hover:text-brown"><ArrowLeft className="w-5 h-5" /></Link>
        <Target className="w-5 h-5 text-teal" />
        <div>
          <h1 className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">
            {lang === 'zh' ? '学习行动' : 'Learning Actions'}
          </h1>
          <p className="text-[11px] text-brown-light font-semibold">
            {lang === 'zh' ? '基于4学期报告深度分析 + IGCSE标准的个性化行动计划' : 'Personalized action plans from 4-term deep analysis + IGCSE standards'}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {tChildren.map(c => (
          <button key={c.id} onClick={() => setSelectedChild(c.id)}
            className={`retro-btn px-4 py-2 text-sm flex items-center gap-1.5 ${selectedChild === c.id ? 'bg-teal text-cream-light border-teal' : 'bg-cream-light text-navy border-navy'}`}>
            <Avatar src={c.avatar} size="xs" /> {c.name}
          </button>
        ))}
      </div>

      {/* Personalized IGCSE Action Plan */}
      <div className="mb-6">
        <IGCSEActionPlan child={child} lang={lang} />
      </div>

      {/* Goals Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-0.5">
              {lang === 'zh' ? '学期目标' : 'Term Goals'}
            </h2>
            <p className="text-[11px] text-brown-light uppercase tracking-wider font-semibold">
              {lang === 'zh' ? '对应上方行动建议设定 · 可增加和修改' : 'Aligned with action plan above · Add or edit'}
            </p>
          </div>
          {!showAddForm && !editingGoal && (
            <button onClick={() => setShowAddForm(true)}
              className="retro-btn px-4 py-2 bg-teal text-cream-light border-teal text-[12px] flex items-center gap-1.5">
              <Plus className="w-4 h-4" />{lang === 'zh' ? '新建目标' : 'Add Goal'}
            </button>
          )}
        </div>

        {showAddForm && <GoalForm goal={null} childName={child.name} children={children} onSave={handleSaveGoal} onCancel={() => setShowAddForm(false)} />}
        {editingGoal && <GoalForm goal={editingGoal} childName={child.name} children={children} onSave={handleSaveGoal} onCancel={() => setEditingGoal(null)} onDelete={handleDeleteGoal} />}

        {currentGoals.length === 0 ? (
          <div className="retro-card p-8 text-center">
            <Target className="w-8 h-8 text-cream-dark mx-auto mb-2" />
            <p className="text-sm text-brown-light font-semibold">{lang === 'zh' ? '还没有设定目标' : 'No goals set yet'}</p>
            <p className="text-[11px] text-brown-light mt-1">{lang === 'zh' ? '根据上方行动建议，点击"新建目标"开始' : 'Based on the action plan above, click "Add Goal"'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentGoals.map(g => <GoalCard key={g.id} goal={g} onEdit={(goal) => { setShowAddForm(false); setEditingGoal(goal); }} />)}
          </div>
        )}
      </div>
    </div>
  );
}
