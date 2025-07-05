'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: string;
  tags?: string[];
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  createdAt,
  tags = [],
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-600">{excerpt}</p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700"
          >
            #{tag}
          </span>
        ))}
        <span className="ml-auto">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
