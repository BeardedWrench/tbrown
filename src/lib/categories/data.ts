/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '@/lib/prisma';
import { CategoryType } from '@/types/withCategories';

const CATEGORY_MAP = {
  post: 'postCategory',
  tutorial: 'tutorialCategory',
  project: 'projectCategory',
} as const;

export async function getAllCategories(type: CategoryType) {
  const modelName = CATEGORY_MAP[type];
  return (prisma[modelName] as any).findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createCategory(type: CategoryType, data: any) {
  const modelName = CATEGORY_MAP[type];
  return (prisma[modelName] as any).create({
    data,
  });
}

export async function deleteCategory(type: CategoryType, id: string) {
  const modelName = CATEGORY_MAP[type];
  return (prisma[modelName] as any).delete({
    where: { id },
  });
}

export async function updateCategory(
  type: CategoryType,
  id: string,
  data: any
) {
  const modelName = CATEGORY_MAP[type];

  return (prisma[modelName] as any).update({
    where: { id },
    data,
  });
}
