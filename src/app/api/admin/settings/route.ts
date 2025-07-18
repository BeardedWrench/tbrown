import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createSetting, getAllSettings } from '@/lib/settings/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const schema = z.object({
  key: z.string().min(3),
  value: z.string().min(1),
  type: z.enum(['STRING', 'BOOLEAN', 'JSON', 'NUMBER']),
});

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest();

  if (!user || !['admin', 'editor'].includes(user.role)) {
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

  const setting = await createSetting(parsed.data);
  return NextResponse.json(setting);
}

export async function GET() {
  const user = await getUserFromRequest();

  if (!user || !['admin', 'editor'].includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await getAllSettings();
  return NextResponse.json(settings);
}
