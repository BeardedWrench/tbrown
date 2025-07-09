import {
  getProjectCategoryBySlug,
  getProjectsByCategorySlug,
} from '@/lib/projects/data';
import { notFound } from 'next/navigation';
import ProjectCard from '../components/ProjectCard';

export default async function CategoriesPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;

  if (typeof category !== 'string') return notFound();

  const categoryData = await getProjectCategoryBySlug(category);
  if (!categoryData) return notFound();

  const projects = await getProjectsByCategorySlug(category);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{categoryData.name} Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              categorySlug={category}
            />
          ))}
        </div>
      )}
    </section>
  );
}
