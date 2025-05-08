import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { UserTable } from '@/app/dashboard/_components/userTable';
import { adminUser, getAllUsers } from '@/data/user';
import { UserTableSkeleton } from '@/components/skeletons/userTableSkeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const isAdmin = await adminUser(session.user.id);

  if (!isAdmin) {
    redirect('/dashboard');
  }

  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold">Área do Administrador</h1>
        <p className=" mt-2">Gerencie os usuários da plataforma</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Lista de todos os usuários cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Suspense fallback={<UserTableSkeleton />}>
            <UserTable users={users} currentUserId={session.user.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
