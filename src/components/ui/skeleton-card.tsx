export function SkeletonCard() {
  return (
    <div className="w-full animate-pulse rounded-lg border bg-muted p-4 shadow">
      <div className="h-48 w-full rounded bg-gray-300" />
      <div className="mt-4 h-4 w-3/4 rounded bg-gray-300" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-300" />
    </div>
  );
}
