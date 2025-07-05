/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

interface Props {
  tech: string;
}

export default function AdminProjectCardPill({ tech }: Props) {
  return (
    <span className="inline-block rounded-md bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
      {tech.toUpperCase()}
    </span>
  );
}
