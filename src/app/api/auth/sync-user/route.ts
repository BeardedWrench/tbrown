import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

export async function POST(req: Request) {
  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (existingUser) {
    return NextResponse.json({ success: true });
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
      id: user.id,
      email: user.email ?? '',
      name,
      roleId: role.id,
    },
  });

  return NextResponse.json({ success: true });
}
