import { NextRequest, NextResponse } from 'next/server'

const WAITLIST_ENDPOINT = process.env.WAITLIST_ENDPOINT
const WAITLIST_NOTIFY_EMAIL = process.env.WAITLIST_NOTIFY_EMAIL || 'rick@brainbrigade.xyz'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const sanitized = email.trim().toLowerCase().slice(0, 254)

    // Forward to existing brainbrigade.xyz invite service
    if (WAITLIST_ENDPOINT) {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sanitized,
          source: 'doyoulikedags.xyz',
          notify: WAITLIST_NOTIFY_EMAIL,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        console.error(`Waitlist forward failed: ${res.status}`)
        return NextResponse.json({ error: 'Service unavailable' }, { status: 502 })
      }

      return NextResponse.json({ ok: true })
    }

    // Fallback: log for manual pickup when no endpoint configured
    console.log(`[waitlist] ${sanitized} — ${new Date().toISOString()}`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
