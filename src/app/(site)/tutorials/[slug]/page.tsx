/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from 'next/navigation';
import { getTutorialBySlug } from '@/lib/tutorials/data';
import { Badge } from '@/components/ui/badge';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/utils';

export default async function TutorialsDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{tutorial.title}</h1>

      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-muted-foreground">
        <span>{formatDate(tutorial.createdAt)}</span>
        {tutorial.category && (
          <Badge variant="outline">{tutorial.category.name}</Badge>
        )}
        {tutorial.tags?.map((tag) => (
          <Badge key={tag.id} variant="secondary">
            {tag.name}
          </Badge>
        ))}
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
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
          {tutorial.content.trim().replace(/^\s{2,}/gm, '')}
        </Markdown>
      </article>
    </div>
  );
}
