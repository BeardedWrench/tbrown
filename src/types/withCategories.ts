import type { Project, ProjectCategory, Tutorial } from '@prisma/client';

export type ProjectWithCategory = Project & {
  category: ProjectCategory | null;
};

export type TutorialWithCategory = Tutorial & {
  category: ProjectCategory | null;
};
