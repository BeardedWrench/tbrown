'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaGithub,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export function Sidebar() {
  return (
    <aside className="w-full h-full p-6 bg-transparent">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="https://tgahbosqsaxvsheqbjdu.supabase.co/storage/v1/object/public/site-assets/avatars/skull.jpeg"
          alt="Avatar"
          width={256}
          height={256}
          className="rounded-full"
        />

        <div className="flex flex-col gap-2 mt-4 text-sm w-full text-neutral-700 dark:text-neutral-300">
          <div className="grid grid-col-1 gap-1 mb-5">
            <p className="font-bold text-xl text-blue-500">BeardedWrench</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full-Stack Engineer
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={16} />
            <span>Clearwater, FL</span>
          </div>
          <Link
            href="https://github.com/beardedwrench"
            target="_blank"
            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <FaGithub size={16} />
            <span>beardedwrench</span>
          </Link>
          <Link
            href="mailto:tabrownj@gmail.com"
            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <FaEnvelope size={16} />
            <span>Email</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/tabrownj/"
            target="_blank"
            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <FaLinkedin size={16} />
            <span>LinkedIn</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
