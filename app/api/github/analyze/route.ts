/**
 * GitHub analysis endpoint — accepts a token, scans repos, returns profile.
 * Token is used once and never stored.
 */
import { NextRequest, NextResponse } from 'next/server'
import { analyzeGitHub } from '@/lib/github-analyzer'

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Missing GitHub token' },
        { status: 400 }
      )
    }

    const result = await analyzeGitHub(token)

    // Token is not stored — analysis is complete, token dies here
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('GitHub analysis failed:', err.message)
    return NextResponse.json(
      { error: 'Analysis failed. Check your GitHub permissions.' },
      { status: 500 }
    )
  }
}
