/**
 * Per-child trait definitions for AI context in Phase 3 insights.
 * Based on parent observations + EduAdvisor frameworks.
 */
export const CHILD_TRAITS = {
  michael: {
    eriksonStage: 'Identity vs Role Confusion (early adolescence)',
    piagetStage: 'Formal Operational — developing abstract and systematic thinking',
    age: 13,
    personality: 'Sensitive, caring, empathetic. Strong sense of security. Values recognition and acknowledgment.',
    coreNeeds: 'Being recognized and validated. Self-esteem vs inferiority — needs to feel competent.',
    behaviorPatterns: [
      'Likes to work quietly, then show finished work as a surprise — values the "reveal" moment',
      'Recognizes importance of exercise but struggles with laziness',
      'Not very competitive with younger brother Lucas',
    ],
    communicationStyle: {
      approach: 'Non-violent communication (NVC). Never lecture or preach.',
      doThis: [
        'Acknowledge effort before suggesting improvements',
        'Ask open-ended questions instead of giving directives',
        'Respect his autonomy — let him choose how to show progress',
        'Celebrate his "surprise reveals" — it builds intrinsic motivation',
      ],
      avoidThis: [
        'Lecturing or preaching — he shuts down',
        'Comparing with Lucas or other students',
        'Pushing too hard on exercise — he needs to own it',
        'Interrupting his quiet work process',
      ],
    },
    siblingDynamic: 'Not strongly competitive with Lucas. Generally peaceful relationship.',
  },
  lucas: {
    eriksonStage: 'Industry vs Inferiority — needs to experience success and mastery',
    piagetStage: 'Concrete → Formal Operational transition — still needs concrete examples for abstract concepts',
    age: 11,
    personality: 'Active thinker, curious, creative. Extremely sensitive to being understood and seen. Craves attention and love.',
    coreNeeds: 'Being seen, understood, recognized. Needs constant validation and quality time.',
    behaviorPatterns: [
      'Easily distracted in general tasks, but can focus 2-3 hours on drawing or gaming',
      'Starting to value learning and exercise — now runs voluntarily',
      'Easily influenced by peers — both positively and negatively',
      'More competitive with Michael — wants to match or surpass',
    ],
    communicationStyle: {
      approach: 'Frequent reminders + persistent follow-up + high-quality companionship.',
      doThis: [
        'Give constant, specific praise — "I noticed you finished X, that shows real effort"',
        'Be physically present during important tasks — he needs co-regulation',
        'Use his peer influence positively — mention what friends are doing well',
        'Leverage his drawing/gaming focus to build study habits (visual learning, game-like goals)',
      ],
      avoidThis: [
        'Expecting one reminder to be enough — he needs repetition without frustration',
        'Leaving him alone for long study sessions — he drifts without anchor',
        'Comparing unfavorably with Michael',
        'Dismissing his need for attention as "clingy" — it\'s developmental',
      ],
    },
    siblingDynamic: 'More competitive with Michael. Wants more attention and recognition. May feel overshadowed.',
  },
};

/**
 * EduAdvisor frameworks for AI prompts
 */
export const EDU_FRAMEWORKS = {
  learningPower: `Learning Power Three-Layer Model:
1. CAN LEARN (能学/Cognitive): Memory (auditory, visual, working), Attention (selective, distributed, focused, switching), Thinking (inductive, deductive, analogical, abstract, visual)
2. WANT TO LEARN (愿学/Motivation): Intrinsic drive (growth, autonomy, interest, interaction), External drive (recognition, rewards, competition)
3. KNOW HOW TO LEARN (会学/Strategy): Cognitive strategies (rehearsal, elaboration, organization), Metacognition (planning, monitoring, regulation), Resource management (effort, time, external resources)`,

  eriksonStages: `Erikson Psychosocial Development Stages:
- 6-12 years (Lucas): Industry vs Inferiority — needs to experience success, be recognized for competence, avoid repeated failure
- 12-18 years (Michael): Identity vs Role Confusion — developing self-concept, needs autonomy, peer acceptance, rebellion is normal`,

  fourQuadrant: `Four-Quadrant Problem Analysis (why problems occur):
Q1: Forced/Helpless (被逼无奈) — external pressure, academic demands beyond level
Q2: Genuinely Can't (真不会做) — cognitive development gaps, missing prerequisites
Q3: Emotional Resistance (情绪反抗) — unmet needs for autonomy, fairness, understanding
Q4: Insufficient Support (支持不足) — missing scaffolding, unclear rules, inadequate guidance`,

  zpd: `Zone of Proximal Development (ZPD) Scaffolding:
1. Assess the height — where is the child now vs where they need to be?
2. Build the scaffold — break down tasks, provide support tools, model strategies
3. Remove when ready — gradually withdraw support as competence grows
Key: Comfort Zone → Learning Zone → Panic Zone. Always work in the Learning Zone.`,

  informationProcessing: `Gagné Information Processing Theory:
Environment stimulus → Sensory storage → Working memory (~7 chunks) → Long-term memory
To learn faster: 1) Enrich sensory input, 2) Use categorization to reduce working memory load, 3) Practice transfer for long-term encoding`,
};
