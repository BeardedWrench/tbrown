/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Divider } from '@/components/ui/divider';
import { formatDate } from '@/lib/utils';
import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  post: Post;
}

export function BlogPostBody({ post }: Props) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 mb-2 text-4xl font-bold">{post.title}</h1>

      <p className="text-gray-500 text-sm">{formatDate(post.createdAt)}</p>
      {post.coverImage && (
        <div className="relative">
          <div className="my-6 aspect-[3/1] w-full max-w-4xl mx-auto">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
      <Divider />
      <div className="prose max-w-none break-words whitespace-pre-wrap">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mt-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold mt-4" {...props} />
            ),
            code: ({ node, ...props }) => (
              <code className="break-words whitespace-pre-wrap" {...props} />
            ),
          }}
        >
          {post.content.trim().replace(/^\s{2,}/gm, '')}
        </Markdown>
      </div>
    </article>
  );
}
