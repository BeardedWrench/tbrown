'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CategoryManager from './components/CategoryManager';
import TagManager from './components/TagManager';

export default function CategoriesTagsPage() {
  const [tab, setTab] = useState('post');

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Categories & Tags</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="post">Post Categories</TabsTrigger>
          <TabsTrigger value="tutorial">Tutorial Categories</TabsTrigger>
          <TabsTrigger value="project">Project Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <CategoryManager
            title="Post Categories"
            type="post"
            fetchUrl="/api/admin/post-categories"
          />
        </TabsContent>

        <TabsContent value="tutorial">
          <CategoryManager
            title="Tutorial Categories"
            type="tutorial"
            fetchUrl="/api/admin/tutorial-categories"
          />
        </TabsContent>

        <TabsContent value="project">
          <CategoryManager
            title="Project Categories"
            type="project"
            fetchUrl="/api/admin/project-categories"
          />
        </TabsContent>

        <TabsContent value="tags">
          <TagManager fetchUrl="/api/admin/tags" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
