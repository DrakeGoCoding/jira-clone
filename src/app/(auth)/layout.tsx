import { AuthNavbar } from '@/components/auth-navbar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
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
