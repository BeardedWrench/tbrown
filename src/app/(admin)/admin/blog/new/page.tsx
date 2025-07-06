import { PostCategory } from '@prisma/client';
import NewPostClientPage from './ClientPage';
import { getBlogCategories } from '@/lib/blog/data';

export default async function NewPostPage() {
  const blogCategories: PostCategory[] = await getBlogCategories();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewPostClientPage categories={blogCategories} />
    </div>
  );
}
