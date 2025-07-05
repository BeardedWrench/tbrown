import { prisma } from '@/lib/prisma';

export async function getProjectCategories() {
  return prisma.projectCategory.findMany({
    where: {
      projects: {
        some: {},
      },
    },
    include: {
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export async function getProjectsByCategorySlug(slug: string) {
  return prisma.project.findMany({
    where: {
      category: {
        slug,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.projectCategory.findUnique({
    where: { slug },
  });
}

export async function getProjectCategoryBySlug(slug: string) {
  return prisma.projectCategory.findUnique({ where: { slug } });
}

export async function getRecentProjects(limit = 3) {
  return prisma.project.findMany({
    where: { featured: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });
}
