import { createSupabaseServer } from '@/lib/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSession() {
  const supabase = createSupabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { role: true },
  });

  return {
    ...user,
    role: dbUser?.role?.name ?? 'viewer',
    id: dbUser?.id,
  };
}