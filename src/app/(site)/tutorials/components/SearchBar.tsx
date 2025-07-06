'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set('q', q);
    else params.delete('q');
    router.push(`/tutorials?${params.toString()}`);
  }

  return (
    <Input
      placeholder="Search tutorials..."
      defaultValue={searchParams.get('q') || ''}
      onChange={handleSearch}
      className="w-full sm:w-64"
    />
  );
}
