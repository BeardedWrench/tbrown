'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCategory } from '@prisma/client';
import { uploadImage } from '@/lib/supabase/media-client';
import Image from 'next/image';

interface Props {
  categories: ProjectCategory[];
  project: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    url: string;
    repo: string;
    techStack: string[];
    featured: boolean;
    projectCategoryId: string;
  };
}

export default function ProjectEditorForm({ categories, project }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [coverImage, setCoverImage] = useState(project.coverImage);
  const [url, setUrl] = useState(project.url);
  const [repo, setRepo] = useState(project.repo);
  const [techStack, setTechStack] = useState(project.techStack.join(', '));
  const [featured, setFeatured] = useState(project.featured);
  const [projectCategoryId, setProjectCategoryId] = useState(
    project.projectCategoryId
  );
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'project-images');
    if (url) setCoverImage(url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PUT',
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
        projectCategoryId,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const { error } = await res.json();
      setError(error ?? 'Failed to update project');
      return;
    }

    router.push('/admin/projects');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Description"
        rows={3}
        required
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Live URL"
      />
      <input
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="GitHub Repo"
      />
      <input
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Tech Stack (comma separated)"
      />

      <select
        value={projectCategoryId}
        onChange={(e) => setProjectCategoryId(e.target.value)}
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

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Feature this project
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Project'}
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
