import { NextRequest } from 'next/server';
import {
  getPublishedBlogPosts,
  getBlogCategories,
  getBlogPostCount,
} from '@/lib/blog/data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? undefined;
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = 6;

  const [postsData, categories] = await Promise.all([
    getPublishedBlogPosts({ category, page, pageSize }),
    getBlogCategories(),
  ]);

  const total = await getBlogPostCount(category);

  return Response.json({
    posts: postsData.posts ?? [],
    total,
    categories,
  });
}
