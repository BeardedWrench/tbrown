'use client';

import Link from 'next/link';

export function AdminStatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} key={label}>
      <div className="rounded-xl p-4 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {value}
        </p>
      </div>
    </Link>
  );
}
