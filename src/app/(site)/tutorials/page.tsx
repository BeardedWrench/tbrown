/* eslint-disable @typescript-eslint/no-explicit-any */
import TutorialCard from './components/TutorialCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import { getTutorials } from '@/lib/tutorials/data';

export default async function TutorialsPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const tutorials = await getTutorials({
    search: searchParams?.q || '',
    category: searchParams?.category || '',
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Tutorials</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <SearchBar />
        <CategoryFilter selected={searchParams?.category || ''} />
      </div>

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
