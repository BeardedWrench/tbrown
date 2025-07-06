/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Pencil } from 'lucide-react';
import { CategoryType, Category } from '@/types/withCategories';

interface Props {
  title: string;
  type: CategoryType;
  fetchUrl: string;
}

export default function CategoryManager({ title, type, fetchUrl }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchUrl]);

  async function fetchCategories() {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    setCategories(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${fetchUrl}/${editingId}` : fetchUrl;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || 'Something went wrong');
    } else {
      setName('');
      setEditingId(null);
      fetchCategories();
    }

    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    await fetch(`${fetchUrl}/${id}`, { method: 'DELETE' });
    fetchCategories();
  }

  function startEdit(category: Category) {
    setName(category.name);
    setEditingId(category.id);
  }

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64"
          required
        />
        <Button type="submit" disabled={loading}>
          {editingId ? 'Update' : 'Add'}
        </Button>
        {editingId && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setEditingId(null);
              setName('');
            }}
          >
            Cancel
          </Button>
        )}
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between border px-4 py-2 rounded"
          >
            <span>{cat.name}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(cat)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(cat.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
