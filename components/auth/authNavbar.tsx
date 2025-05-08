'use client';

import { UserCircle } from 'lucide-react';

import ModeToggle from '@/components/toggleMode';
import Link from 'next/link';

export function AuthNavbar() {
  return (
    <nav className="border-b p-4 shadow-md  mx-auto flex flex-col md:flex-row justify-between items-center">
      <Link
        href={'/'}
        className="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex items-center mb-4 md:mb-0">
          <UserCircle className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Gerenciamento de Usuários</span>
        </div>
      </Link>

      <ModeToggle />
    </nav>
  );
}
