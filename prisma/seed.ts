// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Ensure the category exists
//   const category = await prisma.category.upsert({
//     where: { slug: 'tech' },
//     update: {},
//     create: {
//       name: 'Tech',
//       slug: 'tech',
//     },
//   });

//   await prisma.post.create({
//     data: {
//       title: 'Getting Started with Supabase and Prisma',
//       slug: 'getting-started-with-supabase-and-prisma',
//       excerpt: 'Learn how to use Supabase with Prisma in a modern Next.js app.',
//       content: `
//           ## Introduction

//           Supabase is an open-source Firebase alternative that provides a powerful backend for your applications. Prisma offers a great way to manage your database schema and query your data easily.

//           In this article, we’ll walk through setting up Prisma with Supabase in a Next.js project.

//           ## Steps

//           1. Setup Supabase Project
//           2. Configure .env with Supabase credentials
//           3. Define your Prisma schema
//           4. Run migrations
//           5. Generate client & seed your DB

//           That's it!

//           ## Conclusion

//           Supabase + Prisma gives you a modern, powerful backend stack. Happy building!
//         `,
//       categoryId: category.id,
//       published: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       coverImage: 'https://source.unsplash.com/featured/?technology,code',
//       authorId: 'a30b8f2f-ddb1-430d-bb2a-7589ab8b7a1c', // Replace with valid User.id
//     },
//   });

//   await prisma.role.createMany({
//     data: [{ name: 'admin' }, { name: 'editor' }, { name: 'viewer' }],
//     skipDuplicates: true,
//   });

//   console.log('✅ Seed complete');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
