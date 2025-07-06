'use client';

import { TutorialWithCategory } from '@/types/withCategories';

interface Props {
  tutorials: TutorialWithCategory[];
}

export default function TutorialsClientPage({ tutorials }: Props) {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id}>{tutorial.title}</div>
        ))}
      </div>
    </div>
  );
}
