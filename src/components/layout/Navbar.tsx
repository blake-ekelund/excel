'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ExcelHelpForm from '@/components/landing/ExcelHelpForm';
import { X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll shadow logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll while modal open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/70 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Sheet Up
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Start a Request (opens modal) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-md transition-all"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #047857, #10b981)',
                }}
              >
                Start a Request
              </button>
            </motion.div>

            {/* Divider */}
            <div className="h-5 w-px bg-neutral-300 hidden sm:block" />

            {/* Login / Sign Up */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-800 hover:text-emerald-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-emerald-600 border border-emerald-500/40 px-4 py-2 rounded-full hover:bg-emerald-50 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              // ✅ Close when clicking outside modal
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-lg w-full mx-4 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <ExcelHelpForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
