import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function deleteProjectByid(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}
export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({ data });
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  return prisma.project.update({
    where: { id },
    data,
  });
}
