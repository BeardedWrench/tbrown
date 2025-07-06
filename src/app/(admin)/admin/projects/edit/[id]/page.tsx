import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects/data';
import { ProjectCategory } from '@prisma/client';
import ProjectEditorForm from '../../components/ProjectEditorForm';
import { getAllCategories } from '@/lib/categories/data';

interface Props {
  params: { id?: string };
}

export default async function EditProjectPage({ params }: Props) {
  const id = params?.id;
  if (!id) return notFound();

  const project = await getProjectById(id);
  if (!project) return notFound();

  const categories: ProjectCategory[] = await getAllCategories('project');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <ProjectEditorForm
        categories={categories}
        project={{
          id: project.id,
          title: project.title,
          description: project.description,
          coverImage: project.coverImage ?? '',
          url: project.url ?? '',
          repo: project.repo ?? '',
          techStack: project.techStack,
          featured: project.featured,
          projectCategoryId: project.projectCategoryId ?? '',
        }}
      />
    </div>
  );
}
