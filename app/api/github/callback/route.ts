/**
 * GitHub OAuth callback — exchanges code for token and redirects to /card.
 * Token is passed as a short-lived URL param to the client, which sends it
 * to the analyze endpoint. Never stored server-side.
 */
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/card?error=no_code', req.url))
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/card?error=config', req.url))
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error || !tokenData.access_token) {
      return NextResponse.redirect(
        new URL(`/card?error=${tokenData.error || 'token_failed'}`, req.url)
      )
    }

    // Redirect to card page with token — client will call /api/github/analyze
    // Token is ephemeral: used once for analysis, then discarded client-side
    return NextResponse.redirect(
      new URL(`/card?token=${tokenData.access_token}`, req.url)
    )
  } catch {
    return NextResponse.redirect(new URL('/card?error=oauth_failed', req.url))
  }
}
