'use client'

import type { User } from '@supabase/supabase-js'

export default function DashboardClient({ user }: { user: User }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  )
}