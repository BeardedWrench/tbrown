import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';
import { PrismaClient } from '@prisma/client';
import type { DBUser } from '@/types/user';

const prisma = new PrismaClient();

export async function getUserFromRequest(): Promise<DBUser | null> {
  const supabase = await createSupabaseServerClientFromHeaders();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { role: true },
  });

  if (!dbUser || !dbUser.role) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    avatarUrl: dbUser.avatarUrl,
    role: dbUser.role.name,
  };
}

export async function getUserByID(id: string): Promise<DBUser | null> {
  const dbUser = await prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    avatarUrl: dbUser.avatarUrl,
    role: dbUser.role.name,
  };
}

export async function getAllUsers(): Promise<DBUser[]> {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'desc' },
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    role: user.role?.name ?? 'viewer',
  }));
}
