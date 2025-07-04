import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

export async function middleware(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies: () => cookies() })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/role`, {
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
  })

  const { role } = await res.json()

  if (req.nextUrl.pathname.startsWith('/admin') && !['admin', 'editor'].includes(role)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}