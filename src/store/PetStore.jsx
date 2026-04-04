import { createContext, useContext, useReducer, useEffect } from 'react';

const PET_KEY = 'familyDashboardPet';

// ─── Mood / Level config ────────────────────────────────────
const B = import.meta.env.BASE_URL;
const MOODS = {
  awesome: { emoji: '🤩', label: { en: 'Awesome', zh: '精彩' }, video: B + 'Pet-1-Awesome.mp4' },
  happy:   { emoji: '😊', label: { en: 'Happy', zh: '开心' }, video: B + 'Pet-1-happy.mp4' },
  calm:    { emoji: '😌', label: { en: 'Calm', zh: '平静' }, video: B + 'Pet-1-calm.mp4' },
  low:     { emoji: '😔', label: { en: 'Low', zh: '失落' }, video: B + 'Pet-1-Disappointed.mp4' },
};

const LEVELS = [
  { level: 1, name: { en: 'Newborn', zh: '新生' }, xpNeeded: 0, image: B + 'Pet-1.png' },
  { level: 2, name: { en: 'Getting Familiar', zh: '熟悉家庭' }, xpNeeded: 30, image: B + 'Pet-1-growup-1.png' },
  { level: 3, name: { en: 'Companion', zh: '开始陪伴' }, xpNeeded: 80, image: B + 'Pet-1-growup-2.png' },
  { level: 4, name: { en: 'Understands You', zh: '更懂你们' }, xpNeeded: 160, image: B + 'Pet-1-growup-3.png' },
  { level: 5, name: { en: 'Family Buddy', zh: '家庭小伙伴' }, xpNeeded: 300, image: B + 'Pet-1-growup-3.png' },
];

// ─── Messages per mood ──────────────────────────────────────
const MESSAGES = {
  awesome: {
    en: [
      "Your family rhythm is amazing this week! Hachi is thrilled!",
      "Everyone's on track and engaged. Hachi couldn't be happier!",
      "What a great week! Keep this energy going!",
      "Learning AND moving — your family is unstoppable! Hachi is so proud!",
      "Books read, goals crushed, bodies moving — the perfect combo!",
    ],
    zh: [
      "你们家这周节奏太棒了！小哈超开心！",
      "每个人都在推进目标。小哈为你们骄傲！",
      "这周真精彩！保持这股劲头！",
      "学习+运动全面开花！小哈为你们骄傲！",
      "读书、目标、运动——完美组合！",
    ],
  },
  happy: {
    en: [
      "Things are going well. Hachi feels the good vibes!",
      "Nice progress this week. One more small goal would make Hachi even happier!",
      "Your family is on a good track. Hachi approves! 👍",
      "The family streak is alive! Keep moving together!",
      "Great exercise energy today! Hachi loves the teamwork!",
    ],
    zh: [
      "小哈感觉还不错，你们家氛围很好~",
      "这周进步不错，再完成一个小目标会更开心！",
      "你们家在正确的轨道上。小哈点赞！👍",
      "家庭连续打卡中！一起动起来！",
      "今天运动氛围不错！小哈喜欢这种团队精神！",
    ],
  },
  calm: {
    en: [
      "Hachi is calm today. A steady pace is just fine.",
      "Things have been quiet. Maybe a quick check-in tonight?",
      "Not every week needs to be perfect. Being present matters most.",
      "A short walk or stretch could lift the whole family's energy!",
      "Even 10 minutes of movement together counts. Start small!",
    ],
    zh: [
      "小哈今天很平静，稳步前进就好。",
      "这两天有点安静，今晚花5分钟聊聊？",
      "不是每周都要完美。你们在一起就很好。",
      "一起散散步或做做拉伸，全家的能量都会提升！",
      "哪怕一起运动10分钟也算。从小开始！",
    ],
  },
  low: {
    en: [
      "Hachi is a bit quiet lately. Just one small record today would help!",
      "It's been a while. Don't worry — start with one tiny step.",
      "Hachi misses the family energy. Even a short check-in counts!",
      "No exercise or learning updates in a while. Hachi is waiting for you!",
      "A quick jog or a few pages — anything counts to get back on track!",
    ],
    zh: [
      "小哈最近有点安静。今天补一条记录就够了！",
      "好久没更新了。别着急，从一小步开始。",
      "小哈想念家庭的活力。哪怕简短聊聊也算！",
      "好久没有学习或运动记录了。小哈在等你们！",
      "跑跑步或看看书——什么都行，小哈想你们了！",
    ],
  },
};

