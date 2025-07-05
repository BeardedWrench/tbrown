import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';
// import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { redirect } from 'next/navigation';
import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClientFromHeaders();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const user = await getUserFromRequest();
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
