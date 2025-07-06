/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjectCategories } from '@/lib/projects/data';
import Link from 'next/link';

export default async function ProjectsPage() {
  const categories = await getProjectCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Project Categories</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/projects/${cat.slug}`}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {cat._count.projects} project
              {cat._count.projects === 1 ? '' : 's'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
