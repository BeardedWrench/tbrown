/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import TutorialCard from './components/TutorialCard';
import SearchBar from './components/SearchBar';
import { getTutorials } from '@/lib/tutorials/data';
import CategoryFilter from './components/CategoryFilter';

async function TutorialFilters() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <SearchBar />
      <CategoryFilter />
    </div>
  );
}

export default async function TutorialsPage() {
  const tutorials = await getTutorials({ search: '', category: '' });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Tutorials</h1>

      <Suspense fallback={<div>Loading filters...</div>}>
        <TutorialFilters />
      </Suspense>

      {tutorials.length === 0 ? (
        <p className="text-muted-foreground">No tutorials found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial: any) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      )}
    </div>
  );
}
