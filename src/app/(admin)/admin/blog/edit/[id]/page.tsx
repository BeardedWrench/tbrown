import { notFound } from 'next/navigation';
import { getBlogPostById } from '@/lib/blog/data';
import BlogEditorForm from '../../components/BlogEditorForm';
import { PostCategory } from '@prisma/client';
import { getAllCategories } from '@/lib/categories/data';

export default async function AdminEditBlogPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const post = await getBlogPostById(id);
  if (!post) return notFound();

  const blogCategories: PostCategory[] = await getAllCategories('post');

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
