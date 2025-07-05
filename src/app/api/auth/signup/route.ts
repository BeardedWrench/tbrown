import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { email, password, name } = await req.json();

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  const userCount = await prisma.user.count();
  const defaultRoleName = userCount === 0 ? 'admin' : 'viewer';

  const role = await prisma.role.findUnique({
    where: { name: defaultRoleName },
  });

  if (!role) {
    return NextResponse.json({ error: 'Role not found' }, { status: 500 });
  }

  await prisma.user.create({
    data: {
      id: data.user.id,
      email,
      name,
      roleId: role.id,
    },
  });

  return NextResponse.json({ success: true });
}
