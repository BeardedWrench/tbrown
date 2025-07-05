/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export async function updatePost(id: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/blog/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? 'Update failed');
  }

  return res.json();
}
