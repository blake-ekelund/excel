'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar on auth-related pages
  const hideNavbar =
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/reset-password') ||
    pathname?.startsWith('/portal') ||
    pathname?.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}
