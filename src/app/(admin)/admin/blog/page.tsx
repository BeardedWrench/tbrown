import { prisma } from '@/lib/prisma';
import BlogClient from './BlogClient';

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      author: true,
    },
  });

  return <BlogClient posts={posts} />;
}
