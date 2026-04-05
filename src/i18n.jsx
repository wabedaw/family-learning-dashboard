import { createContext, useContext, useState } from 'react';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('bi'); // 'en', 'zh', 'bi' (bilingual)

  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key;
    if (lang === 'bi') return entry.bi || `${entry.en} ${entry.zh}`;
    return entry[lang] || entry.en || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export const translations = {
  // App / Layout
  'app.title': { en: "David's Family", zh: 'David家庭', bi: "David's Family" },
  'app.subtitle': { en: "David's Family Dashboard", zh: 'David家庭学习复盘与决策助手', bi: 'David家庭学习复盘与决策助手' },
  'app.footer': { en: 'Brighton College Family', zh: 'Brighton College 家庭', bi: 'Brighton College Family' },

  // Nav
  'nav.overview': { en: 'Family Overview', zh: '家庭总览', bi: 'Family Overview' },
  'nav.overview.desc': { en: 'Home', zh: '首页', bi: '家庭总览' },
  'nav.michael': { en: 'Michael', zh: 'Michael', bi: 'Michael' },
  'nav.michael.desc': { en: 'Year 8 · Senior', zh: '八年级 · 高中部', bi: 'Year 8 · Senior' },
  'nav.lucas': { en: 'Lucas', zh: 'Lucas', bi: 'Lucas' },
  'nav.lucas.desc': { en: 'Year 6 · Junior', zh: '六年级 · 小学部', bi: 'Year 6 · Junior' },
  'nav.reports': { en: 'AI Analysis', zh: 'AI分析', bi: 'AI Analysis' },
  'nav.reports.desc': { en: 'Reports & Insights', zh: '报告与洞察', bi: 'AI分析' },
  'nav.actions': { en: 'Actions', zh: '学习行动', bi: 'Actions' },
  'nav.actions.desc': { en: 'Plans & Goals', zh: '计划与目标', bi: '学习行动' },
  'nav.upload': { en: 'Upload Data', zh: '数据上传', bi: 'Upload Data' },
  'nav.upload.desc': { en: 'Import reports', zh: '导入报告', bi: '数据上传' },
  'nav.michael.insights': { en: 'Insights', zh: '洞察', bi: 'Insights' },
  'nav.michael.insights.desc': { en: 'Profile & Analysis', zh: '画像与分析', bi: '洞察' },
  'nav.lucas.insights': { en: 'Insights', zh: '洞察', bi: 'Insights' },
  'nav.lucas.insights.desc': { en: 'Profile & Analysis', zh: '画像与分析', bi: '洞察' },

  // Family Overview Page
  'overview.title': { en: "David's Family Dashboard", zh: 'David家庭仪表盘', bi: "David's Family Dashboard" },
  'overview.subtitle': { en: 'From School Reports to Family Action', zh: '从学校报告到家庭行动', bi: 'David家庭学习总览 · From School Reports to Family Action' },
  'overview.upload': { en: 'Upload Report', zh: '上传报告', bi: 'Upload Report 上传报告' },
  'overview.meeting': { en: 'Family Meeting', zh: '家庭学习会', bi: 'Family Meeting 家庭学习会' },
  'overview.attention': { en: 'Attention Items', zh: '需关注事项', bi: '需关注事项 Attention Items' },
  'overview.goals': { en: 'Current Goals', zh: '当前目标', bi: '当前目标 Current Goals' },
  'overview.noWarnings': { en: 'No active warnings 🎉', zh: '暂无需要关注的问题 🎉', bi: 'No active warnings 🎉' },
  'overview.session.title': { en: 'Family Learning Session', zh: '家庭学习会', bi: 'Family Learning Session 家庭学习会' },
  'overview.session.desc': { en: 'Recommended: Review Term 2 reports together. Choose 3 goals per child for next term.', zh: '建议：一起复盘第二学期报告，每个孩子共同选定下学期 3 个目标。', bi: 'Recommended: Review Term 2 reports together. Choose 3 goals per child for next term.' },
  'overview.session.desc2': { en: '', zh: '', bi: '建议：一起复盘第二学期报告，每个孩子共同选定下学期 3 个目标。' },
  'overview.start': { en: 'Start', zh: '开始', bi: 'Start 开始' },
  'overview.latest': { en: 'Latest', zh: '最新', bi: 'Latest' },

  // Status labels
  'status.academic': { en: 'Academic', zh: '学业', bi: 'Academic' },
  'status.effort': { en: 'Effort', zh: '投入', bi: 'Effort' },
  'status.concerns': { en: 'Concerns', zh: '关注', bi: 'Concerns' },
  'status.strengths': { en: 'Strengths', zh: '优势', bi: 'Strengths' },
  'status.achieved': { en: 'Achieved', zh: '已达成', bi: '已达成' },
  'status.onTrack': { en: 'On Track', zh: '进行中', bi: '进行中' },
  'status.inProgress': { en: 'In Progress', zh: '努力中', bi: '努力中' },

  // Child Dashboard
  'dashboard.title': { en: "'s Dashboard", zh: '的仪表盘', bi: "'s Dashboard" },
  'dashboard.latestReport': { en: 'Latest Report', zh: '最新报告', bi: 'Latest Report' },
  'dashboard.academicLevel': { en: 'Academic Level', zh: '学业水平', bi: 'Academic Level' },
  'dashboard.academicLevel.sub': { en: 'Academic score', zh: '学业分数', bi: '学业水平' },
  'dashboard.effort': { en: 'Learning Effort', zh: '学习投入', bi: 'Learning Effort' },
  'dashboard.effort.sub': { en: 'Effort score', zh: '投入分数', bi: '学习投入' },
  'dashboard.stability': { en: 'Growth Stability', zh: '成长稳定性', bi: 'Growth Stability' },
  'dashboard.stability.sub': { en: 'Stability score', zh: '稳定性', bi: '成长稳定性' },
  'dashboard.independence': { en: 'Independence', zh: '独立性水平', bi: 'Independence' },
  'dashboard.independence.sub': { en: 'Independence score', zh: '独立性', bi: '独立性水平' },
  'dashboard.subjectStatus': { en: 'Subject Status', zh: '各科学习状态', bi: 'Subject Status 各科学习状态' },
  'dashboard.subjectStatus.sub': { en: 'Click any subject for details', zh: '点击查看详情', bi: 'Click any subject for details · 点击查看详情' },
  'dashboard.currentGoals': { en: 'Current Goals', zh: '当前目标', bi: 'Current Goals 当前目标' },
  'dashboard.currentGoals.sub': { en: 'Term goals', zh: '本学期目标', bi: 'goals · 本学期目标' },
  'dashboard.overallComment': { en: 'Overall Comment', zh: '总体评价', bi: 'Overall Comment 总体评价' },
  'dashboard.pupilReflection': { en: 'Pupil Reflection', zh: '学生自我反思', bi: '💭 Pupil Reflection 学生自我反思' },
  'dashboard.nextSteps': { en: 'Next Steps', zh: '下一步', bi: '→ Next Steps 下一步' },
  'dashboard.commentAnalysis': { en: 'Comment Analysis', zh: '评语分析', bi: 'Comment Analysis 评语分析' },

  // Trend Charts
  'chart.overall': { en: 'Overall Trend', zh: '学期趋势追踪', bi: 'Overall Trend 学期趋势追踪' },
  'chart.overall.sub': { en: 'Standardised scores across all subjects (1-5 scale)', zh: '所有学科标准化分数（1-5分）', bi: 'Standardised scores across all subjects (1-5 scale)' },
  'chart.subject': { en: 'Subject Performance', zh: '学科表现变化', bi: 'Subject Performance 学科表现变化' },
  'chart.subject.sub': { en: 'Academic level by subject across terms', zh: '各学科学期成绩变化', bi: 'Academic level by subject across terms' },
  'chart.radar': { en: 'Capability Profile', zh: '能力雷达图', bi: 'Capability Profile 能力雷达图' },
  'chart.radar.sub': { en: "'s current capability snapshot", zh: '当前能力快照', bi: "'s current capability snapshot" },

  // Behavior / Stability
  'behavior.title': { en: 'Behavior & Habit Stability', zh: '行为/习惯稳定性指标', bi: 'Behavior & Habit Stability 行为/习惯稳定性指标' },
  'behavior.sub': { en: 'Key indicators tracked across terms', zh: '跨学期关键指标追踪', bi: 'Key indicators tracked across terms · 跨学期关键指标追踪' },
  'behavior.organisation': { en: 'Organisation', zh: '组织能力', bi: 'Organisation 组织能力' },
  'behavior.homeworkPunctuality': { en: 'Homework Punctuality', zh: '作业准时', bi: 'Homework Punctuality 作业准时' },
  'behavior.independence': { en: 'Independence', zh: '独立性', bi: 'Independence 独立性' },
  'behavior.classParticipation': { en: 'Class Participation', zh: '课堂参与', bi: 'Class Participation 课堂参与' },
  'behavior.selfAwareness': { en: 'Self-Awareness', zh: '自我认知', bi: 'Self-Awareness 自我认知' },
  'behavior.speakingConfidence': { en: 'Speaking Confidence', zh: '表达自信', bi: 'Speaking Confidence 表达自信' },
  'behavior.writingSelfCheck': { en: 'Writing Self-Check', zh: '写作自查', bi: 'Writing Self-Check 写作自查' },
  'behavior.perseverance': { en: 'Perseverance', zh: '坚持力', bi: 'Perseverance 坚持力' },
  'behavior.feedbackResponse': { en: 'Feedback Response', zh: '反馈接受', bi: 'Feedback Response 反馈接受' },

  // Trend labels
  'trend.improving': { en: 'Improving', zh: '上升', bi: '上升' },
  'trend.declining': { en: 'Declining', zh: '下降', bi: '下降' },
  'trend.stable': { en: 'Stable', zh: '稳定', bi: '稳定' },

  // Comment Insight
  'comment.title': { en: 'Teacher Comment Summary', zh: '教师评语总结', bi: 'Teacher Comment Summary 教师评语总结' },
  'comment.sub': { en: 'Auto-categorised from', zh: '自动分类来自', bi: 'Auto-categorised from' },
  'comment.strengths': { en: 'Strengths', zh: '优点', bi: 'Strengths 优点' },
  'comment.concerns': { en: 'Concerns', zh: '关注', bi: 'Concerns 关注' },
  'comment.suggestions': { en: 'Suggestions', zh: '建议', bi: 'Suggestions 建议' },
  'comment.signals': { en: 'Signals', zh: '信号', bi: 'Signals 信号' },
  'comment.familyAction': { en: 'Family Action', zh: '家庭行动', bi: 'Family Action 家庭行动' },

  // Warnings & Strengths
  'warning.title': { en: 'Early Warnings & Predictions', zh: '预警与预测', bi: 'Early Warnings & Predictions 预警与预测' },
  'warning.sub': { en: 'Areas requiring attention', zh: '需关注区域', bi: 'Areas requiring attention · 需关注区域' },
  'strength.title': { en: 'Strength Investment', zh: '优势投入建议', bi: 'Strength Investment 优势投入建议' },
  'strength.sub': { en: 'Areas worth investing in', zh: '值得投入的方向', bi: 'Areas worth investing in · 值得投入的方向' },
  'strength.high': { en: 'High Investment', zh: '重点投入', bi: '重点投入' },
  'strength.medium': { en: 'Continue', zh: '持续关注', bi: '持续关注' },
  'strength.evidence': { en: 'Evidence', zh: '依据', bi: 'Evidence 依据' },

  // Goals
  'goal.habit': { en: 'Habit Goal', zh: '习惯目标', bi: '习惯目标' },
  'goal.academic': { en: 'Academic Goal', zh: '学科目标', bi: '学科目标' },
  'goal.strength': { en: 'Strength Investment', zh: '优势投入', bi: '优势投入' },
  'goal.priority': { en: 'Priority', zh: '优先级', bi: 'Priority' },
  'goal.time': { en: 'Time', zh: '时间', bi: 'Time' },
  'goal.owner': { en: 'Owner', zh: '负责人', bi: 'Owner' },
  'goal.observations': { en: 'Observations', zh: '观察记录', bi: '观察记录 Observations' },

  // Report Detail Page
  'report.title': { en: 'AI Analysis', zh: 'AI分析', bi: 'AI Analysis AI分析' },
  'report.subtitle': { en: 'AI-powered reports & insights', zh: 'AI驱动的报告与洞察分析', bi: 'AI-powered reports & insights · AI驱动的报告与洞察分析' },
  'report.overallComment': { en: 'Overall Comment', zh: '总体评价', bi: 'Overall Comment 总体评价' },
  'report.pupilReflection': { en: 'Pupil Reflection', zh: '学生自我反思', bi: '💭 Pupil Reflection' },
  'report.nextSteps': { en: 'Next Steps', zh: '下一步', bi: '→ Next Steps' },
  'report.subjects': { en: 'Subject Reports', zh: '各科报告', bi: 'Subject Reports 各科报告' },
  'report.teacherComment': { en: 'Teacher Comment', zh: '教师评语', bi: 'Teacher Comment 教师评语' },
  'report.autoAnalysis': { en: 'Auto Analysis', zh: '自动分析', bi: 'Auto Analysis 自动分析' },

  // Learning Action Page
  'action.title': { en: 'Actions', zh: '学习行动', bi: 'Actions 学习行动' },
  'action.subtitle': { en: 'Action plans, goals, and family conversation tools', zh: '行动计划、目标与家庭对话工具', bi: 'Action plans, goals, and family conversation tools · 行动计划、目标与家庭对话工具' },
  'action.parentSummary': { en: 'Parent Summary', zh: '家长版摘要', bi: 'Parent Summary 家长版摘要' },
  'action.parentSummary.sub': { en: 'Quick overview of this term', zh: '便于快速了解孩子本学期整体状况', bi: '便于快速了解孩子本学期整体状况' },
  'action.childSummary': { en: 'For {name}', zh: '孩子版摘要', bi: 'For {name} 孩子版摘要' },
  'action.childSummary.sub': { en: 'In a way your child can understand', zh: '用孩子能理解的方式呈现', bi: '用孩子能理解的方式呈现' },
  'action.overall': { en: 'Overall', zh: '总体', bi: '📝 Overall 总体' },
  'action.strengths': { en: 'Strengths', zh: '优势学科', bi: '✅ Strengths 优势学科' },
  'action.areasToWatch': { en: 'Areas to Watch', zh: '关注区域', bi: '⚠️ Areas to Watch 关注区域' },
  'action.focusActions': { en: 'Focus Actions', zh: '聚焦行动', bi: '🏠 Focus Actions 聚焦 1-2 个行动' },
  'action.strengthInvestment': { en: 'Strength Investment', zh: '优势投入方向', bi: '💎 Strength Investment 优势投入方向' },
  'action.termGoals': { en: 'Term Goals', zh: '学期目标', bi: 'Term Goals 学期目标' },
  'action.termGoals.sub': { en: '3 goals per term per child', zh: '每学期每个孩子3个目标', bi: '3 goals per term per child · 每学期每个孩子 3 个目标' },
  'action.doingGreat': { en: "You're doing great at", zh: '你做得很好的地方', bi: "You're doing great at 你做得很好的地方" },
  'action.teacherNoticed': { en: 'Progress your teachers noticed', zh: 'Teacher特别看到的进步', bi: 'Teacher特别看到的进步 Progress your teachers noticed' },
  'action.oneBetter': { en: 'One thing to make even better', zh: '可以更好的一个地方', bi: 'One thing to make even better 可以更好的一个地方' },
  'action.chooseGoal': { en: "Next term, let's choose a goal together", zh: '下学期一起选一个目标', bi: "Next term, let's choose a goal together 下学期一起选一个目标" },
  'action.conversation': { en: 'Family Conversation Guide', zh: '家庭对话引导', bi: 'Family Conversation Guide 家庭对话引导' },
  'action.conversation.sub': { en: 'Suggested dialogue flow for your family learning session', zh: '家庭学习会对话建议', bi: 'Suggested dialogue flow for your family learning session · 家庭学习会对话建议' },

  // Upload Page
  'upload.title': { en: 'Upload Data', zh: '数据上传', bi: 'Upload Data 数据上传' },
  'upload.subtitle': { en: 'Upload school reports and learning evidence', zh: '上传学校报告与学习证据', bi: 'Upload school reports and learning evidence · 上传学校报告与学习证据' },
  'upload.chooseType': { en: 'Choose Data Type', zh: '选择数据类型', bi: 'Choose Data Type 选择数据类型' },
  'upload.recent': { en: 'Recent Uploads', zh: '最近上传', bi: 'Recent Uploads 最近上传' },
  'upload.autoCategorised': { en: 'Auto-categorised', zh: '已自动分类', bi: 'Auto-categorised 已自动分类' },
  'upload.report': { en: 'Term Report', zh: '学期报告 PDF', bi: 'Term Report' },
  'upload.report.desc': { en: 'Term report PDF', zh: '学期报告 PDF', bi: '学期报告 PDF' },
  'upload.exam': { en: 'Exam / Quiz', zh: '考试/测验成绩', bi: 'Exam / Quiz' },
  'upload.exam.desc': { en: 'Exam or quiz results', zh: '考试/测验成绩', bi: '考试/测验成绩' },
  'upload.teacherMsg': { en: 'Teacher Message', zh: '教师沟通', bi: 'Teacher Message' },
  'upload.teacherMsg.desc': { en: 'Teacher emails', zh: '教师邮件/校方沟通', bi: '教师邮件/校方沟通' },
  'upload.seesaw': { en: 'SeeSaw Record', zh: 'SeeSaw 作业记录', bi: 'SeeSaw Record' },
  'upload.seesaw.desc': { en: 'SeeSaw assignments', zh: 'SeeSaw 作业记录', bi: 'SeeSaw 作业记录' },
  'upload.parentNote': { en: 'Parent Note', zh: '家长观察记录', bi: 'Parent Note' },
  'upload.parentNote.desc': { en: 'Parent observations', zh: '家长观察记录', bi: '家长观察记录' },
  'upload.reflection': { en: 'Weekly Reflection', zh: '每周反思', bi: 'Weekly Reflection' },
  'upload.reflection.desc': { en: 'Weekly child reflection', zh: '每周孩子反思', bi: '每周孩子反思' },
  'upload.reflectionTitle': { en: 'Weekly Child Reflection', zh: '每周孩子反思', bi: 'Weekly Child Reflection 每周孩子反思' },
  'upload.reflectionSub': { en: 'Just 3 simple questions', zh: '只需3个简单问题', bi: 'Just 3 simple questions · 只需 3 个简单问题' },
  'upload.q1': { en: 'What was a small learning win this week?', zh: '这周你有什么学习小成就？', bi: '这周你有什么学习小成就？What was a small learning win this week?' },
  'upload.q2': { en: 'Where did you feel it was a bit hard?', zh: '哪个地方你觉得有点难？', bi: '哪个地方你觉得有点难？Where did you feel it was a bit hard?' },
  'upload.q3': { en: "What's one thing you could do better?", zh: '你觉得可以做得更好的一个地方是什么？', bi: '你觉得可以做得更好的一个地方是什么？What\'s one thing you could do better?' },
  'upload.save': { en: 'Save Reflection', zh: '保存反思', bi: 'Save Reflection 保存反思' },

  // Language toggle
  'lang.label': { en: 'Language', zh: '语言', bi: '语言 Language' },
};
