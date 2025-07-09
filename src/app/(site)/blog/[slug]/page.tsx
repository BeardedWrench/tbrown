import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blog/data';
import { BlogPostBody } from '../components/BlogPostBody';

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  if (typeof slug !== 'string') return notFound();

  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) return notFound();

  return <BlogPostBody post={post} />;
}
