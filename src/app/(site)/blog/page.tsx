import { Suspense } from 'react';
import { Blog } from './blog';

export default function BlogPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-10">Loading blog...</div>}>
        <Blog />
      </Suspense>
    </main>
  );
}
