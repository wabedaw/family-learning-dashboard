/**
 * Phase 3 AI Insight Service
 * All functions call Bridge Server /api/analyze with specialized prompts.
 */
import { BRIDGE_URL } from '../config';
import { CHILD_TRAITS, EDU_FRAMEWORKS } from './childTraits';

async function callAnalyze(systemPrompt, userPrompt) {
  const res = await fetch(`${BRIDGE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Analyze API error ${res.status}: ${err}`);
  }
  return res.json();
}

function buildChildContext(child) {
  const traits = CHILD_TRAITS[child.id] || {};
  const latest = child.reports?.[child.reports.length - 1];
  let ctx = `CHILD: ${child.name}, ${child.yearGroup}, ${child.stage}, Age ~${traits.age || '?'}
Erikson Stage: ${traits.eriksonStage || 'N/A'}
Piaget Stage: ${traits.piagetStage || 'N/A'}
Personality: ${traits.personality || 'N/A'}
Core Needs: ${traits.coreNeeds || 'N/A'}
Behavior Patterns: ${(traits.behaviorPatterns || []).join('; ')}
Communication: ${traits.communicationStyle?.approach || 'N/A'}
Sibling Dynamic: ${traits.siblingDynamic || 'N/A'}`;

  if (latest) {
    ctx += `\n\nLATEST REPORT (${latest.term}):`;
    (latest.subjects || []).forEach(s => {
      ctx += `\n  ${s.name}: Attainment=${s.attainment}, Effort=${s.effort || 'N/A'}, Std=${JSON.stringify(s.standardised || {})}`;
    });
    if (latest.overallComment) ctx += `\nTutor: ${latest.overallComment.slice(0, 300)}`;
  }

  // Goals
  if (child.goals?.length) {
    ctx += '\n\nCURRENT GOALS:';
    child.goals.forEach(g => { ctx += `\n  [${g.priority}] ${g.title} (${g.status})`; });
  }

  // Strengths & Warnings
  if (child.strengths?.length) {
    ctx += '\n\nSTRENGTHS: ' + child.strengths.map(s => `${s.subject}: ${s.evidence?.[0] || ''}`).join('; ');
  }
  if (child.warnings?.length) {
    ctx += '\n\nWARNINGS: ' + child.warnings.map(w => `[${w.severity}] ${w.message}`).join('; ');
  }

  return ctx;
}

function summarizeRecentDocs(child, days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];

  const recent = (arr, label) => {
    const items = (arr || []).filter(d => (d.uploadDate || d.date || '') >= cutoffStr);
    if (!items.length) return '';
    return `\n\n${label} (${items.length} in last ${days} days):\n` +
      items.map(d => `  - ${d.uploadDate || d.date || 'no date'}: ${d.summary || d.title || d.fileName || JSON.stringify(d).slice(0, 200)}`).join('\n');
  };

  return recent(child.parentNotes, 'PARENT NOTES') +
    recent(child.reflections, 'CHILD REFLECTIONS') +
    recent(child.whatsappEvents, 'WHATSAPP EVENTS') +
    recent(child.newsletters, 'NEWSLETTERS') +
    recent(child.exams, 'EXAMS') +
    recent(child.homework, 'HOMEWORK');
}

// ─── 1. Generate Child Profile ──────────────────────────────
export async function generateChildProfile(child) {
  const system = `You are an expert educational psychologist analyzing a child's learning profile using the EduAdvisor framework. Output ONLY valid JSON.

${EDU_FRAMEWORKS.learningPower}

${EDU_FRAMEWORKS.eriksonStages}`;

  const user = `Analyze this child's complete data and generate a five-dimension learning profile.

${buildChildContext(child)}

ALL REPORT HISTORY:
${(child.reports || []).map(r => {
    const avgAcad = r.subjects?.length ? (r.subjects.reduce((s, sub) => s + (sub.standardised?.academic || 3), 0) / r.subjects.length).toFixed(1) : 'N/A';
    const avgEffort = r.subjects?.length ? (r.subjects.reduce((s, sub) => s + (sub.standardised?.effort || 3), 0) / r.subjects.length).toFixed(1) : 'N/A';
    return `  ${r.term}: Avg Academic=${avgAcad}, Avg Effort=${avgEffort}, Subjects=${r.subjects?.length || 0}`;
  }).join('\n')}

${(child.parentNotes || []).length ? 'PARENT NOTES:\n' + child.parentNotes.map(n => `  ${n.uploadDate || ''}: ${n.summary || n.observationType || ''}`).join('\n') : ''}

Return JSON:
{
  "dimensions": {
    "cognitive": <1-10 score based on academic performance, attention patterns, thinking quality>,
    "motivation": <1-10 based on effort grades, goal engagement, intrinsic drive signals>,
    "strategy": <1-10 based on study habits, metacognition, organisation scores>,
    "eq": <1-10 based on social skills, emotional regulation, empathy signals>,
    "quality": <1-10 based on consistency, resilience, homework/classwork patterns>
  },
  "dimensionDescriptions": {
    "cognitive": "<brief description with evidence>",
    "motivation": "<brief description>",
    "strategy": "<brief description>",
    "eq": "<brief description>",
    "quality": "<brief description>"
  },
  "stuckPoints": [
    { "id": "sp-1", "label": "<short label>", "description": "<detailed description with evidence>", "quadrant": "forced|cantdo|emotional|support" }
  ],
  "insights": [
    { "id": "ins-1", "text": "<insight text>", "type": "insight" }
  ],
  "developmentNotes": "<paragraph about developmental stage and what parents should expect>"
}`;

  return callAnalyze(system, user);
}

