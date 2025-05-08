// app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { Navbar } from '@/app/dashboard/_components/navbar';
import { auth } from '@/auth';
import { adminUser } from '@/data/user';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const isAdmin = await adminUser(session.user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto p-6">{children}</main>
    </div>
  );
}
