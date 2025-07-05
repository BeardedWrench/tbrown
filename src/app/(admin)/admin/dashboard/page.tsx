import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUserFromRequest();
  if (!user) redirect('/auth/login');

  const [posts, projects, tutorials, users] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.tutorial.count(),
    prisma.user.count(),
  ]);

  return (
    <DashboardClient
      user={user}
      stats={{
        posts,
        projects,
        tutorials,
        users,
      }}
    />
  );
}
