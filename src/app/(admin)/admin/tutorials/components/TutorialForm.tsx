/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tag, TutorialCategory } from '@prisma/client';

interface Props {
  initialData?: {
    id?: string;
    title?: string;
    content?: string;
    tutorialCategoryId?: string;
    tags?: Tag[];
  };
  categories: TutorialCategory[];
  tags: Tag[];
  onSubmit: (form: any) => Promise<void>;
}

export default function TutorialForm({
  initialData = {},
  categories,
  tags,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [categoryId, setCategoryId] = useState(
    initialData.tutorialCategoryId || ''
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData.tags?.map((t) => t.id) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit({ title, content, categoryId, tagIds: selectedTags });
    } catch {
      setError('Failed to save tutorial');
    }
    setLoading(false);
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Category</Label>
        <select
          className="w-full border rounded p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              type="button"
              key={tag.id}
              size="sm"
              variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          required
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Tutorial'}
      </Button>
    </form>
  );
}
