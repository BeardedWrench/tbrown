import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: { category: string; slug: string };
}

export default async function ProjectDetailPage(_: Props) {
  const { slug, category } = await (async () => _?.params ?? {})();

  if (typeof slug !== 'string') return notFound();

  const project = await prisma.project.findFirst({
    where: {
      slug: slug,
      category: {
        slug: category,
      },
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!project) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

      <div className="text-sm text-gray-500 mb-4">
        Category:{' '}
        <Link href={`/projects/${project.category?.slug}`}>
          <span className="underline hover:text-blue-600">
            {project.category?.name}
          </span>
        </Link>
      </div>

      {project.coverImage && (
        <div className="mb-6">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={800}
            height={600}
            className="rounded-md w-full object-cover"
          />
        </div>
      )}

      <p className="text-lg text-gray-700 mb-6">{project.description}</p>

      {project.techStack?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="bg-slate-100 text-sm px-3 py-1 rounded-full text-gray-700"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Live Site
          </Link>
        )}
        {project.repo && (
          <Link
            href={project.repo}
            target="_blank"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            View Code
          </Link>
        )}
      </div>
    </section>
  );
}
