import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/categories/data';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { generateUniqueSlug } from '@/lib/utils/slugify';
import { CategoryType } from '@/types/withCategories';

const categorySchema = z.object({
  name: z.string().min(1),
});

export async function handleCategoryApi(type: CategoryType, req: NextRequest) {
  if (req.method === 'GET') {
    const categories = await getAllCategories(type);
    return NextResponse.json(categories);
  }

  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  if (req.method === 'POST') {
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(parsed.data.name);
    const category = await createCategory(type, {
      name: parsed.data.name,
      slug,
    });
    return NextResponse.json(category);
  }

  if (req.method === 'PUT') {
    const parsed = categorySchema
      .extend({ id: z.string().uuid() })
      .safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(parsed.data.name);
    const updated = await updateCategory(type, parsed.data.id, {
      name: parsed.data.name,
      slug,
    });
    return NextResponse.json(updated);
  }

  if (req.method === 'DELETE') {
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await deleteCategory(type, id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
