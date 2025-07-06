import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerClientFromRequest } from '@/lib/supabase/server';

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/api/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const supabase = await createSupabaseServerClientFromRequest(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const res = NextResponse.next();
  res.headers.set('x-user-id', user.id);
  res.headers.set('x-user-email', user.email ?? '');

  if (req.nextUrl.pathname.startsWith('/admin')) {
    res.headers.set('x-requires-role-check', 'true');
  }

  return res;
}
