import { createSupabaseBrowserClient } from './client';

export async function uploadImage(file: File, folder: string = '') {
  const supabase = createSupabaseBrowserClient();
  const filePath = `${folder}/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from('site-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('[Upload Error]', error.message || error);
    throw new Error(error.message || 'Unknown upload error');
  }

  const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
  return data.publicUrl;
}
