import { PostCategory } from '@prisma/client';
import NewPostClientPage from './ClientPage';
import { getAllCategories } from '@/lib/categories/data';

export default async function NewPostPage() {
  const blogCategories: PostCategory[] = await getAllCategories('post');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewPostClientPage categories={blogCategories} />
    </div>
  );
}
