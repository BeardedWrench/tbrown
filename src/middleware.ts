// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };

// export async function middleware(req: NextRequest) {
//   const supabase = await createSupabaseServerClientFromHeaders();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   const res = await fetch(`${req.nextUrl.origin}/api/auth/role`, {
//     headers: {
//       cookie: req.headers.get('cookie') ?? '',
//     },
//   });

//   if (!res.ok) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   const { role } = await res.json();

//   const isStaff = ['admin', 'editor'].includes(role);

//   if (req.nextUrl.pathname.startsWith('/admin') && !isStaff) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { createSupabaseServerClientFromHeaders } from '@/lib/supabase/server';
// import { prisma } from '@/lib/prisma'; // make sure this is your singleton prisma client

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };

// export async function middleware(req: NextRequest) {
//   const supabase = await createSupabaseServerClientFromHeaders();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   const dbUser = await prisma.user.findUnique({
//     where: { id: user.id },
//     include: { role: true },
//   });

//   if (!dbUser || !dbUser.role) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   const role = dbUser.role.name;
//   const isStaff = ['admin', 'editor'].includes(role);

//   if (req.nextUrl.pathname.startsWith('/admin') && !isStaff) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

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

  // if it's an /admin route, enforce some header-based protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Middleware can't check DB roles, so frontend/server API must enforce role
    res.headers.set('x-requires-role-check', 'true');
  }

  return res;
}
