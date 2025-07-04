import { NextResponse } from 'next/server'
import { getSupabaseRouteClient } from '@/lib/supabase/routeClient'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true })
  const supabase = getSupabaseRouteClient()

  const { email, password, name } = await req.json()
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message || 'Signup failed' }, { status: 400 })
  }

  const roleName = (await prisma.user.count()) === 0 ? 'admin' : 'viewer'
  const role = await prisma.role.findUnique({ where: { name: roleName } })

  await prisma.user.create({
    data: { id: data.user.id, email, name, roleId: role!.id },
  })

  return res
}