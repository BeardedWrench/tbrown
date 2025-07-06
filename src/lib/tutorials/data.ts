/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../prisma';

export async function getAllTutorials() {
  return prisma.tutorial.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, tags: true },
  });
}

export async function getTutorialById(id: string) {
  return prisma.tutorial.findUnique({
    where: { id },
    include: { category: true, tags: true, author: true },
  });
}

export async function getTutorialCategories() {
  return prisma.tutorialCategory.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function updateTutorialById(id: string, data: any) {
  return await prisma.tutorial.update({
    where: { id },
    data,
  });
}

export async function deleteTutorialById(id: string) {
  return prisma.tutorial.delete({
    where: { id },
  });
}

export async function createTutorial(tutorial: any) {
  return prisma.tutorial.create({
    data: tutorial,
  });
}
