import { redirect } from 'next/navigation';

import { AuthNavbar } from '@/components/auth-navbar';
import { getCurrent } from '@/features/auth/queries';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrent();

  if (user) {
    redirect('/');
  }

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <AuthNavbar />
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
