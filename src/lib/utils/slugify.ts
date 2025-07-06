import { prisma } from '@/lib/prisma';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(base: string): Promise<string> {
  const baseSlug = slugify(base);
  let uniqueSlug = baseSlug;
  let suffix = 1;

  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  return uniqueSlug;
}
