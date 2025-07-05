import { DBUser } from '@/types/user';
import type { Role as PrismaRole } from '@prisma/client';

export type Role = PrismaRole['name'];

export const roleHierarchy: Role[] = ['viewer', 'editor', 'admin'];

export function hasRole(
  user: DBUser | null | undefined,
  required: Role
): boolean {
  if (!user) return false;
  return (
    roleHierarchy.indexOf(user.role as Role) >= roleHierarchy.indexOf(required)
  );
}

export function isAdmin(user: DBUser | null | undefined): boolean {
  return user?.role === 'admin';
}

export function isEditor(user: DBUser | null | undefined): boolean {
  return user?.role === 'editor';
}

export function isStaff(user: DBUser | null | undefined): boolean {
  return ['admin', 'editor'].includes(user?.role ?? '');
}
