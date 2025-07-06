/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../prisma';

export async function getAllSettings() {
  return prisma.setting.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getSettingById(id: string) {
  return prisma.setting.findUnique({
    where: { id },
  });
}

export async function updateSetting(id: string, data: any) {
  return prisma.setting.update({
    where: { id },
    data,
  });
}

export async function deleteSetting(id: string) {
  return prisma.setting.delete({
    where: { id },
  });
}

export async function createSetting(data: any) {
  return prisma.setting.create({
    data,
  });
}