const GREETINGS = {
  en: [
    "Who in your family deserves a shout-out today?",
    "You're doing great. Don't chase perfection — chase connection.",
    "5 minutes of chatting tonight might be better than 1 hour of pushing.",
    "What made someone in your family smile today?",
    "Remember: small steps every day make big dreams come true! 🐾",
    "Have you closed your exercise rings today? 💪",
    "A family that moves together grows together! 🏃",
    "Which sport will your family try this weekend?",
  ],
  zh: [
    "今天你们家谁最值得被看见一下？",
    "你们已经做得不错了，别急着要求完美。",
    "今晚花5分钟聊聊，也许比催一次更有效。",
    "今天你们家谁笑了？",
    "记住：每天一小步，大梦想就能成真！🐾",
    "今天的运动三环关闭了吗？💪",
    "一起运动的家庭，一起成长！🏃",
    "这个周末你们家打算试试什么运动？",
  ],
};

// ─── Calculate mood from family data (50% learning + 50% exercise) ─────────
//
// LEARNING SCORE (0–5):
//   +1  record uploaded (term report / exam quiz / newsletter / homework) in 3 days
//   +1  child reflection in 3 days
//   +2  family interaction (parent note / weekly reflection) in 3 days
//   +1  goal progress (goals on-track or achieved)
//   -1  1 day no update
//   -2  2+ consecutive days no update
//   -1  high conflict without repair
//
// EXERCISE SCORE (0–5):
//   +2  family streak active (streak.current > 0)
//   +1  per child checked in today (max +2)
//   +1  any adult checked in today
//   -1  no exercise records in 2 days
//   -2  no exercise records in 3+ days
//
// COMBINED = (learningScore + exerciseScore) / 2
//   >=4.5 → awesome 🤩
//   >=3.5 → happy 😊
//   >=2.5 → calm 😌
//   <2.5  → low 😔

export function calculateLearningScore(children) {
  let score = 0;
  const now = Date.now();
  const day = 86400000;
  const threeDays = 3 * day;

  children.forEach(child => {
    const records = [
      ...(child.exams || []),
      ...(child.newsletters || []),
      ...(child.homework || []),
    ];
    const reflections = child.reflections || [];
    const familyDocs = [
      ...(child.parentNotes || []),
      ...reflections,
    ];

    const getTime = (d) => {
      const t = d.uploadDate || d.date;
      return t ? new Date(t).getTime() : 0;
    };

    const recentRecords = records.filter(d => (now - getTime(d)) < threeDays);
    if (recentRecords.length > 0) score += 1;

    const recentReflections = reflections.filter(d => (now - getTime(d)) < threeDays);
    if (recentReflections.length > 0) score += 1;

    const recentFamily = familyDocs.filter(d => (now - getTime(d)) < threeDays);
    if (recentFamily.length > 0) score += 2;

    const goals = child.goals || [];
    const advancing = goals.filter(g => g.status === 'on-track' || g.status === 'achieved').length;
    if (advancing > 0) score += 1;

    const allDocs = [...records, ...familyDocs];
    const allTimes = allDocs.map(getTime).filter(t => t > 0);
    if (allTimes.length > 0) {
      const lastUpdate = Math.max(...allTimes);
      const daysSince = (now - lastUpdate) / day;
      if (daysSince >= 2) score -= 2;
      else if (daysSince >= 1) score -= 1;
    } else {
      score -= 1;
    }

    const highWarnings = (child.warnings || []).filter(w => w.severity === 'high').length;
    if (highWarnings >= 2 && recentFamily.length === 0) score -= 1;
  });

  // Clamp to 0–5
  return Math.max(0, Math.min(5, score));
}