// ─── 2. Generate Weekly Summary + Guide ─────────────────────
export async function generateWeeklySummary(child) {
  const system = `You are a warm, insightful family education advisor writing a weekly summary for a parent. Combine data-driven analysis with a caring, personal letter tone. Output ONLY valid JSON.

${EDU_FRAMEWORKS.learningPower}
${EDU_FRAMEWORKS.zpd}`;

  const user = `Generate a weekly summary and next-week guide for this child.

${buildChildContext(child)}
${summarizeRecentDocs(child, 7)}

EXISTING PROFILE: ${JSON.stringify(child.childProfile?.dimensions || {})}

Return JSON:
{
  "summary": {
    "letter": "<warm personal letter to the parent (2-3 paragraphs), referencing specific events/progress from this week>",
    "oneLiner": "<one sentence capturing the most important thing this week>",
    "stats": {
      "weeklyRecords": <number of records/uploads this week>,
      "wins": <number of positive moments>,
      "stuckPoints": <number of challenges>,
      "progressMetric": "<e.g. 'Math 72→78' or 'Effort improved'>"
    },
    "subjectOverview": [
      { "subject": "<name>", "score": "<percentage or descriptor>", "trend": "up|stable|down", "note": "<brief>" }
    ]
  },
  "guide": {
    "doMore": [
      { "action": "<specific action>", "reason": "<why this matters>" }
    ],
    "doLess": [
      { "action": "<what to reduce>", "reason": "<why>" }
    ],
    "parkIt": [
      { "item": "<what to pause>", "reason": "<why it can wait>" }
    ]
  }
}`;

  return callAnalyze(system, user);
}

// ─── 3. Generate Deep Insights ──────────────────────────────
export async function generateDeepInsights(child) {
  const system = `You are an expert educational analyst using EduAdvisor frameworks. Provide deep, evidence-based insights. Output ONLY valid JSON.

${EDU_FRAMEWORKS.learningPower}
${EDU_FRAMEWORKS.fourQuadrant}
${EDU_FRAMEWORKS.eriksonStages}
${EDU_FRAMEWORKS.zpd}`;

  const user = `Generate deep insights for this child based on all available data.

${buildChildContext(child)}
${summarizeRecentDocs(child, 30)}

CURRENT PROFILE DIMENSIONS: ${JSON.stringify(child.childProfile?.dimensions || {})}

Return JSON:
{
  "stuckPoints": [
    { "id": "sp-1", "label": "<short label>", "description": "<detailed with evidence>", "quadrant": "forced|cantdo|emotional|support" }
  ],
  "quadrantAnalysis": {
    "forced": { "percentage": <0-100>, "label": "Forced/Helpless", "description": "<what falls here>" },
    "cantdo": { "percentage": <0-100>, "label": "Genuinely Can't", "description": "<what>" },
    "emotional": { "percentage": <0-100>, "label": "Emotional Resistance", "description": "<what>" },
    "support": { "percentage": <0-100>, "label": "Insufficient Support", "description": "<what>" }
  },
  "fourLayers": {
    "cognitive": { "score": <1-10>, "description": "<brief>" },
    "motivation": { "score": <1-10>, "description": "<brief>" },
    "strategy": { "score": <1-10>, "description": "<brief>" },
    "emotional": { "score": <1-10>, "description": "<brief>" }
  },
  "coreInsights": [
    { "id": "ci-1", "title": "<insight title>", "text": "<detailed insight paragraph>" }
  ],
  "weeklyWins": [
    { "id": "w-1", "text": "<win description>" }
  ]
}`;

  return callAnalyze(system, user);
}

// ─── 4. Generate Communication Tip (on-demand) ─────────────
export async function generateCommunicationTip(child, stuckPoint) {
  const traits = CHILD_TRAITS[child.id] || {};
  const recentNotes = (child.parentNotes || []).slice(-3);

  const system = `You are an expert parenting communication coach. Provide specific, actionable communication advice grounded in child development theory. Output ONLY valid JSON.

${EDU_FRAMEWORKS.eriksonStages}
${EDU_FRAMEWORKS.zpd}`;

  const user = `A parent needs specific communication advice for this stuck point with their child.

CHILD: ${child.name}, Age ~${traits.age}, ${child.yearGroup}
Erikson Stage: ${traits.eriksonStage || 'N/A'}
Personality: ${traits.personality || 'N/A'}
Communication Style Needed: ${traits.communicationStyle?.approach || 'N/A'}
Do This: ${(traits.communicationStyle?.doThis || []).join('; ')}
Avoid This: ${(traits.communicationStyle?.avoidThis || []).join('; ')}

STUCK POINT: "${stuckPoint.label}" — ${stuckPoint.description}

RECENT PARENT NOTES:
${recentNotes.map(n => `  ${n.uploadDate || ''}: ${n.summary || JSON.stringify(n).slice(0, 200)}`).join('\n') || '  (none)'}

Return JSON:
{
  "scenario": "<describe the typical situation when this stuck point manifests>",
  "approach": "<recommended communication approach, referencing relevant theory>",
  "examplePhrases": [
    "<exact phrase parent can use, in context>",
    "<another phrase>"
  ],
  "whatToAvoid": [
    "<specific thing NOT to say/do, with why>"
  ],
  "eriksonContext": "<how this stuck point relates to the child's developmental stage>",
  "followUp": "<what to do after the conversation>"
}`;

  return callAnalyze(system, user);
}
