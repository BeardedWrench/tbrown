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
