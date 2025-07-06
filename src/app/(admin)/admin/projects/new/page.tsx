import { ProjectCategory } from '@prisma/client';
import NewProjectClientPage from './ClientPage';
import { getAllCategories } from '@/lib/categories/data';

export default async function NewProjectPage() {
  const categories: ProjectCategory[] = await getAllCategories('project');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewProjectClientPage categories={categories} />
    </div>
  );
}
