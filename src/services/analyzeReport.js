/**
 * Analyze extracted report text using Bridge Server LLM proxy.
 * API keys stay server-side — the frontend never touches them.
 *
 * @param {string} text - The extracted text from the report
 * @param {string} reportType - Type of report
 * @param {object} childContext - { name, yearGroup, stage, focusSubjects, latestSubjects: [{ name, attainment }] }
 * @returns {Promise<object>} - Structured analysis result
 */
import { BRIDGE_URL } from '../config';

export async function analyzeReport(text, reportType = 'report', childContext = null) {
  const systemPrompt = `You are an expert educational analyst specializing in UK/Singapore school reports (Brighton College). You extract structured data and provide insightful analysis for parents.
Your output MUST be valid JSON only — no markdown, no code fences, no explanation text before or after the JSON.`;

  const userPrompt = buildPrompt(text, reportType, childContext);

  const response = await fetch(`${BRIDGE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error('Bridge analyze error:', response.status, errBody);
    throw new Error(`API_ERROR_${response.status}`);
  }

  return response.json();
}

// ─── Build child context string ─────────────────────────────
function childContextBlock(ctx) {
  if (!ctx) return '';
  let block = `\n\nCHILD CONTEXT (use this as baseline for comparison):
- Name: ${ctx.name}
- Year Group: ${ctx.yearGroup}
- School Stage: ${ctx.stage}`;
  if (ctx.focusSubjects?.length) block += `\n- Focus Subjects: ${ctx.focusSubjects.join(', ')}`;
  if (ctx.latestSubjects?.length) {
    block += `\n- Latest Subject Performance:`;
    ctx.latestSubjects.forEach(s => {
      block += `\n  • ${s.name}: Attainment=${s.attainment}, Effort=${s.effort || 'N/A'}`;
    });
  }
  return block;
}

// ─── Build prompts per type ─────────────────────────────────
function buildPrompt(text, reportType, ctx) {

  // ──────────────────────────────────────────────────────
  // TYPE 1: TERM REPORT
  // ──────────────────────────────────────────────────────
  if (reportType === 'report') {
    return `Analyze this school report and extract ALL data into structured JSON.
${childContextBlock(ctx)}

Report text:
"""
${text}
"""

Return a JSON object with this exact structure:
{
  "childName": "string",
  "yearGroup": "string — e.g. Year 7",
  "term": "string — e.g. Y7 Term 2",
  "academicYear": "string — e.g. 2024-2025",
  "schoolSection": "string — Senior School or Junior School",
  "reportType": "Progress Report or Full Report",
  "reportDate": "string — YYYY-MM or exact date if available",
  "attendance": { "present": number_or_null, "late": number_or_null },
  "overallComment": "string — full tutor comment",
  "pupilReflection": "string or null",
  "headComment": "string or null",
  "nextSteps": "string or null",
  "subjects": [
    {
      "name": "string",
      "group": "Core|Creative|Languages|Humanities|Other",
      "teacherName": "string",
      "attainment": "string — Meeting/Below/Above/Excelling/Secure/Developing/Concern",
      "effort": "number or string",
      "classwork": "number or null (1-4 scale)",
      "homework": "string or number or null",
      "organisation": "number or null",
      "progress": "string or null",
      "comment": "string or null — exact teacher comment text, NOT summarized",
      "nextStep": "string or null",
      "standardised": {
        "academic": "number 1-5 (Concern=1, Developing/Below=2, Meeting/Secure=3, Above=4, Excelling/Advanced=5)",
        "effort": "number 1-5 (invert from 1-4 scale: grade1=5, grade2=4, grade3=3, grade4=2; for 1-3 scale: 1=5, 2=4, 3=3)",
        "stability": "number 1-5",
        "independence": "number 1-5 (from organisation grade, inverted)",
        "progress": "number 1-5"
      },
      "commentInsight": {
        "strengths": ["array of strengths from comment"],
        "concerns": ["array of concerns"],
        "suggestions": ["array of improvement suggestions"],
        "signals": ["patterns or trends noticed"],
        "familyAction": "string — suggested parent action"
      }
    }
  ],
  "overallAnalysis": {
    "topStrengths": ["top 3 strengths"],
    "topConcerns": ["top 3 concerns"],
    "keyRecommendations": ["top 3 actionable recommendations"],
    "overallTrend": "string — brief trajectory assessment"
  }
}

IMPORTANT: Extract EVERY subject. Include FULL teacher comments. Generate standardised scores for every subject.`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 2: EXAM / QUIZ
  // ──────────────────────────────────────────────────────
  if (reportType === 'exam') {
    return `Analyze this exam/quiz result for a student at Brighton College Singapore.
${childContextBlock(ctx)}

Document text:
"""
${text}
"""

Compare the exam results against the child's baseline performance data above. Identify areas of progress, areas needing improvement, and specific action items.

Return JSON:
{
  "childName": "string",
  "subject": "string",
  "examType": "string — Unit Test, Mid-Term, Quiz, End-of-Term, etc.",
  "date": "string or null",
  "score": "string or number",
  "maxScore": "string or number or null",
  "percentage": "number or null",
  "grade": "string or null",
  "topics": ["topics covered"],
  "strengths": ["areas where student performed well, with specific evidence"],
  "weaknesses": ["areas needing improvement, with specific evidence"],
  "comparedToBaseline": {
    "improved": ["areas that improved vs baseline attainment"],
    "declined": ["areas that declined vs baseline"],
    "consistent": ["areas consistent with baseline"]
  },
  "recommendations": ["specific, actionable study recommendations"],
  "parentActions": ["what parents can do to help"],
  "summary": "2-3 sentence analysis summary"
}`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 3: WEEKLY NEWSLETTER
  // ──────────────────────────────────────────────────────
  if (reportType === 'newsletter') {
    return `Analyze this school weekly newsletter from Brighton College Singapore.
${childContextBlock(ctx)}

Newsletter text:
"""
${text}
"""

Extract ALL dates, events, deadlines, and important announcements. For each item, assess whether it's relevant to this specific child based on their year group and subjects.

Return JSON:
{
  "title": "string — newsletter title or week",
  "date": "string — newsletter date",
  "summary": "2-3 sentence overview",
  "keyDates": [
    { "date": "string", "event": "string", "relevance": "high|medium|low", "reason": "why relevant to this child" }
  ],
  "attentionItems": [
    { "item": "string", "category": "academic|administrative|event|deadline|health", "urgency": "high|medium|low", "childRelevant": true/false, "reason": "string" }
  ],
  "actionRequired": ["specific actions parents need to take with deadlines"],
  "upcomingEvents": ["events in the next 2 weeks relevant to this child"],
  "generalAnnouncements": ["other notable items"]
}`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 4: HOMEWORK / SEESAW RECORD
  // ──────────────────────────────────────────────────────
  if (reportType === 'seesaw') {
    return `Analyze this homework/assignment record from Brighton College Singapore.
${childContextBlock(ctx)}

Document text:
"""
${text}
"""

Assess the homework completion, quality, and patterns against the child's known areas of strength and weakness.

Return JSON:
{
  "childName": "string",
  "date": "string or null",
  "subject": "string or null",
  "assignmentName": "string",
  "completionStatus": "complete|partial|incomplete|late|not-submitted",
  "qualityAssessment": "string — brief quality analysis",
  "teacherFeedback": "string or null — any teacher comments",
  "strengths": ["what the child did well"],
  "areasToImprove": ["specific areas to work on"],
  "comparedToPattern": "string — how this fits with known homework patterns (e.g., if organisation is a known concern)",
  "suggestions": ["actionable suggestions for improvement"],
  "summary": "2-3 sentence summary"
}`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 5: PARENT OBSERVATION NOTE
  // ──────────────────────────────────────────────────────
  if (reportType === 'parent-note') {
    return `Analyze this parent observation note about their child at Brighton College Singapore.
${childContextBlock(ctx)}

Parent's note:
"""
${text}
"""

Compare the parent's observations against the child's school data (subject performance, teacher comments, known strengths/concerns). Provide practical, evidence-based suggestions.

Return JSON:
{
  "childName": "string",
  "date": "string or null",
  "observationType": "academic|behavioral|emotional|social|health",
  "summary": "2-3 sentence summary of the observation",
  "parentConcerns": ["specific concerns raised by the parent"],
  "parentPositives": ["positive observations noted"],
  "alignmentWithSchoolData": {
    "confirmed": ["observations that align with school report data"],
    "newInsights": ["observations that reveal something not in school data"],
    "contradictions": ["observations that differ from school data"]
  },
  "practicalSuggestions": [
    { "suggestion": "string", "reason": "why this would help", "timeframe": "immediate|this-week|this-term" }
  ],
  "schoolCommunication": ["things to discuss with teachers based on this observation"],
  "relatedGoals": ["how this connects to existing learning goals"]
}`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 6: CHILD WEEKLY REFLECTION
  // ──────────────────────────────────────────────────────
  if (reportType === 'child-reflection') {
    return `Analyze this child's weekly self-reflection from a student at Brighton College Singapore.
${childContextBlock(ctx)}

Child's reflection:
"""
${text}
"""

Compare the child's self-assessment against their actual school performance data. Assess their self-awareness, identify growth mindset indicators, and provide encouraging yet practical suggestions.

Return JSON:
{
  "childName": "string",
  "date": "string or null",
  "wins": ["learning wins the child identified"],
  "struggles": ["struggles the child identified"],
  "improvementPlans": ["what the child plans to do better"],
  "selfAwarenessAssessment": {
    "score": "number 1-5 (how accurately does the child perceive their performance)",
    "accuratePerceptions": ["where child's self-view matches school data"],
    "blindSpots": ["areas where child may not see their own strengths or weaknesses"],
    "growthMindsetIndicators": ["evidence of growth mindset in their reflection"]
  },
  "encouragement": "string — specific, genuine praise based on their reflection",
  "practicalSuggestions": [
    { "suggestion": "string", "reason": "why", "difficulty": "easy|medium|challenging" }
  ],
  "parentConversationStarter": "string — a good question for parents to ask about this reflection",
  "summary": "2-3 sentence analysis"
}`;
  }

  // ──────────────────────────────────────────────────────
  // TYPE 7: WHATSAPP CHAT EXPORT
  // ──────────────────────────────────────────────────────
  if (reportType === 'whatsapp') {
    return `Analyze this WhatsApp chat export between family members. Extract education-related events, discussions about school, learning moments, parenting observations, and any emotionally significant exchanges.
${childContextBlock(ctx)}

WhatsApp chat text:
"""
${text}
"""

Parse the WhatsApp export format (typically "[DD/MM/YYYY, HH:MM] Name: message" or similar).
Focus on extracting key events relevant to the child's education, wellbeing, and family dynamics.

Return JSON:
{
  "events": [
    {
      "date": "YYYY-MM-DD",
      "type": "academic|behavioral|emotional|social|achievement|health|planning",
      "title": "string — short descriptive title",
      "detail": "string — 1-2 sentence description of what happened",
      "participants": ["names of people involved in this exchange"],
      "aiInsight": {
        "stuckPoints": ["any concerns or challenges revealed"],
        "insights": ["actionable observations"],
        "wins": ["positive moments or achievements"]
      }
    }
  ],
  "summary": "string — 2-3 sentence overview of the chat period",
  "period": {
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD"
  },
  "themes": ["recurring themes in the conversations"],
  "communicationPatterns": {
    "positive": ["healthy communication patterns observed"],
    "improvement": ["areas where family communication could improve"]
  }
}

IMPORTANT:
- Only extract events that are educationally or developmentally relevant — skip casual greetings, logistics about food/transport, etc.
- Aim for 5-15 key events (not every single message).
- Dates must be in YYYY-MM-DD format.
- If you cannot determine the exact date, use the closest date from context.`;
  }

  // ──────────────────────────────────────────────────────
  // FALLBACK: GENERIC
  // ──────────────────────────────────────────────────────
  return `Analyze this school-related document.
${childContextBlock(ctx)}

Text:
"""
${text}
"""

Return JSON:
{
  "documentType": "${reportType}",
  "summary": "string",
  "keyPoints": ["array"],
  "actionItems": ["array"],
  "sentiment": "positive|neutral|concerned",
  "category": "academic|behavioral|administrative|achievement"
}`;
}
