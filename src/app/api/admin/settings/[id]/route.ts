import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteSetting,
  getSettingById,
  updateSetting,
} from '@/lib/settings/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const schema = z.object({
  key: z.string().min(3),
  value: z.string().min(3),
  type: z.string().min(3),
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteSetting(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const setting = await getSettingById(id);

  if (!setting) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await updateSetting(id, parsed.data);

  return NextResponse.json(updated);
}
