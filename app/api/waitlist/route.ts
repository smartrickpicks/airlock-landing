import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.AIRLOCK_API_URL || 'http://localhost:8000'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const sanitized = email.trim().toLowerCase().slice(0, 254)

    // Forward to Airlock API waitlist endpoint
    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sanitized,
          source: 'doyoulikedags.xyz',
        }),
      })

      if (res.ok) {
        return NextResponse.json({ ok: true })
      }

      console.error(`[waitlist] API returned ${res.status}`)
    } catch (err) {
      console.error('[waitlist] API unreachable, falling back to log:', err)
    }

    // Fallback: log for manual pickup when API is down
    console.log(`[waitlist] ${sanitized} — ${new Date().toISOString()}`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
