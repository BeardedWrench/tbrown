'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/lib/store/userStore';

export default function HydrateUser() {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    async function maybeLoadUser() {
      try {
        const res = await fetch('/api/auth/role');
        if (!res.ok) return;
        const user = await res.json();
        setUser(user);
      } catch {}
    }

    maybeLoadUser();
  }, [setUser]);

  return null;
}
