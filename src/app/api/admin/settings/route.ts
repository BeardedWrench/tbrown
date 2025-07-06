// import { z } from 'zod';
// import { NextRequest, NextResponse } from 'next/server';
// import { createSetting, getAllSettings } from '@/lib/settings/data';

// const schema = z.object({
//   key: z.string().min(3),
//   value: z.string().min(3),
//   type: z.string().min(3),
// });

// export async function POST(req: NextRequest) {
//   const userId = req.headers.get('x-user-id');
//   const userRole = req.headers.get('x-user-role');

//   if (!userId || !['admin', 'editor'].includes(userRole ?? '')) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const json = await req.json();
//   const parsed = schema.safeParse(json);

//   if (!parsed.success) {
//     return NextResponse.json(
//       { error: parsed.error.flatten() },
//       { status: 400 }
//     );
//   }

//   const setting = await createSetting(parsed.data);

//   return NextResponse.json(setting);
// }

// export async function GET() {
//   const settings = await getAllSettings();

//   if (!settings) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   return NextResponse.json(settings);
// }

import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createSetting, getAllSettings } from '@/lib/settings/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const schema = z.object({
  key: z.string().min(3),
  value: z.string().min(1),
  type: z.enum(['string', 'boolean']),
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
