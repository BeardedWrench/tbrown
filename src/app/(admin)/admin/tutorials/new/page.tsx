/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTags } from '@/lib/tags/data';
import TutorialForm from '../components/TutorialForm';
import { getTutorialCategories } from '@/lib/tutorials/data';
import { createTutorial } from '@/lib/tutorials/data';
import { redirect } from 'next/navigation';

export default async function NewTutorialPage() {
  const categories = await getTutorialCategories();
  const tags = await getAllTags();

  async function handleSubmit(data: any) {
    'use server';
    const slug = data.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    await createTutorial({
      ...data,
      slug,
      published: false,
    });
    redirect('/admin/tutorials');
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">New Tutorial</h1>
      <TutorialForm
        categories={categories}
        tags={tags}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
