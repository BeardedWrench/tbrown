import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { generateUniqueSlug } from '@/lib/utils/slugify';
import { createTutorial } from '@/lib/tutorials/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const schema = z.object({
  title: z.string().min(3),
  difficulty: z.string().optional(),
  content: z.string().min(10),
  tutorialCategoryId: z.string().uuid().optional(),
  authorId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
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

  const generatedSlug = await generateUniqueSlug(parsed.data.title);

  const post = await createTutorial({
    ...parsed.data,
    authorId: user.id,
    tutorialCategoryId: parsed.data.tutorialCategoryId,
    slug: generatedSlug,
  });

  return NextResponse.json(post);
}
