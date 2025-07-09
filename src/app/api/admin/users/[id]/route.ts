import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { roleId } = await req.json();
    if (!roleId) {
      return NextResponse.json({ error: 'Missing roleId' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id },
      data: { roleId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
