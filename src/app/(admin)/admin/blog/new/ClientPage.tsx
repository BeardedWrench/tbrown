'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadImage } from '@/lib/supabase/media-client';
import Image from 'next/image';
import { PostCategory } from '@prisma/client';

const mdParser = new MarkdownIt();

interface Props {
  categories: PostCategory[];
}

export default function NewPostClientPage({ categories }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [postCategoryId, setPostCategoryId] = useState<string>('');

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file, 'blog-images');
    if (url) setCoverImage(url);
    setUploading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        excerpt,
        content,
        coverImage,
        published,
        postCategoryId,
      }),
    });

    setLoading(false);

    if (res.ok) {
      // const data = await res.json();
      router.push(`/admin/blog`);
    } else {
      const { error } = await res.json();
      setError(error ?? 'Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

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
          placeholder="Excerpt (optional)"
          className="w-full border p-2 rounded"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <select
          value={postCategoryId}
          onChange={(e) => setPostCategoryId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
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

        <MdEditor
          value={content}
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setContent(text)}
        />

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publish
          </label>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Post'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
