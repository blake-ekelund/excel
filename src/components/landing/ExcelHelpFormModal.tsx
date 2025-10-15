'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExcelHelpForm from './ExcelHelpForm';
import { X } from 'lucide-react';

export default function ExcelHelpFormModal() {
  const [open, setOpen] = useState(false);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600 shadow transition-all"
      >
        Start a Request
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
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
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* 👇 pass onClose to form */}
                <ExcelHelpForm onClose={() => setOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
