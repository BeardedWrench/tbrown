import { deleteProjectByid, updateProject } from '@/lib/projects/data';
import { generateUniqueSlug } from '@/lib/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(5).optional(),
  url: z.string().url().optional(),
  repo: z.string().url().optional(),
  techStack: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  projectCategoryId: z.string().uuid().optional(),
  slug: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const json = await req.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, slug, ...rest } = parsed.data;
  const finalSlug =
    slug || (title ? await generateUniqueSlug(title) : undefined);

  const updated = await updateProject(params.id, {
    ...rest,
    ...(title && { title }),
    ...(finalSlug && { slug: finalSlug }),
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProjectByid(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
