import { LoginButton } from '@/components/auth/loginButton';
import ModeToggle from '@/components/toggleMode';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <header className="border-b p-2 flex justify-end">
        <ModeToggle />
      </header>
      <main className="flex h-full flex-col items-center justify-center space-y-6">
        <section className="bg-card gap-6 rounded-xl border p-16 shadow-sm text-center space-y-6">
          <section className="space-y-6 text-center">
            <h1 className="text-4xl font-bold">ENTRAR</h1>
            <p className="text-lg">gerenciador de usuários simples</p>
          </section>

          <LoginButton mode="modal" asChild>
            <Button size="lg" className="cursor-pointer w-full">
              ENTRAR
            </Button>
          </LoginButton>
        </section>
      </main>
    </>
  );
}
