'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('category') || '';

  useEffect(() => {
    fetch('/api/admin/tutorial-categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  function setCategoryFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set('category', slug);
    else params.delete('category');
    router.push(`/tutorials?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected ? 'outline' : 'default'}
        onClick={() => setCategoryFilter('')}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={cat.slug === selected ? 'default' : 'outline'}
          onClick={() => setCategoryFilter(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
