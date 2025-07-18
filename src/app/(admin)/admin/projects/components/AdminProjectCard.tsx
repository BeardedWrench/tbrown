'use client';

import { SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { ProjectWithCategory } from '@/types/withCategories';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  project: ProjectWithCategory;
}

export default function AdminProjectCard({ project }: Props) {
  const { coverImage, title, url, repo, techStack, category } = project;
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-xl p-4 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          {title}
        </h2>

        <p className="text-sm text-slate-800 italic">
          {category?.name ?? 'Uncategorized'}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 my-3">
        {techStack.map((stack) => (
          <Badge key={stack}>{stack.toUpperCase()}</Badge>
        ))}
      </div>

      {coverImage && (
        <div className="relative my-3 aspect-[3/1] w-full overflow-hidden rounded-md">
          <Image
            src={coverImage}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="object-cover"
          />
        </div>
      )}

      {(repo || url) && (
        <div className="my-4 flex justify-evenly text-sm text-blue-700 dark:text-blue-400">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <FaGithub size={18} />
              Github
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <CgWebsite size={18} />
              Live Site
            </a>
          )}
        </div>
      )}

      {/* Sticky footer icons */}
      <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
        <button
          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
          onClick={() => handleDelete(project.id)}
        >
          <Trash2 size={18} className="text-red-600" />
        </button>
        <Link
          href={`/admin/projects/edit/${project.id}`}
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
        >
          <SquarePen size={18} className="text-blue-600" />
        </Link>
      </div>
    </div>
  );
}
