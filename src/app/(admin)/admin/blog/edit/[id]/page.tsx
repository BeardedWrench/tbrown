import { notFound } from 'next/navigation';
import { getBlogCategories, getBlogPostById } from '@/lib/blog/data';
import BlogEditorForm from '../../components/BlogEditorForm';
import { PostCategory } from '@prisma/client';

interface Props {
  params: { id?: string };
}

export default async function EditBlogPostPage(_: Props) {
  const { id } = await (async () => _?.params ?? {})();

  if (typeof id !== 'string') return notFound();

  const post = await getBlogPostById(id);
  if (!post) return notFound();

  const blogCategories: PostCategory[] = await getBlogCategories();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <BlogEditorForm
        categories={blogCategories}
        post={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt ?? undefined,
          content: post.content,
          published: post.published,
          coverImage: post.coverImage ?? undefined,
          postCategoryId: post.postCategoryId ?? undefined,
        }}
      />
    </div>
  );
}
