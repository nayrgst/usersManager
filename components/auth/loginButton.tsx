'use client';

import { useRouter } from 'next/navigation';
import { Credenza, CredenzaContent, CredenzaTitle, CredenzaTrigger } from '../ui/credenza';
import { LoginForm } from './loginForm';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButon = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  if (mode == 'modal') {
    return (
      <Credenza>
        <CredenzaTrigger asChild={asChild}>{children}</CredenzaTrigger>
        <CredenzaContent className=" flex justify-center items-center m-auto p-0 bg-transparent border-none">
          <CredenzaTitle className="text-center"></CredenzaTitle>
          <LoginForm />
        </CredenzaContent>
      </Credenza>
    );
  }

  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  );
};
