'use client';

import { TutorialWithCategory } from '@/types/withCategories';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  tutorials: TutorialWithCategory[];
}

export default function TutorialsClientPage({ tutorials }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tutorial?')) return;
    const res = await fetch(`/api/admin/tutorials/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Manage Tutorials</h1>
        <Link
          href="/admin/tutorials/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          New Tutorial
        </Link>
      </div>

      {tutorials.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tutorials found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
          {tutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              className="group hover:shadow-md transition"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {tutorial.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 space-x-3">
                {tutorial.category && (
                  <Badge variant="secondary" className="text-xs">
                    {tutorial.category.name}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {tutorial.difficulty}
                </Badge>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Link href={`/admin/tutorials/edit/${tutorial.id}`}>
                  <Button size="icon" variant="ghost">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(tutorial.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
