import { NextResponse } from 'next/server'
import { getSupabaseRouteClient } from '@/lib/supabase/routeClient'

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true })
  const supabase = getSupabaseRouteClient()

  const { email, password } = await req.json()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 400 })
  }

  return res
}