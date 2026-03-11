import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const MODEL = 'anthropic/claude-3.5-haiku'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/* ── System prompts ─────────────────────────────────────────────────────── */

const OTTO_DISCOVERY_PROMPT = `You are Otto, an AI teammate on the Airlock platform. You're an otter who carries a rock — it's a playbook.

You are having a discovery conversation on the Airlock landing page. Your goal: learn enough about this visitor to generate a personalized workflow spec (DAG) for them.

CONVERSATION RULES:
- You get 3-5 exchanges max. Make every question count.
- First response: react to what they told you (show you understand their world), then ask ONE follow-up question.
- Follow-ups should dig into: team size/structure, biggest recurring pain point, what breaks or slips through cracks.
- When you have enough signal (usually after 2-3 exchanges), say EXACTLY this marker on its own line: [READY_FOR_SPEC]
- After the marker, give a brief wrap-up sentence like "I've got enough to show you something. Give me a second."
- Do NOT generate the spec yourself. Just signal readiness.

VOICE RULES (non-negotiable):
- Short sentences. Front-load information.
- NEVER use: "Great question!", "Absolutely!", "I'd be happy to help!", exclamation marks for enthusiasm.
- No hedge words. State what you see.
- Warm but direct. You're a teammate, not a chatbot.
- Use concrete examples from THEIR industry — not generic business speak.
- Keep each response under 80 words.
- ONE question per response. Never stack questions.

WHAT YOU KNOW (use naturally, don't lecture):
- Predictive Index: 4 behavioral drives (Dominance, Extraversion, Patience, Formality), 60 years of research, 30M+ assessments
- You map team drives, find gaps, fill them with the right cognitive mode
- 17 personas, 4 chambers (Discovery → Build → Verify → Ship), human-in-the-loop gates
- You're a behavioral counterweight — whatever the team lacks, you compensate

IMPORTANT: Speak THEIR language. Oil buyer = deals, MSAs, counterparties. Fashion = collections, tech packs, production. Translate everything.`

const OTTO_SPEC_PROMPT = `You are Otto generating a personalized workflow spec (DAG) based on a discovery conversation.

Given the conversation history, generate a JSON spec with this EXACT structure:
{
  "role": "Their role/title in plain English",
  "industry": "Their industry",
  "team_insight": "One sentence about their team's likely behavioral profile",
  "gap": "The biggest gap Otto would fill",
  "dag": {
    "name": "Playbook name in plain English (e.g., 'Deal Flow Pipeline' or 'Collection Launch Cycle')",
    "nodes": [
      {
        "id": 1,
        "label": "Plain English step name",
        "chamber": "discovery|build|verify|ship",
        "description": "What happens at this step — in their language, not ours",
        "persona": "Which Otto persona activates here (e.g., Scholar, Analyzer, Guardian)",
        "is_gate": false
      }
    ]
  },
  "otto_value": "One sentence: the single most valuable thing Otto does for this person",
  "use_case_tags": ["tag1", "tag2", "tag3"]
}

RULES:
- Generate 5-7 nodes. Include 1-2 gates (is_gate: true) at critical human checkpoints.
- Nodes must flow logically through chambers: discovery → build → verify → ship.
- All language must be in THEIR vocabulary. No Airlock jargon except chamber names.
- use_case_tags should be lowercase, hyphenated categories for product roadmap tracking (e.g., "oil-gas-buyer", "contract-review", "team-scaling").
- Return ONLY valid JSON. No markdown, no explanation, no wrapping.`

/* ── Main handler ───────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, generateSpec } = body as {
      messages: ChatMessage[]
      generateSpec?: boolean
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 })
    }

    // Sanitize messages
    const sanitized: ChatMessage[] = messages
      .slice(-10) // Max 10 messages in context
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content).slice(0, 1000),
      }))

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({
        response: 'Otto is waking up. Try again in a moment.',
        ready: false,
      })
    }

    // Spec generation mode
    if (generateSpec) {
      return generateDagSpec(sanitized)
    }

    // Discovery conversation mode
    return continueDiscovery(sanitized)
  } catch (err) {
    console.error('[otto-chat] Error:', err)
    return NextResponse.json(
      { response: 'Something broke on my end. Try again.', ready: false },
      { status: 500 }
    )
  }
}

async function continueDiscovery(messages: ChatMessage[]) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://doyoulikedags.xyz',
      'X-Title': 'Airlock - Otto Hero Chat',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 200,
      temperature: 0.7,
      messages: [
        { role: 'system', content: OTTO_DISCOVERY_PROMPT },
        ...messages,
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    console.error(`[otto-chat] OpenRouter error: ${response.status}`, errText)
    return NextResponse.json({
      response: 'Connection hiccup. Give it another shot.',
      ready: false,
    })
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || 'Lost my train of thought. Say that again?'
  const ready = text.includes('[READY_FOR_SPEC]')
  const cleanText = text.replace('[READY_FOR_SPEC]', '').trim()

  return NextResponse.json({ response: cleanText, ready })
}

async function generateDagSpec(messages: ChatMessage[]) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://doyoulikedags.xyz',
      'X-Title': 'Airlock - Otto Spec Generation',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      temperature: 0.4,
      messages: [
        { role: 'system', content: OTTO_SPEC_PROMPT },
        ...messages,
        {
          role: 'user',
          content: 'Generate the DAG spec JSON based on our conversation.',
        },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    console.error(`[otto-chat] OpenRouter spec error: ${response.status}`, errText)
    return NextResponse.json({ error: 'Spec generation failed' }, { status: 500 })
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || ''

  try {
    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found')
    const spec = JSON.parse(jsonMatch[0])
    return NextResponse.json({ spec })
  } catch (parseErr) {
    console.error('[otto-chat] Spec parse error:', parseErr, text)
    return NextResponse.json({ error: 'Spec parse failed' }, { status: 500 })
  }
}
