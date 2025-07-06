import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const TagSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export async function getAllTags() {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createTag(data: { name: string; slug: string }) {
  return prisma.tag.create({ data });
}

export async function updateTag(
  id: string,
  data: { name: string; slug: string }
) {
  return prisma.tag.update({
    where: { id },
    data,
  });
}

export async function deleteTag(id: string) {
  return prisma.tag.delete({
    where: { id },
  });
}
