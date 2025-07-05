import { AdminSidebar } from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
