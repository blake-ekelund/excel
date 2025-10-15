'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

export default function SignOutPage() {
  useEffect(() => {
    // TODO: Replace with Supabase signOut once keys are added
    console.log('Mock sign out – Supabase not yet connected.');
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-emerald-50 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-emerald-100 rounded-2xl shadow-md p-10 max-w-md"
      >
        <LogOut className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">
          Signing you out...
        </h1>
        <p className="text-sm text-neutral-600">
          Supabase not configured yet — this page is a placeholder.
        </p>
      </motion.div>
    </main>
  );
}
