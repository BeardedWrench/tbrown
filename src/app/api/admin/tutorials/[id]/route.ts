/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteTutorialById,
  getTutorialById,
  updateTutorialById,
} from '@/lib/tutorials/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

const schema = z.object({
  title: z.string().min(3),
  difficulty: z.string().optional(),
  content: z.string().min(10),
  tutorialCategoryId: z.string().uuid().optional(),
  authorId: z.string().uuid(),
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTutorialById(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const tutorial = await getTutorialById(params.id);

  if (!tutorial) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (tutorial.authorId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updated = await updateTutorialById(params.id, {
    ...parsed.data,
    updatedAt: new Date(),
    tutorialCategoryId: parsed.data.tutorialCategoryId,
  });
  return NextResponse.json(updated);
}
