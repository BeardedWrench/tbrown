'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@prisma/client';

interface Props {
  posts: (Post & {
    category: { name: string } | null;
    author: { email: string } | null;
  })[];
}

export default function BlogClient({ posts }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Author</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-neutral-100 dark:border-neutral-800"
                >
                  <td className="px-2 py-2">{post.title}</td>
                  <td className="px-2 py-2">{post.category?.name ?? '—'}</td>
                  <td className="px-2 py-2">{post.author?.email ?? '—'}</td>
                  <td className="px-2 py-2">
                    {post.published ? (
                      <span className="text-green-600 font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Draft</span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-right space-x-2">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
