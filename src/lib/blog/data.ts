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
      include: { category: true },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
}

export async function getPublishedBlogPosts({
  category,
  page,
  pageSize,
}: {
  category?: string;
  page: number;
  pageSize: number;
}) {
  const where = {
    published: true,
    ...(category && { category: { name: category } }),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
}

export async function getBlogPostCount(category?: string) {
  return await prisma.post.count({
    where: category ? { category: { name: category } } : undefined,
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getBlogCategories() {
  return prisma.postCategory.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getRecentBlogPosts(limit = 3) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      createdAt: true,
    },
  });
}

export async function getBlogPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
  });
}
