import { prisma } from '@/lib/prisma';
import { PostCategory } from '@prisma/client';
import NewPostClientPage from './ClientPage';

export default async function NewPostPage() {
  const blogCategories: PostCategory[] = await prisma.postCategory.findMany();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewPostClientPage categories={blogCategories} />
    </div>
  );
}
