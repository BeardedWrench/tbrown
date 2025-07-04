import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getSetting(key: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('Setting')
    .select('value')
    .eq('key', key)
    .maybeSingle()
  return data?.value ?? null
}