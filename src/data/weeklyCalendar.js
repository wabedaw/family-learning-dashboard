// Extracted from Brighton College Newsletter T2W24 - 19 March 2026
// Dates for Your Diary + Important Notices
// Each event tagged with relevance to Michael (Y8 Senior), Lucas (Y6 Junior), Parents

export const schoolCalendar = [
  // March 2026
  { date: '2026-03-20', day: 'Fri', event: 'Public Holiday - Hari Raya Puasa', eventZh: '公共假期 - 开斋节', category: 'holiday', relevance: ['michael', 'lucas', 'parents'], priority: 'high' },
  { date: '2026-03-24', day: 'Tue', endDate: '2026-03-27', event: 'Year 6 Trip to Tioman Island', eventZh: 'Year 6 Tioman岛之旅', category: 'trip', relevance: ['lucas'], priority: 'high' },
  { date: '2026-03-24', day: 'Tue', event: 'House Meetings - Pupils to wear House shirts', eventZh: 'House聚会 - 学生穿House衬衫', category: 'school', relevance: ['michael', 'lucas'], priority: 'medium' },
  { date: '2026-03-27', day: 'Fri', event: 'Brighton Society Cinema Night, 6:30-8:00pm', eventZh: 'Brighton 电影之夜, 6:30-8:00pm', category: 'event', relevance: ['parents'], priority: 'medium' },

  // April 2026
  { date: '2026-04-01', day: 'Wed', event: 'Year 8 Trip to Jurong Science Centre (Night Sky + Space)', eventZh: 'Year 8 裕廊科学中心之旅（夜空+太空）', category: 'trip', relevance: ['michael'], priority: 'high' },
  { date: '2026-04-02', day: 'Thu', event: 'EYFS & KS1 Easter Bonnet Parade - Parents invited', eventZh: 'EYFS & KS1 复活节帽子游行 - 邀请家长参加', category: 'event', relevance: ['parents'], priority: 'low' },
  { date: '2026-04-22', day: 'Wed', event: 'Junior Prep Dress Up Day (Earth Day)', eventZh: 'Junior Prep 变装日（地球日）', category: 'school', relevance: ['lucas'], priority: 'medium' },
  { date: '2026-04-27', day: 'Mon', event: 'Year 9 & 10 Sungeh Buloh / Pulau Ubin Trip', eventZh: 'Year 9 & 10 双溪布洛/乌敏岛之旅', category: 'trip', relevance: [], priority: 'low' },
  { date: '2026-04-27', day: 'Mon', event: '5JS International Dance Day Class Assembly', eventZh: '5JS 国际舞蹈日班级集会', category: 'school', relevance: [], priority: 'low' },
  { date: '2026-04-28', day: 'Tue', event: 'Pre-Nursery Stay and Play, 8:25-9:25am - Parents invited', eventZh: '幼儿园开放日, 8:25-9:25am - 邀请家长', category: 'event', relevance: ['parents'], priority: 'low' },
  { date: '2026-04-28', day: 'Tue', endDate: '2026-04-30', event: 'Year 5 Residential Trip to Batam', eventZh: 'Year 5 巴淡岛住宿旅行', category: 'trip', relevance: [], priority: 'low' },
  { date: '2026-04-29', day: 'Wed', event: 'Theatre Trip BFG', eventZh: 'BFG 剧场之旅', category: 'event', relevance: ['lucas'], priority: 'medium' },

  // May 2026
  { date: '2026-05-01', day: 'Fri', endDate: '2026-05-05', event: 'U11 - FOBISIA Games', eventZh: 'U11 FOBISIA运动会', category: 'sport', relevance: [], priority: 'low' },
  { date: '2026-05-04', day: 'Mon', event: '4JH Class Assembly, 8:50-9:10am', eventZh: '4JH班级集会, 8:50-9:10am', category: 'school', relevance: [], priority: 'low' },
  { date: '2026-05-07', day: 'Thu', event: 'Reception Stay and Play', eventZh: 'Reception 开放日', category: 'event', relevance: [], priority: 'low' },
  { date: '2026-05-08', day: 'Fri', event: 'Nursery Stay and Play, 8:25-9:25am - Parents invited', eventZh: '幼儿园开放日 - 邀请家长', category: 'event', relevance: ['parents'], priority: 'low' },
  { date: '2026-05-19', day: 'Tue', endDate: '2026-05-20', event: 'LAMDA Showcase, 4:45-5:45pm', eventZh: 'LAMDA 展示, 4:45-5:45pm', category: 'event', relevance: ['lucas', 'parents'], priority: 'high' },
  { date: '2026-05-25', day: 'Mon', endDate: '2026-05-26', event: 'Year 3 Residential Trip to Night Safari', eventZh: 'Year 3 夜间动物园住宿旅行', category: 'trip', relevance: [], priority: 'low' },

  // June 2026
  { date: '2026-06-02', day: 'Tue', event: 'Say Something Nice Day', eventZh: '说好话日', category: 'school', relevance: ['michael', 'lucas'], priority: 'low' },
  { date: '2026-06-17', day: 'Wed', event: 'Prep Art Exhibition, Ocean Room', eventZh: 'Prep 美术展览, Ocean Room', category: 'event', relevance: ['lucas', 'parents'], priority: 'high' },

  // July 2026
  { date: '2026-07-03', day: 'Fri', event: 'Last Day of Term 3', eventZh: '第三学期最后一天', category: 'holiday', relevance: ['michael', 'lucas', 'parents'], priority: 'high' },
];

// Get upcoming events (next N days from today)
export function getUpcomingEvents(days = 14) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() + days);

  return schoolCalendar.filter(e => {
    const d = new Date(e.date);
    return d >= today && d <= cutoff;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get events relevant to a specific child
export function getChildEvents(childId, days = 60) {
  return getUpcomingEvents(days).filter(e =>
    e.relevance.includes(childId) || e.relevance.includes('parents')
  );
}

// Get this week's events
export function getThisWeekEvents() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return schoolCalendar.filter(e => {
    const d = new Date(e.date);
    return d >= monday && d <= sunday;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Newsletter summary
export const newsletterSummary = {
  week: 'Term 2, Week 24',
  date: '19 March 2026',
  highlights: {
    en: [
      'Neurodiversity Week celebrated across the College',
      'Brighton College named in Spear\'s Schools Index Top 100',
      'Year 6 Tioman trip next week',
      'Year 8 Jurong Science Centre trip on Apr 1',
      'LAMDA Showcase in May — Lucas participated in LAMDA in Y5',
      'Prep Art Exhibition in June — great for Lucas (Art is Above!)',
    ],
    zh: [
      '全校庆祝神经多样性周',
      'Brighton College 入选 Spear\'s 全球百强学校',
      'Year 6 下周 Tioman 岛之旅',
      'Year 8 裕廊科学中心之旅 (4月1日)',
      '五月 LAMDA 展示 — Lucas 在Y5参加过LAMDA',
      '六月 Prep 美术展 — 对Lucas很棒（Art是Above！）',
    ],
  },
};
