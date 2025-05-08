'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserCircle, Users, LogOut } from 'lucide-react';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/toggleMode';

interface NavbarProps {
  isAdmin: boolean;
}

export function Navbar({ isAdmin }: NavbarProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <nav className="border-b p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href={'/dashboard'} className="flex items-center mb-4 md:mb-0">
          <UserCircle className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Gerenciamento de Usuários</span>
        </Link>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
          {isAdmin && (
            <>
              <Button variant={'outline'}>
                <Link href="/dashboard/admin" className={`flex items-center px-3 py-2 rounded-md`}>
                  <Users className="size-5 mr-2" />
                  <span>Gerenciar Usuários</span>
                </Link>
              </Button>
            </>
          )}

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="destructive"
            className="flex items-center cursor-pointer"
          >
            <LogOut className="size-5 mr-2" />
            <span>Sair</span>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
