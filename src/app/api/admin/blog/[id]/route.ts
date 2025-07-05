/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';

const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  postCategoryId: z.string().uuid().optional(),
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClientFromHeaders();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = schema.safeParse(json);

  console.log('JSON: ', json);
  console.log('RAW NON PARSED: ', parsed);

  console.log('Updating post with:', parsed.data);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (post.authorId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      updatedAt: new Date(),
      postCategoryId: parsed.data.postCategoryId,
    },
  });

  return NextResponse.json(updated);
}
