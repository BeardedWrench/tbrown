import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blog/data';
import { BlogPostBody } from '../components/BlogPostBody';

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage(_: Props) {
  const { slug } = await (async () => _?.params ?? {})();

  if (typeof slug !== 'string') return notFound();

  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) return notFound();

  return <BlogPostBody post={post} />;
}
