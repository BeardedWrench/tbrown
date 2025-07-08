import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/blog/data';
import { getRecentProjects } from '@/lib/projects/data';
import { getBio } from '@/lib/utils/settings';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({
  html: true,
});

export default async function Home() {
  const [recentPosts, recentProjects, bio] = await Promise.all([
    getRecentBlogPosts(3),
    getRecentProjects(3),
    getBio(),
  ]);

  const rawHtml = md.render(bio ?? '');

  const formattedHtml = rawHtml.replace(
    /<p(?![^>]*class=)/g,
    `<p class="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"`
  );

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I&apos;m Terry
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          aka{' '}
          <span className="font-semibold text-blue-500">@BeardedWrench</span>
        </p>

        <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
      </section>
      {recentPosts.length != 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Blog Posts</h2>
            <Link
              href="/blog"
              className="text-blue-500 hover:underline text-sm"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="border rounded-md p-4 bg-white dark:bg-neutral-900 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.excerpt ?? post.content.slice(0, 150)}...
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentProjects.length != 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <Link
              href="/projects"
              className="text-blue-500 hover:underline text-sm"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.category?.slug ?? 'uncategorized'}/${
                  project.slug
                }`}
                className="border rounded-md p-4 bg-white dark:bg-neutral-900 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
