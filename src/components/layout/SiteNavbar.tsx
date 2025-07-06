'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User as UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/lib/store/userStore';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/tutorials', label: 'Tutorials' },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const { user, setUser } = useUserStore();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    location.href = '/';
  };

  const isStaff = user?.role === 'admin' || user?.role === 'editor';

  const avatar = (
    <Avatar className="cursor-pointer h-8 w-8">
      <AvatarImage src={user?.avatarUrl || ''} alt="avatar" />
      <AvatarFallback>
        <UserIcon className="h-6 w-6 text-gray-500" />
      </AvatarFallback>
    </Avatar>
  );

  return (
    <nav className="w-full border-b bg-white px-6 py-4 shadow-sm/2 mb-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-700">
          Terry Brown
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium hover:text-blue-600 transition-colors',
                pathname === link.href ? 'text-blue-600' : 'text-gray-700'
              )}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>{avatar}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user ? (
                <>
                  {isStaff && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-red-700">Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>{avatar}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navLinks.map((link) => (
                <DropdownMenuItem asChild key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              {isStaff && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
              )}
              {user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  <span className="text-red-700">Logout</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
