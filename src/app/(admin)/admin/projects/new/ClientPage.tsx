'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/lib/supabase/media-client';
import Image from 'next/image';
import { ProjectCategory } from '@prisma/client';

interface Props {
  categories: ProjectCategory[];
}

export default function NewProjectClientPage({ categories }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [repo, setRepo] = useState('');
  const [url, setUrl] = useState('');
  const [techStack, setTechStack] = useState('');
  const [featured, setFeatured] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file, 'project-images');
    if (url) setCoverImage(url);
    setUploading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        description,
        coverImage,
        url,
        repo,
        techStack: techStack.split(',').map((t) => t.trim()),
        featured,
        projectCategoryId: categoryId,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/admin/projects');
    } else {
      const { error } = await res.json();
      setError(error?.message ?? 'Failed to create project');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div>
          <label className="block font-medium mb-1">Cover Image</label>
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover"
              width={600}
              height={300}
              className="rounded mb-2"
              style={{ height: 'auto' }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Project URL (optional)"
          className="w-full border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Repo URL (optional)"
          className="w-full border p-2 rounded"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tech Stack (comma-separated)"
          className="w-full border p-2 rounded"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Mark as featured
        </label>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>

        {error && (
          <pre className="text-red-600 whitespace-pre-wrap">
            {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
