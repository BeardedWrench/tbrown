import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';
import { generateUniqueSlug } from '@/lib/utils/slugify';

const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  postCategoryId: z.string().uuid().optional(),
});

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClientFromHeaders();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  const post = await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: user.id,
      postCategoryId: parsed.data.postCategoryId,
      slug: generatedSlug,
    },
  });

  return NextResponse.json(post);
}
