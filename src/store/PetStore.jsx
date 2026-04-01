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
    ],
    zh: [
      "你们家这周节奏太棒了！小哈超开心！",
      "每个人都在推进目标。小哈为你们骄傲！",
      "这周真精彩！保持这股劲头！",
    ],
  },
  happy: {
    en: [
      "Things are going well. Hachi feels the good vibes!",
      "Nice progress this week. One more small goal would make Hachi even happier!",
      "Your family is on a good track. Hachi approves! 👍",
    ],
    zh: [
      "小哈感觉还不错，你们家氛围很好~",
      "这周进步不错，再完成一个小目标会更开心！",
      "你们家在正确的轨道上。小哈点赞！👍",
    ],
  },
  calm: {
    en: [
      "Hachi is calm today. A steady pace is just fine.",
      "Things have been quiet. Maybe a quick check-in tonight?",
      "Not every week needs to be perfect. Being present matters most.",
    ],
    zh: [
      "小哈今天很平静，稳步前进就好。",
      "这两天有点安静，今晚花5分钟聊聊？",
      "不是每周都要完美。你们在一起就很好。",
    ],
  },
  low: {
    en: [
      "Hachi is a bit quiet lately. Just one small record today would help!",
      "It's been a while. Don't worry — start with one tiny step.",
      "Hachi misses the family energy. Even a short check-in counts!",
    ],
    zh: [
      "小哈最近有点安静。今天补一条记录就够了！",
      "好久没更新了。别着急，从一小步开始。",
      "小哈想念家庭的活力。哪怕简短聊聊也算！",
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
  ],
  zh: [
    "今天你们家谁最值得被看见一下？",
    "你们已经做得不错了，别急着要求完美。",
    "今晚花5分钟聊聊，也许比催一次更有效。",
    "今天你们家谁笑了？",
    "记住：每天一小步，大梦想就能成真！🐾",
  ],
};

// ─── Calculate mood from family data (3-day window) ─────────
// Rules:
//   +1  record uploaded (term report / exam quiz / newsletter / homework)
//   +1  child reflection (weekly child reflection)
//   +2  family interaction (parent note / weekly reflection)
//   +1  goal progress (goals on-track or achieved)
//   -1  1 day no update
//   -2  2+ consecutive days no update
//   -1  high conflict without repair (warnings with no recent positive action)
//
// Result: >=4 → happy, 1-3 → calm, <=0 → low (disappointed)

export function calculateMood(children) {
  let score = 0;
  const now = Date.now();
  const day = 86400000;
  const threeDays = 3 * day;

  children.forEach(child => {
    // --- Collect all timestamped documents ---
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

    // +1 record uploaded in last 3 days (term report / exam / newsletter / homework)
    const recentRecords = records.filter(d => (now - getTime(d)) < threeDays);
    if (recentRecords.length > 0) score += 1;

    // +1 child reflection in last 3 days
    const recentReflections = reflections.filter(d => (now - getTime(d)) < threeDays);
    if (recentReflections.length > 0) score += 1;

    // +2 family interaction in last 3 days (parent note / reflection)
    const recentFamily = familyDocs.filter(d => (now - getTime(d)) < threeDays);
    if (recentFamily.length > 0) score += 2;

    // +1 goal progress (any goal on-track or achieved)
    const goals = child.goals || [];
    const advancing = goals.filter(g => g.status === 'on-track' || g.status === 'achieved').length;
    if (advancing > 0) score += 1;

    // --- Penalty: days without any update ---
    const allDocs = [...records, ...familyDocs];
    const allTimes = allDocs.map(getTime).filter(t => t > 0);
    if (allTimes.length > 0) {
      const lastUpdate = Math.max(...allTimes);
      const daysSince = (now - lastUpdate) / day;
      if (daysSince >= 2) score -= 2;      // 2+ days no update
      else if (daysSince >= 1) score -= 1;  // 1 day no update
    } else {
      // No records at all — slight penalty
      score -= 1;
    }

    // -1 high conflict without repair (high-severity warnings with no recent positive docs)
    const highWarnings = (child.warnings || []).filter(w => w.severity === 'high').length;
    if (highWarnings >= 2 && recentFamily.length === 0) score -= 1;
  });

  // Result mapping
  if (score >= 4) return 'happy';
  if (score >= 1) return 'calm';
  return 'low';
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
