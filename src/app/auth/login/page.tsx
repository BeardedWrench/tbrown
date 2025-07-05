'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace('/admin/dashboard');
      }
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error || !data.session) {
      setError(error?.message || 'Login failed');
    } else {
      router.push('/admin/dashboard');
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 max-w-md mx-auto p-4 bg-white border rounded shadow"
    >
      <h1 className="text-xl font-bold text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 w-full rounded hover:bg-gray-900"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
