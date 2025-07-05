import { Tables } from './supabase';

import type { Role as PrismaRole } from '@prisma/client';

export type DBUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: PrismaRole['name'];
};
export type DBRole = Tables<'Role'>;
