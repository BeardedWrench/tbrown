'use client';

import AdminProjectCard from './components/AdminProjectCard';
import { ProjectWithCategory } from '@/types/withCategories';

interface Props {
  projects: ProjectWithCategory[];
}

export default function ProjectsClient({ projects }: Props) {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <AdminProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
