import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserById } from '@/data/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, User as UserIcon, CalendarDays } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect('/auth/login');
  }

  const createdAt = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 w-1/2 mx-auto">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold ">Bem-vindo, {user.name}!</h1>
        <p className="mt-2">Aqui você pode visualizar e gerenciar suas informações.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Seus dados</CardTitle>
          <CardDescription>Informações do seu perfil</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="size-5 mr-3 " />
              <div className="space-y-1">
                <p className="text-sm font-medium ">Nome</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="size-5 mr-3 " />
              <div className="space-y-1">
                <p className="text-sm font-medium ">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.cep && (
              <div className="flex items-center">
                <MapPin className="size-5 mr-3 " />
                <div className="space-y-1">
                  <p className="text-sm font-medium ">Endereço</p>
                  <p className="font-medium">
                    CEP: {user.cep}
                    {user.city && user.state && ` - ${user.city}, ${user.state}`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <CalendarDays className="size-5 mr-3 " />
              <div className="space-y-1">
                <p className="text-sm font-medium ">Data de cadastro</p>
                <p className="font-medium">{createdAt}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
