import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getSessionWithRole() {
  const supabase = createServerComponentClient({
    cookies: async () => cookies(),
  })

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { role: true },
  })

  return {
    ...user,
    role: dbUser?.role?.name ?? 'viewer',
    id: dbUser?.id,
  }
}