import { headers } from 'next/headers';

export async function absoluteUrl(path = '/') {
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  return `${protocol}://${host}${path}`;
}
