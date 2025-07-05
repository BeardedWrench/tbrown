'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface BlogFilterProps {
  categories: { name: string }[];
  selected: string | null;
}

export function BlogFilter({ categories, selected }: BlogFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
      params.set('page', '1');
    } else {
      params.delete('category');
      params.set('page', '1');
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        onClick={() => handleSelect(null)}
        className={`rounded-full px-4 py-1 text-sm transition ${
          selected === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map(({ name }) => (
        <button
          key={name}
          onClick={() => handleSelect(name)}
          className={`rounded-full px-4 py-1 text-sm transition ${
            selected === name
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
