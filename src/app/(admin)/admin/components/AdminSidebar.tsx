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
  Tag,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Layers },
  { name: 'Tutorials', href: '/admin/tutorials', icon: BookOpen },
  { name: 'Categories And Tags', href: '/admin/categories-tags', icon: Tag },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
export function AdminSidebar() {
  const pathname = usePathname();

  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.href = '/';
  };

  return (
    <aside className="w-64 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 min-h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <div className="flex flex-col justify-between flex-1">
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

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:text-white hover:bg-red-400 text-center transition-colors hover:cursor-pointer
"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
