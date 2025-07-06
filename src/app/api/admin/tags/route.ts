import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { getAllTags, createTag, updateTag, deleteTag } from '@/lib/tags/data';
import { generateUniqueSlug } from '@/lib/utils/slugify';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const TagSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2),
});

export async function GET() {
  const tags = await getAllTags();
  return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = TagSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const slug = await generateUniqueSlug(parsed.data.name);
  const tag = await createTag({ name: parsed.data.name, slug });

  return NextResponse.json(tag);
}

export async function PUT(req: NextRequest) {
  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = TagSchema.extend({ id: z.string().uuid() }).safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const slug = await generateUniqueSlug(parsed.data.name);
  const tag = await updateTag(parsed.data.id, {
    name: parsed.data.name,
    slug,
  });

  return NextResponse.json(tag);
}

export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = z.object({ id: z.string().uuid() }).safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const tag = await deleteTag(parsed.data.id);
  return NextResponse.json(tag);
}
