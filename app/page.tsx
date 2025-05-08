import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import ModeToggle from '@/components/toggleMode';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-5">
          <Link href={'/'} className="flex items-center mb-4 md:mb-0 cursor-pointer">
            <UserCircle className="size-6 mr-2" />
            <span className="text-xl font-bold">Gerenciamento de Usuários</span>
          </Link>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
            <Link href="/auth/login">
              <Button variant={'outline'} className="cursor-pointer">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant={'default'} className="cursor-pointer">
                Cadastrar
              </Button>
            </Link>

            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sistema de Gerenciamento de Usuários
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Uma aplicação web simples para gerenciar usuários.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/auth/register">
                <Button size="lg" className="cursor-pointer">
                  Começar agora
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant={'outline'} className="cursor-pointer">
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg shadow-xl bg-sidebar">
                <h3 className="text-xl font-semibold mb-3">Cadastro de Usuários</h3>
                <p>
                  Crie sua conta facilmente com nome, email e senha. Preencha também seu CEP para
                  obter automaticamente sua cidade e estado.
                </p>
              </div>
              <div className="p-6 rounded-lg shadow-xl bg-sidebar">
                <h3 className="text-xl font-semibold mb-3">Área do Usuário</h3>
                <p>Visualize seus dados pessoais em um painel intuitivo e de fácil acesso.</p>
              </div>
              <div className="p-6 rounded-lg shadow-xl bg-sidebar">
                <h3 className="text-xl font-semibold mb-3">Administração</h3>
                <p>Administradores podem visualizar, editar e excluir usuários da plataforma.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
