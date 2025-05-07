'use client';

import { useRouter } from 'next/navigation';
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaTrigger,
} from '../ui/credenza';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: true | undefined;
}

export function LoginButton({ children, mode, asChild }: LoginButtonProps) {
  const router = useRouter();

  if (mode == 'modal') {
    <Credenza>
      <CredenzaTrigger asChild={asChild}>{children}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaFooter>
          <CredenzaClose asChild={asChild}>
            <button>Close</button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>;
  }

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  );
}
