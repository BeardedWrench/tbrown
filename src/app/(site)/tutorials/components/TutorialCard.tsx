import Link from 'next/link';

interface Props {
  tutorial: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
  };
}

export default function TutorialCard({ tutorial }: Props) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      {tutorial.coverImage && (
        <img
          src={tutorial.coverImage}
          alt={tutorial.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{tutorial.title}</h3>
        {tutorial.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tutorial.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
