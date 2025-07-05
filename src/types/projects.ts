import type { Project, ProjectCategory } from '@prisma/client';

export type ProjectWithCategory = Project & {
  category: ProjectCategory | null;
};
