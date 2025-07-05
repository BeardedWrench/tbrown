'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      alert(error?.message || 'Signup failed');
      return;
    }

    await fetch('/api/auth/sync-user', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    router.push('/admin/dashboard');
  }

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input
        className="border w-full p-2"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border w-full p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-black text-white w-full p-2">
        Sign Up
      </button>
    </form>
  );
}
