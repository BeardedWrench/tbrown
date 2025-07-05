import { createSupabaseServerClientFromHeaders } from './server';

export async function listImagesFromBucket(folder: string = '') {
  const supabase = await createSupabaseServerClientFromHeaders();
  const { data, error } = await supabase.storage
    .from('site-assets')
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('[Error]', error.message || error);
    throw new Error(error.message || 'Unknown error');
  }
  return data ?? [];
}

export async function getPublicImageUrl(path: string) {
  const supabase = await createSupabaseServerClientFromHeaders();
  const { data } = supabase.storage.from('site-assets').getPublicUrl(path);
  return data.publicUrl;
}
