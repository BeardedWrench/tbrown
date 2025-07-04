'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'

type DBUser = {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  role: string
}

type SessionWithRole = {
  session: Session | null
  user: DBUser | null
}

export function useSession(): SessionWithRole {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<DBUser | null>(null)

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)

      if (data.session) {
        const res = await fetch('/api/auth/role')
        if (res.ok) {
          const dbUser = await res.json()
          setUser(dbUser)
        }
      }
    }

    getSessionAndUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session) {
        fetch('/api/auth/role')
          .then(res => res.ok ? res.json() : null)
          .then(setUser)
      } else {
        setUser(null)
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return { session, user }
}