export function calculateExerciseScore(exerciseData) {
  if (!exerciseData) return 0;
  let score = 0;

  const { streak, memberRings, recentRecords } = exerciseData;

  // +2 family streak active
  if (streak?.current > 0) score += 2;

  // +1 per child checked in today (max +2), +1 adult checked in
  if (memberRings) {
    const CHILDREN = ['michael', 'lucas'];
    const ADULTS = ['fay', 'david'];
    let childCheckins = 0;
    let adultCheckin = false;

    for (const [id, rings] of Object.entries(memberRings)) {
      if (rings.restDay) continue;
      const checkedIn = (rings.ring1_pct || 0) >= 1; // Ring 1 = ≥30 min check-in
      if (CHILDREN.includes(id) && checkedIn) childCheckins++;
      if (ADULTS.includes(id) && checkedIn) adultCheckin = true;
    }
    score += Math.min(childCheckins, 2);
    if (adultCheckin) score += 1;
  }

  // Penalty: no recent exercise records
  if (recentRecords && recentRecords.length > 0) {
    // Recent records exist — no penalty
  } else {
    // No records today; check streak for multi-day inactivity signal
    if (!streak || streak.current === 0) {
      const lastDate = streak?.last_valid_date;
      if (lastDate) {
        const daysSince = (Date.now() - new Date(lastDate).getTime()) / 86400000;
        if (daysSince >= 3) score -= 2;
        else if (daysSince >= 2) score -= 1;
      } else {
        score -= 1; // No exercise history at all
      }
    }
  }

  // Clamp to 0–5
  return Math.max(0, Math.min(5, score));
}

export function calculateMood(children, exerciseData) {
  const learningScore = calculateLearningScore(children);
  const exerciseScore = calculateExerciseScore(exerciseData);

  // 50/50 weighted average
  const combined = (learningScore + exerciseScore) / 2;

  if (combined >= 4.5) return 'awesome';
  if (combined >= 3.5) return 'happy';
  if (combined >= 2.5) return 'calm';
  return 'low';
}

// ─── Exercise XP Rewards ────────────────────────────────────
// Call this when exercise data updates to grant XP for new achievements
export function calculateExerciseXP(exerciseData) {
  if (!exerciseData?.memberRings) return 0;
  let xp = 0;

  for (const [, rings] of Object.entries(exerciseData.memberRings)) {
    if (rings.restDay) continue;
    if ((rings.ring1_pct || 0) >= 1) xp += 3;  // Ring 1 complete: +3 XP
    if ((rings.ring2_pct || 0) >= 1) xp += 5;  // Ring 2 complete: +5 XP
    if ((rings.ring3_pct || 0) >= 1) xp += 8;  // Ring 3 complete: +8 XP
  }

  // Streak milestone bonus: every 7 days
  const streakDays = exerciseData.streak?.current || 0;
  if (streakDays > 0 && streakDays % 7 === 0) xp += 15;

  return xp;
}

// ─── Initial State ──────────────────────────────────────────
function loadState() {
  try {
    const stored = localStorage.getItem(PET_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return {
    name: 'Hachi',
    nameZh: '小哈',
    xp: 0,
    mood: 'calm',
    lastInteraction: null,
    streak: 0,
    greetCount: 0,
  };
}

// ─── Reducer ────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_XP': {
      const newXp = state.xp + (action.payload || 0);
      return { ...state, xp: newXp, lastInteraction: Date.now() };
    }
    case 'SET_MOOD':
      return { ...state, mood: action.payload };
    case 'GREET':
      return { ...state, greetCount: state.greetCount + 1, lastInteraction: Date.now() };
    case 'FEED':
      return { ...state, xp: state.xp + 3, lastInteraction: Date.now() };
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────
const PetContext = createContext(null);

export function PetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    try { localStorage.setItem(PET_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  return (
    <PetContext.Provider value={{ pet: state, dispatch }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  return useContext(PetContext);
}

// ─── Exports ────────────────────────────────────────────────
export function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpNeeded) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp) {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].xpNeeded) return LEVELS[i];
  }
  return LEVELS[LEVELS.length - 1];
}

export function getMoodConfig(mood) {
  return MOODS[mood] || MOODS.calm;
}

export function getMessage(mood, lang) {
  const msgs = MESSAGES[mood]?.[lang] || MESSAGES[mood]?.en || MESSAGES.calm.en;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export function getGreeting(lang) {
  const msgs = GREETINGS[lang] || GREETINGS.en;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export { MOODS, LEVELS };
