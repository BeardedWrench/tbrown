'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Layers,
  BookOpen,
  Users,
  Settings,
} from 'lucide-react';

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Layers },
  { name: 'Tutorials', href: '/admin/tutorials', icon: BookOpen },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-blue-500 text-white'
                : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
