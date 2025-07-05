import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { Sidebar } from './components/Sidebar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <SiteNavbar />
      <div className="mx-auto w-full max-w-7xl grid grid-cols-[240px_1fr]">
        <Sidebar />
        <main className="min-h-screen px-6 py-10 text-black dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
