import { AuthNavbar } from '@/components/auth/authNavbar';

export default function authLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthNavbar />
      <section className="flex items-center h-full justify-center">{children}</section>
    </>
  );
}
