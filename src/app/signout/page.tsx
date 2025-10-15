'use client';

import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

export default function SignOutPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      await supabase.auth.signOut();
      router.push('/login');
    };
    signOutUser();
  }, [supabase, router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-emerald-50 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-emerald-100 rounded-2xl shadow-md p-10 max-w-md"
      >
        <LogOut className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">Signing you out...</h1>
        <p className="text-sm text-neutral-600">
          You’ll be redirected to the login page in a moment.
        </p>
      </motion.div>
    </main>
  );
}
