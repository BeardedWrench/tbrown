'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function TagManager({ fetchUrl }: { fetchUrl: string }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTags();
  }, [fetchUrl]);

  async function fetchTags() {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    setTags(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(fetchUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId ?? undefined,
        name,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || 'Something went wrong');
    } else {
      setName('');
      setEditingId(null);
      fetchTags();
    }

    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    await fetch(fetchUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchTags();
  }

  function startEdit(tag: Tag) {
    setName(tag.name);
    setEditingId(tag.id);
  }

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold">Tags</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
        <Input
          placeholder="Tag Name"
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
              setName('');
              setEditingId(null);
            }}
          >
            Cancel
          </Button>
        )}
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="flex items-center justify-between border px-4 py-2 rounded"
          >
            <div>
              <div className="font-medium">{tag.name}</div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(tag)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(tag.id)}
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
