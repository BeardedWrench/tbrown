import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/blog/data';
import { getRecentProjects } from '@/lib/projects/data';

export default async function Home() {
  const [recentPosts, recentProjects] = await Promise.all([
    getRecentBlogPosts(3),
    getRecentProjects(3),
  ]);

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I&apos;m Terry
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          aka{' '}
          <span className="font-semibold text-blue-500">@beardedwrench</span>
        </p>
        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          I’m a full-stack software engineer, indie hacker, and all-around maker
          who loves turning ambitious ideas into reality. Whether I’m building
          web apps, launching tools, or exploring the edges of what&apos;s
          possible with AI, I always aim for clean code, elegant design, and
          real-world utility.
        </p>
        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This site is my digital workshop — a home for my latest projects, blog
          posts, tutorials, and experiments. If you&apos;re into thoughtful
          engineering, UI design, and creative problem solving, you&apos;re in
          the right place.
        </p>
      </section>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Blog Posts</h2>
          <Link href="/blog" className="text-blue-500 hover:underline text-sm">
            View All
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
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
        )}
      </section>
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

        {recentProjects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
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
        )}
      </section>
    </main>
  );
}
