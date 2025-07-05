'use client';

import { User } from '@supabase/supabase-js';
import { AdminStatCard } from '../components/AdminStatCard';

interface Props {
  user: User;
  stats: {
    posts: number;
    projects: number;
    tutorials: number;
    users: number;
  };
}

export default function DashboardClient({ user, stats }: Props) {
  const cards = [
    { name: 'Blog Posts', href: '/admin/blog', count: stats.posts },
    { name: 'Projects', href: '/admin/projects', count: stats.projects },
    { name: 'Tutorials', href: '/admin/tutorials', count: stats.tutorials },
    { name: 'Users', href: '/admin/users', count: stats.users },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ name, href, count }) => (
          <AdminStatCard key={name} label={name} href={href} value={count} />
        ))}
      </div>
    </div>
  );
}
