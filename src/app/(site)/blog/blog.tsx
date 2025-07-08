'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogCard } from './components/BlogCard';
import { BlogFilter } from './components/BlogFilter';
import { BlogPagination } from './components/BlogPagination';
import { Post, PostCategory } from '@prisma/client';

export function Blog() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? undefined;
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = 6;

  const [data, setData] = useState<{
    posts: Post[];
    categories: PostCategory[];
    total: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/blog?category=${category ?? ''}&page=${page}`
      );
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [category, page]);

  if (!data) return <div className="p-10">Loading...</div>;

  const totalPages = Math.ceil(data.total / pageSize);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
        Blog
      </h1>
      <BlogFilter categories={data.categories} selected={category ?? null} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          data.posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt ?? ''}
              createdAt={post.createdAt.toString()}
              coverImage={post.coverImage}
              tags={[]} // Add tags later
            />
          ))
        )}
      </div>
      <BlogPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
