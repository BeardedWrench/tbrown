import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { email, password } = await req.json()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}