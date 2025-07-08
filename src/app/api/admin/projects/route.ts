import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { createProject, getProjects } from '@/lib/projects/data';
import { generateUniqueSlug } from '@/lib/utils/slugify';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  url: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url().optional()
  ),
  repo: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url().optional()
  ),
  techStack: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  projectCategoryId: z.string().uuid().optional(),
  slug: z.string().optional(),
});

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const slug =
      parsed.data.slug || (await generateUniqueSlug(parsed.data.title));

    const { projectCategoryId, ...rest } = parsed.data;

    const project = await createProject({
      ...rest,
      slug,
      author: { connect: { id: user.id } },
      category: projectCategoryId
        ? { connect: { id: projectCategoryId } }
        : undefined,
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error('[PROJECT_CREATE_ERROR]', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
