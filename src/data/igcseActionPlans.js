// Deep analysis of 4-term report data + IGCSE standards from Brighton College Guide
// Personalized action plans for Michael (Y8) and Lucas (Y6)

export const igcseActionPlans = {
  michael: {
    overview: {
      en: "Michael is in Year 8 — one year before IGCSE subject choices. His 4-term data shows a clear pattern: he thrives in hands-on, practical subjects (Science, DT, Dance, Drama, Music) with excellent effort scores, but struggles with language-heavy and homework-dependent subjects. Y8T1 saw a significant regression with 6 subjects at Below. The key priority is rebuilding core foundations while leveraging his genuine strengths.",
      zh: "Michael 目前在 Year 8 — 距离 IGCSE 选课还有一年。4个学期的数据显示一个清晰的模式：他在动手实践类科目（科学、DT、舞蹈、戏剧、音乐）表现出色，但在需要语言能力和作业管理的科目中挣扎。Y8T1 出现了明显退步（6科 Below）。当前重点是重建核心基础，同时利用他的真正优势。"
    },
    roadmap: [
      { period: { en: 'Now (Y8T2)', zh: '现在 (Y8T2)' }, focus: { en: 'Emergency recovery: English + Maths + homework habits', zh: '紧急恢复：英语+数学+作业习惯' }, color: 'bg-coral' },
      { period: { en: 'Y8 T3', zh: 'Y8 第三学期' }, focus: { en: 'Consolidate KS3, explore IGCSE options', zh: '巩固KS3基础，探索IGCSE选课' }, color: 'bg-mustard' },
      { period: { en: 'Summer 2026', zh: '2026暑假' }, focus: { en: 'Science project + subject taster', zh: '科学项目+学科体验' }, color: 'bg-teal' },
      { period: { en: 'Year 9', zh: 'Year 9' }, focus: { en: 'IGCSE begins: choose 10 subjects', zh: 'IGCSE开始：选10门课' }, color: 'bg-navy' },
    ],
    priorities: [
      {
        category: 'critical',
        emoji: '🚨',
        labelEn: 'Critical Priority — Must Fix Now',
        labelZh: '关键优先 — 必须立即改善',
        subjects: [
          {
            name: 'English',
            attainment: 'Below',
            trend: 'Below→Meeting→Meeting→Below (unstable)',
            trendEmoji: '📉',
            igcseTarget: 'IGCSE First Language English (CIE)',
            analysis: {
              en: "Your English went up to Meeting in Y7 but dropped back to Below in Y8. You exited the ELS programme which was amazing! But your reading age is still a bit below your actual age. The good news: your teachers say you're creative and imaginative when you write. The issue is homework consistency and organisation.",
              zh: "你的英语在Y7提升到了Meeting，但Y8又回到了Below。你成功退出了ELS语言支持项目，这非常棒！但你的阅读年龄还略低于实际年龄。好消息是：老师说你写作时很有创意和想象力。问题在于作业的一致性和组织能力。"
            },
            actions: [
              { en: 'Read for 20 minutes every day — any book you enjoy (BBC Bitesize has great options)', zh: '每天阅读20分钟 — 任何你喜欢的书（BBC Bitesize有很好的选择）' },
              { en: 'Write 2 PEEL paragraphs per week on topics you like (Science topics count!)', zh: '每周写2个PEEL段落，写你感兴趣的话题（科学话题也可以！）' },
              { en: 'Use Grammarly to check your writing for tense and paragraphing', zh: '使用Grammarly检查写作中的时态和分段' },
              { en: 'Always hand homework in on time — set a phone reminder if needed', zh: '作业一定要按时交 — 需要的话设手机提醒' },
            ],
            igcseSkills: ['PEEL paragraphs', 'Reading comprehension & inference', 'Creative writing', 'Grammar accuracy'],
          },
          {
            name: 'Mathematics',
            attainment: 'Below',
            trend: 'Meeting→Meeting→Above→Below (big drop!)',
            trendEmoji: '📉',
            igcseTarget: 'IGCSE Mathematics (CIE)',
            analysis: {
              en: "This is the most surprising drop — you were ABOVE in Y7T3! You clearly have the ability. Your teacher says you understand basic equations and area/perimeter. The problem might be focus and homework quality. Let's get you back to where you were.",
              zh: "这是最令人惊讶的下降 — 你在Y7T3曾经是Above！你显然有能力。老师说你理解基本方程和面积/周长。问题可能是专注力和作业质量。让我们帮你回到原来的水平。"
            },
            actions: [
              { en: 'Do 2 maths puzzle sessions per week using CGP KS3 Workbook or Khan Academy', zh: '每周做2次数学练习，使用CGP KS3 Workbook或Khan Academy' },
              { en: 'Start with simpler problems to rebuild confidence, then work up', zh: '从简单题目开始重建信心，然后逐步提高难度' },
              { en: 'Make a personal Maths glossary (your teacher suggested this!)', zh: '制作个人数学词汇表（这是老师的建议！）' },
              { en: 'Review mistakes after every assessment — understand WHY you got it wrong', zh: '每次测验后复习错题 — 理解为什么错了' },
            ],
            igcseSkills: ['Algebra & equations', 'Geometry & angles', 'Data handling & graphs', 'Problem-solving strategies'],
          },
        ]
      },
      {
        category: 'important',
        emoji: '⚡',
        labelEn: 'Important — Build Better Habits',
        labelZh: '重要 — 建立好习惯',
        subjects: [
          {
            name: 'Homework & Organisation',
            attainment: 'Grade 3 across multiple subjects',
            trend: 'Persistent issue across all 4 terms',
            trendEmoji: '🔄',
            igcseTarget: 'Essential for ALL IGCSE subjects',
            analysis: {
              en: "This is the thread connecting all your Below grades. Every teacher mentions homework or organisation. Your Mac issues are fixed now, so there's no barrier. IGCSE will require MUCH more independent study — we need to build this habit NOW.",
              zh: "这是所有Below成绩的共同原因。每个老师都提到了作业或组织问题。你的Mac问题已经解决了，所以没有障碍了。IGCSE需要更多独立学习能力 — 我们现在就要建立这个习惯。"
            },
            actions: [
              { en: 'Evening routine: check planner → pack bag → review homework (15 min)', zh: '晚间例程：检查计划表→整理书包→检查作业（15分钟）' },
              { en: 'Parents check planner 3 times per week (Monday, Wednesday, Friday)', zh: '父母每周检查3次计划表（周一、三、五）' },
              { en: 'Use a colour-coded homework tracker on your wall', zh: '在墙上使用彩色作业追踪表' },
              { en: 'Reward system: earn points for on-time submissions (family star system)', zh: '奖励系统：按时交作业获得积分（家庭星星系统）' },
            ],
            igcseSkills: ['Time management', 'Independent study', 'Self-discipline', 'Task completion'],
          },
          {
            name: 'French & Spanish',
            attainment: 'Below / Below',
            trend: 'Consistently Below or Meeting with low effort',
            trendEmoji: '➡️',
            igcseTarget: 'IGCSE MFL (Pearson Edexcel)',
            analysis: {
              en: "Languages are tough for you right now. Your teacher says you can understand texts WITH resources but struggle WITHOUT them. The key is memorisation — you need to learn vocabulary by heart. Even 10 minutes a day of flashcards would make a big difference.",
              zh: "语言对你来说现在比较困难。老师说你有资源辅助时能理解课文，但没有时就困难了。关键是记忆 — 你需要背诵词汇。每天哪怕只有10分钟的抽认卡练习也会有很大不同。"
            },
            actions: [
              { en: '10 minutes daily: Quizlet or Anki flashcards for French & Spanish', zh: '每天10分钟：使用Quizlet或Anki背法语和西班牙语词汇' },
              { en: 'Learn 10 new words per week — test yourself on Friday', zh: '每周学10个新单词 — 周五自测' },
              { en: 'Memorise key opinion phrases and reasons (your teacher specifically asked for this)', zh: '背诵关键观点短语和理由（这是老师特别要求的）' },
              { en: 'Watch short videos in French/Spanish with subtitles for fun', zh: '看带字幕的法语/西班牙语短视频作为娱乐' },
            ],
            igcseSkills: ['Vocabulary recall', 'Sentence structures', 'Listening', 'Speaking confidence'],
          },
        ]
      },
      {
        category: 'strengths',
        emoji: '🌟',
        labelEn: 'Your Superpowers — Keep Investing!',
        labelZh: '你的超能力 — 继续投入！',
        subjects: [
          {
            name: 'Science & Hands-On Science',
            attainment: 'Meeting (consistently)',
            trend: 'Stable Meeting with strong effort & enthusiasm',
            trendEmoji: '⭐',
            igcseTarget: 'IGCSE Triple Science — Biology, Chemistry, Physics (CIE)',
            analysis: {
              en: "Science is YOUR subject. You're the Science Subject Ambassador! You love experiments, you ask great questions, and your teachers say you're 'fantastically enthusiastic'. You're doing Bronze CREST and planning a computation project. IGCSE Triple Science would be perfect for you.",
              zh: "科学是属于你的科目。你是科学大使！你喜欢实验，问很好的问题，老师说你'充满热情'。你正在做Bronze CREST并计划一个计算项目。IGCSE三科科学（生物+化学+物理）会非常适合你。"
            },
            actions: [
              { en: 'Continue Hands-On Science CCA and Bronze CREST', zh: '继续参加动手科学CCA和Bronze CREST' },
              { en: 'Do 1 home experiment per month (lots of ideas on FuseSchool YouTube)', zh: '每月做1个家庭实验（FuseSchool YouTube上有很多创意）' },
              { en: 'Use Kerboodle textbook to preview topics BEFORE class — your teacher recommended this', zh: '用Kerboodle教科书在课前预习 — 这是老师推荐的' },
              { en: 'Visit the Science Museum on the school trip — prepare questions!', zh: '在学校旅行时参观科学博物馆 — 准备好问题！' },
            ],
            igcseSkills: ['Scientific vocabulary', 'Experimental design', 'Data analysis', 'Structured exam answers'],
          },
          {
            name: 'Design & Technology + Creative Arts',
            attainment: 'Meeting (DT top effort 1,1)',
            trend: 'DT: Below→Meeting→Meeting→Meeting (improved!) | Dance/Drama: effort 1',
            trendEmoji: '📈',
            igcseTarget: 'IGCSE Design & Technology (CIE) / GCSE Art & Design',
            analysis: {
              en: "When you get to build, create, and perform, you come alive! Your DT went from Below to Meeting with the BEST effort scores in your whole report. Dance and Drama both have effort grade 1 — your absolute best. Your Art even hit Above in Y7T3. These subjects could be great IGCSE options for you.",
              zh: "当你能动手制作、创造和表演时，你就活力四射！你的DT从Below提升到了Meeting，努力分数是所有科目中最高的。舞蹈和戏剧的努力成绩都是1 — 你的最佳表现。你的Art甚至在Y7T3达到了Above。这些科目可能是你很好的IGCSE选课。"
            },
            actions: [
              { en: 'Keep exploring DT projects — discuss design decisions with others (your teacher\'s advice)', zh: '继续探索DT项目 — 和其他人讨论设计决策（老师的建议）' },
              { en: 'Consider which creative subjects you might want at IGCSE', zh: '考虑IGCSE你可能想选哪些创意科目' },
              { en: 'Build a mini project this term: combine Science + DT (your two strengths!)', zh: '这学期做一个小项目：结合科学+DT（你的两个强项！）' },
            ],
            igcseSkills: ['Creative problem-solving', 'Design process', 'Portfolio development', 'Performance skills'],
          },
          {
            name: 'Music',
            attainment: 'Meeting (best organisation: grade 1)',
            trend: 'Stable Meeting across all 4 terms with consistently best effort',
            trendEmoji: '⭐',
            igcseTarget: 'GCSE Music (Pearson Edexcel)',
            analysis: {
              en: "Music has your BEST organisation score (grade 1) of any subject — this shows that when you really care about something, you CAN be organised! Your teacher says you excel at practical work and performances. Think about whether GCSE Music might be for you.",
              zh: "音乐是你组织能力得分最好的科目（1分）— 这说明当你真正关心某件事时，你是可以很有条理的！老师说你在实践和表演方面很出色。想想GCSE音乐是否适合你。"
            },
            actions: [
              { en: 'Keep up your instrument practice — aim for daily sessions', zh: '坚持乐器练习 — 争取每天都练' },
              { en: 'Try sharing your ideas more in Music class discussions', zh: '在音乐课讨论中更多分享你的想法' },
            ],
            igcseSkills: ['Performing', 'Composing', 'Listening & appraising', 'Music theory (MR D FITH)'],
          },
        ]
      }
    ]
  },

  lucas: {
    overview: {
      en: "Lucas is in Year 6 — preparing for the transition to Senior School (Year 7) next year. His 4-term data shows significant growth: from Concern/Developing in Y5T1 to improved performance across most subjects. His greatest strengths are perseverance, taking feedback on board, and genuine effort in subjects he enjoys (Art, Science, Computing, Drama all have effort 1). The main challenges are English (still on ELS), Maths consistency, and organisation. The priority for Lucas is not IGCSE yet — it's building a strong foundation for Senior School.",
      zh: "Lucas 目前在 Year 6 — 明年要过渡到高中部（Year 7）。4个学期的数据显示明显成长：从Y5T1的Concern/Developing提升到了大部分科目的改善。他最大的优势是坚持力、善于接受反馈、在感兴趣的科目中付出真正的努力（Art、Science、Computing、Drama的努力成绩都是1）。主要挑战是英语（仍在ELS项目中）、数学的一致性和组织能力。Lucas现在的重点不是IGCSE — 而是为Senior School打好基础。"
    },
    roadmap: [
      { period: { en: 'Now (Y6T2)', zh: '现在 (Y6T2)' }, focus: { en: 'English & Maths catch-up + organisation habits', zh: '英语+数学追赶+组织习惯' }, color: 'bg-coral' },
      { period: { en: 'Y6 T3', zh: 'Y6 第三学期' }, focus: { en: 'Senior School readiness', zh: '高中部入学准备' }, color: 'bg-mustard' },
      { period: { en: 'Summer', zh: '暑假' }, focus: { en: 'Reading marathon + transition prep', zh: '阅读马拉松+过渡准备' }, color: 'bg-teal' },
      { period: { en: 'Year 7', zh: 'Year 7' }, focus: { en: 'Senior School: new subjects + independence', zh: '高中部：新科目+独立学习' }, color: 'bg-navy' },
    ],
    priorities: [
      {
        category: 'critical',
        emoji: '🚨',
        labelEn: 'Most Important — Let\'s Close the Gap',
        labelZh: '最重要 — 缩小差距',
        subjects: [
          {
            name: 'English (Reading & Writing)',
            attainment: 'Developing (effort 3)',
            trend: 'Concern→Secure→Developing→Developing (Reading); Developing→Developing→Developing→Developing (Writing)',
            trendEmoji: '➡️',
            igcseTarget: 'Senior School KS3 English → IGCSE English (Year 10)',
            analysis: {
              en: "Your reading went from Concern all the way up to Secure — that's amazing progress, Lucas! But in Y6 it's back to Developing, and your effort dropped to 3. Your teacher says you have a 'developing imagination' and you engaged really well with Journey to Jo'burg and Stormbreaker. Your vocabulary is approaching Year 6 level. The main things to work on: reading more, writing longer pieces, and checking your work for missing words.",
              zh: "你的阅读从Concern一路提升到了Secure — 这是了不起的进步！但Y6又回到了Developing，努力成绩降到了3。老师说你有'正在发展的想象力'，你在阅读《Journey to Jo'burg》和《Stormbreaker》时参与度很高。你的词汇量快接近Year 6水平了。主要需要改进的是：多阅读、写更长的文章、检查遗漏的词。"
            },
            actions: [
              { en: 'Read for 15 minutes every day — you liked Stormbreaker, try more Alex Rider books!', zh: '每天阅读15分钟 — 你喜欢Stormbreaker，可以试试更多Alex Rider系列！' },
              { en: 'Complete IXL (60 min/week) and Clear Fluency (60 min/week) — your ELS teacher recommends this', zh: '完成IXL（每周60分钟）和Clear Fluency（每周60分钟）— 这是ELS老师推荐的' },
              { en: 'After writing, read it back OUT LOUD to catch missing words', zh: '写完后大声朗读一遍，检查是否有遗漏的词' },
              { en: 'Practice using compound sentences — connect ideas with "because", "although", "however"', zh: '练习使用复合句 — 用"because"、"although"、"however"连接想法' },
            ],
            igcseSkills: ['Reading comprehension', 'Writing fluency', 'Vocabulary building', 'Proofreading'],
          },
          {
            name: 'Maths',
            attainment: 'Developing (effort 3)',
            trend: 'Developing→Secure→Secure→Developing (dropped!)',
            trendEmoji: '📉',
            igcseTarget: 'Senior School KS3 Maths → IGCSE Maths (Year 10)',
            analysis: {
              en: "Your Maths went up to Secure in Y5 — you were doing well! But Y6T1 it dropped back. Your teacher says you have 'high potential when you apply yourself' — that means you CAN do it, you just need to focus more. You did great on place value but the four operations were harder. Your times tables are good though, which is a great foundation!",
              zh: "你的数学在Y5提升到了Secure — 做得很好！但Y6T1又下降了。老师说你'认真时有很高的潜力' — 意味着你能做到，只是需要更专注。你在位值方面做得很好，但四则运算更有挑战性。不过你的乘法表掌握得很好，这是很好的基础！"
            },
            actions: [
              { en: 'Do 15 minutes of maths practice daily — start with what you know, then challenge yourself', zh: '每天做15分钟数学练习 — 从你会的开始，然后挑战自己' },
              { en: 'Read questions TWICE before answering — your teacher says careful reading would help a lot', zh: '做题前读题两遍 — 老师说仔细阅读会有很大帮助' },
              { en: 'When you get stuck, ASK for help right away instead of waiting', zh: '遇到困难时立刻求助，不要等待' },
              { en: 'Keep your homework consistent — even weekends!', zh: '保持作业一致性 — 周末也要做！' },
            ],
            igcseSkills: ['Four operations mastery', 'Problem-solving', 'Reading questions carefully', 'Showing working'],
          },
        ]
      },
      {
        category: 'important',
        emoji: '⚡',
        labelEn: 'Building Good Habits for Senior School',
        labelZh: '为高中部建立好习惯',
        subjects: [
          {
            name: 'Organisation & Focus',
            attainment: 'Needs improvement',
            trend: 'Improving from Y5 but dropped in Y6T1',
            trendEmoji: '🔄',
            igcseTarget: 'Essential for Senior School independence',
            analysis: {
              en: "Senior School is going to be very different — you'll have many different teachers, different classrooms, and you'll need to manage your own homework diary. Your teachers say you sometimes misplace things and miss homework deadlines. Let's build a simple daily routine NOW so it's automatic by Year 7.",
              zh: "高中部会很不一样 — 你会有很多不同的老师、不同的教室，需要自己管理作业日志。老师说你有时会丢东西、错过作业截止日期。让我们现在就建立一个简单的日常例程，这样到Year 7就自动化了。"
            },
            actions: [
              { en: 'Morning: check bag + planner (5 minutes)', zh: '早上：检查书包+计划表（5分钟）' },
              { en: 'Afternoon: pack bag for tomorrow + check homework (5 minutes)', zh: '下午：为明天准备书包+检查作业（5分钟）' },
              { en: 'Keep attending Homework Club CCA — it really helps!', zh: '继续参加作业俱乐部CCA — 真的很有帮助！' },
              { en: 'Try Pomodoro technique: work for 15 minutes, then 5-minute break', zh: '试试番茄工作法：学习15分钟，休息5分钟' },
            ],
            igcseSkills: ['Time management', 'Self-organisation', 'Independent study', 'Meeting deadlines'],
          },
        ]
      },
      {
        category: 'strengths',
        emoji: '🌟',
        labelEn: 'Your Superpowers — You\'re Amazing at These!',
        labelZh: '你的超能力 — 你在这些方面太棒了！',
        subjects: [
          {
            name: 'Art & Design',
            attainment: 'Above (your highest grade!)',
            trend: 'Secure→Secure→Secure→Above (going up!)',
            trendEmoji: '📈',
            igcseTarget: 'GCSE Art & Design (Pearson Edexcel) in the future',
            analysis: {
              en: "Art is where you shine brightest! You got Above — that's the highest grade of ALL your subjects. You've been exploring sculpture, mixed media, and your teacher says your work shows creativity. In Senior School, Art will be even more exciting with more materials and techniques to try!",
              zh: "Art是你最闪耀的科目！你获得了Above — 这是你所有科目中最高的成绩。你一直在探索雕塑、混合媒体，老师说你的作品展现了创造力。在高中部，Art会更加有趣，有更多材料和技术可以尝试！"
            },
            actions: [
              { en: 'Keep creating at home — try new materials and keep a sketchbook', zh: '在家继续创作 — 尝试新材料并保持写生簿' },
              { en: 'Document your creative process with notes and photos', zh: '用笔记和照片记录你的创作过程' },
              { en: 'Visit art galleries or watch art tutorials online for inspiration', zh: '参观美术馆或在线看艺术教程寻找灵感' },
            ],
            igcseSkills: ['Drawing & observation', 'Mixed media', 'Portfolio development', 'Artist research'],
          },
          {
            name: 'Science & Computing',
            attainment: 'Meeting (both effort 1 — your best!)',
            trend: 'Consistent effort 1 in both subjects',
            trendEmoji: '⭐',
            igcseTarget: 'IGCSE Sciences + Computer Science in the future',
            analysis: {
              en: "When you REALLY like a subject, you put in amazing effort — Science and Computing both have effort grade 1, which is your absolute best! You enjoy experiments, coding with micro:bit, and you're in the sustainability club and 3D printing. These subjects are going to be really exciting in Senior School!",
              zh: "当你真正喜欢一个科目时，你会付出惊人的努力 — Science和Computing的努力成绩都是1，这是你的最佳表现！你喜欢实验、用micro:bit编程，还参加了可持续发展俱乐部和3D打印。这些科目在高中部会非常有趣！"
            },
            actions: [
              { en: 'Keep up your CCAs: sustainability club and 3D printing', zh: '继续参加CCA：可持续发展俱乐部和3D打印' },
              { en: 'Try coding at home with Code.org or Tynker (your roadmap suggests this)', zh: '在家尝试用Code.org或Tynker编程（路线图建议的）' },
              { en: 'Build your scientific vocabulary — it will help in Senior School Science', zh: '积累科学词汇 — 这将有助于高中部的科学课' },
            ],
            igcseSkills: ['Scientific vocabulary', 'Coding basics', 'Problem-solving', 'Data analysis'],
          },
          {
            name: 'Drama & Performance',
            attainment: 'Meeting (effort 1 in Y6!)',
            trend: 'Developing(Y5)→Meeting(Y6) with effort improving from 2 to 1',
            trendEmoji: '📈',
            igcseTarget: 'Performance confidence for all subjects',
            analysis: {
              en: "Your Drama went from Developing to Meeting AND your effort improved to the best score (1)! You also achieved your LAMDA certificate in Y5 — that's something to be really proud of. Your growing confidence in performing will help you in ALL subjects when you need to present or speak up in class.",
              zh: "你的Drama从Developing提升到了Meeting，努力成绩也提升到了最佳（1）！你在Y5还获得了LAMDA证书 — 这真的值得骄傲。你在表演方面日益增长的自信将帮助你在所有科目中需要展示或在课堂上发言时受益。"
            },
            actions: [
              { en: 'Keep building your voice projection and confidence', zh: '继续提升你的声音投射和自信心' },
              { en: 'Your speaking confidence has grown so much — carry this into other subjects!', zh: '你的表达自信进步了很多 — 把这个带到其他科目中！' },
            ],
            igcseSkills: ['Performance confidence', 'Voice projection', 'Presenting skills', 'Team collaboration'],
          },
        ]
      }
    ]
  }
};
