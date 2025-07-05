import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/auth/role`, {
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { role } = await res.json();

  const isStaff = ['admin', 'editor'].includes(role);

  if (req.nextUrl.pathname.startsWith('/admin') && !isStaff) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
