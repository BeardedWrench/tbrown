'use client';

import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Image from 'next/image';
import { uploadImage } from '@/lib/supabase/media-client';
import { useRouter } from 'next/navigation';
import { PostCategory } from '@prisma/client';

const mdParser = new MarkdownIt();

interface Props {
  categories: PostCategory[];
  post: {
    id: string;
    title: string;
    excerpt?: string;
    content: string;
    published: boolean;
    coverImage?: string;
    postCategoryId?: string;
  };
}

export default function BlogEditorForm({ post, categories }: Props) {
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt ?? '');
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [coverImage, setCoverImage] = useState(post.coverImage ?? '');
  const [uploading, setUploading] = useState(false);
  const [postCategoryId, setPostCategoryId] = useState<string>(
    post.postCategoryId ?? ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file, 'blog-images');
    if (url) setCoverImage(url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch(`/api/admin/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        excerpt,
        content,
        published,
        coverImage,
        postCategoryId,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const { error } = await res.json();
      setError(error ?? 'Failed to update post');
      return;
    }

    router.push('/admin/blog');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Excerpt (optional)</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

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
        <label className="block font-medium mb-1">Content</label>
        <MdEditor
          value={content}
          style={{ height: '400px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setContent(text)}
        />
      </div>

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

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Update Post'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
