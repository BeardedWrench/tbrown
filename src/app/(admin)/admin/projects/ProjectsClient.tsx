'use client';

import Link from 'next/link';
import AdminProjectCard from './components/AdminProjectCard';
import { ProjectWithCategory } from '@/types/withCategories';

interface Props {
  projects: ProjectWithCategory[];
}

export default function ProjectsClient({ projects }: Props) {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          New Project
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <AdminProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
