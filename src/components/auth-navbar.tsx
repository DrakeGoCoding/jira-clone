'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const AuthNavbar = () => {
  const pathname = usePathname();

  const isSignIn = pathname === '/sign-in';

  return (
    <nav className="flex items-center justify-between">
      <Image src="/logo.svg" alt="Logo" width={152} height={56} />
      <Button asChild variant="secondary">
        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
          {isSignIn ? 'Sign Up' : 'Login'}
        </Link>
      </Button>
    </nav>
  );
};
