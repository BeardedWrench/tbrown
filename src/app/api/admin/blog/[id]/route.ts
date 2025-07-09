import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { getBlogPostById, updateBlogPostById } from '@/lib/blog/data';

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.post.delete({ where: { id: id } });
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

  const post = await getBlogPostById(id);

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (post.authorId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updated = await updateBlogPostById(id, {
    ...parsed.data,
    updatedAt: new Date(),
    postCategoryId: parsed.data.postCategoryId,
  });

  return NextResponse.json(updated);
}
