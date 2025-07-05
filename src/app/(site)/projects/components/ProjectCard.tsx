import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@prisma/client';

interface Props {
  project: Project;
  categorySlug: string;
}
export default function ProjectCard({ project, categorySlug }: Props) {
  return (
    <Link href={`/projects/${categorySlug}/${project.slug}`}>
      <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white dark:bg-neutral-900">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
