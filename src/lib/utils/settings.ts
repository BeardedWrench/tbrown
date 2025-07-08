import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

export async function isSignupEnabled(): Promise<boolean> {
  const value = await getSetting('canSignup');
  return value === 'true';
}

export async function getBio() {
  return await getSetting('bio');
}

// I’m a full-stack software engineer, indie hacker, and all-around maker who loves turning ambitious ideas into reality. Whether I’m building web apps, launching tools, or exploring the edges of what's possible with AI, I always aim for clean code, elegant design, and real-world utility.

// This site is my digital workshop — a home for my latest projects, blog posts, tutorials, and experiments. If you're into thoughtful engineering, UI design, and creative problem solving, you're in the right place.
