/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTags } from '@/lib/tags/data';
import {
  getTutorialById,
  getTutorialCategories,
  updateTutorialById,
} from '@/lib/tutorials/data';
import { redirect } from 'next/navigation';
import TutorialForm from '../../components/TutorialForm';

export default async function AdminTutorialEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const tutorial = await getTutorialById(id);
  const categories = await getTutorialCategories();
  const tags = await getAllTags();

  if (!tutorial) return <div>Not Found</div>;

  async function handleSubmit(data: any) {
    'use server';
    await updateTutorialById(id, data);
    redirect('/admin/tutorials');
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Tutorial</h1>
      <TutorialForm
        initialData={{
          id: tutorial.id,
          title: tutorial.title,
          content: tutorial.content,
          tutorialCategoryId:
            tutorial.tutorialCategoryId ?? tutorial.category?.id ?? '',
          tags: tutorial.tags ?? [],
        }}
        categories={categories}
        tags={tags}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
