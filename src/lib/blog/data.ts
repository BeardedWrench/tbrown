import { prisma } from '@/lib/prisma';

export async function getBlogPosts({
  category,
  page,
  pageSize,
}: {
  category?: string;
  page: number;
  pageSize: number;
}) {
  const where = category ? { category: { name: category } } : {};
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({ where }),
  ]);
  return { posts, total };
}

export async function getBlogPostCount(category?: string) {
  return await prisma.post.count({
    where: {
      category: category ? { name: category } : undefined,
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function getBlogCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}
