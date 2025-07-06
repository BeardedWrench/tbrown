import BlogClient from './BlogClient';
import { getAllBlogPosts } from '@/lib/blog/data';

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return <BlogClient posts={posts} />;
}
