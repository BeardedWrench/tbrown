// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function main() {
// //   // Ensure the category exists
// //   const category = await prisma.category.upsert({
// //     where: { slug: 'tech' },
// //     update: {},
// //     create: {
// //       name: 'Tech',
// //       slug: 'tech',
// //     },
// //   });

// //   await prisma.post.create({
// //     data: {
// //       title: 'Getting Started with Supabase and Prisma',
// //       slug: 'getting-started-with-supabase-and-prisma',
// //       excerpt: 'Learn how to use Supabase with Prisma in a modern Next.js app.',
// //       content: `
// //           ## Introduction

// //           Supabase is an open-source Firebase alternative that provides a powerful backend for your applications. Prisma offers a great way to manage your database schema and query your data easily.

// //           In this article, we’ll walk through setting up Prisma with Supabase in a Next.js project.

// //           ## Steps

// //           1. Setup Supabase Project
// //           2. Configure .env with Supabase credentials
// //           3. Define your Prisma schema
// //           4. Run migrations
// //           5. Generate client & seed your DB

// //           That's it!

// //           ## Conclusion

// //           Supabase + Prisma gives you a modern, powerful backend stack. Happy building!
// //         `,
// //       categoryId: category.id,
// //       published: true,
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //       coverImage: 'https://source.unsplash.com/featured/?technology,code',
// //       authorId: 'a30b8f2f-ddb1-430d-bb2a-7589ab8b7a1c', // Replace with valid User.id
// //     },
// //   });

// //   await prisma.role.createMany({
// //     data: [{ name: 'admin' }, { name: 'editor' }, { name: 'viewer' }],
// //     skipDuplicates: true,
// //   });

// //   console.log('✅ Seed complete');
// // }

// // main()
// //   .catch((e) => {
// //     console.error(e);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });

// // scripts/seedCategories.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // --- Post Categories ---
  const postCategories = [
    'Engineering',
    'DevOps',
    'Design',
    'Career',
    'Tutorials',
    'Thoughts',
    'Life Updates',
  ];

  const createdPostCategories = await Promise.all(
    postCategories.map((name) =>
      prisma.postCategory.upsert({
        where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
        },
      })
    )
  );

  // --- Project Categories ---
  const projectCategories = [
    'Web',
    'Mobile Apps',
    'AI',
    'Utils',
    'Games',
    'Game Jams',
    'Collaborations',
    '3D & Pixel Art',
    'Code Snippets',
    'Experimental / Misc',
  ];

  const createdProjectCategories = await Promise.all(
    projectCategories.map((name) =>
      prisma.projectCategory.upsert({
        where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
        },
      })
    )
  );

  // --- Tutorial Categories ---
  const tutorialCategories = [
    'Frontend',
    'Backend',
    'Fullstack',
    'DevTools',
    'AI/ML',
    'Game Dev',
    'Swift/iOS',
    'Design Systems',
  ];

  const createdTutorialCategories = await Promise.all(
    tutorialCategories.map((name) =>
      prisma.tutorialCategory.upsert({
        where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
        },
      })
    )
  );

  // Sample project
  const projectWeb = createdProjectCategories.find((c) => c.slug === 'web');
  await prisma.project.create({
    data: {
      title: 'Modular Developer Portfolio',
      slug: 'modular-dev-portfolio',
      description:
        'A full-featured, modular personal portfolio built with Next.js and Tailwind.',
      coverImage: 'https://placehold.co/800x400?text=Portfolio',
      techStack: ['Next.js', 'Tailwind', 'Supabase'],
      featured: true,
      authorId: 'a30b8f2f-ddb1-430d-bb2a-7589ab8b7a1c',
      projectCategoryId: projectWeb?.id,
    },
  });

  // Sample post
  const postThoughts = createdPostCategories.find((c) => c.slug === 'thoughts');
  await prisma.post.create({
    data: {
      title: 'Why I Love Building Modular Systems',
      slug: 'why-modular-systems',
      content:
        'Modularity improves scalability, maintainability, and clarity...',
      excerpt:
        'Exploring the benefits of modular architecture in modern web development.',
      published: true,
      authorId: 'a30b8f2f-ddb1-430d-bb2a-7589ab8b7a1c',
      postCategoryId: postThoughts?.id,
      coverImage: 'https://placehold.co/800x400?text=Modularity',
    },
  });

  // Sample tutorial
  const tutFrontend = createdTutorialCategories.find(
    (c) => c.slug === 'frontend'
  );
  await prisma.tutorial.create({
    data: {
      title: 'Building a Donut Graph in SwiftUI',
      slug: 'donut-graph-swiftui',
      difficulty: 'INTERMEDIATE',
      tags: ['Swift', 'iOS', 'SwiftUI'],
      content:
        'Step-by-step on building a progress ring component using SwiftUI...',
      authorId: 'a30b8f2f-ddb1-430d-bb2a-7589ab8b7a1c',
      tutorialCategoryId: tutFrontend?.id,
    },
  });

  console.log('✅ Seed complete');
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect().finally(() => process.exit(1));
});
