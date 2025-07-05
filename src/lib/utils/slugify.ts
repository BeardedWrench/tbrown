import { prisma } from '@/lib/prisma';

/**
 * Converts a string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove punctuation
    .replace(/[\s_-]+/g, '-') // Collapse whitespace/dashes
    .replace(/^-+|-+$/g, ''); // Trim dashes
}

/**
 * Recursively checks for existing slugs and appends a number if needed.
 */
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