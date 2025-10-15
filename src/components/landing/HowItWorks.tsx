'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSpreadsheet,
  ShieldCheck,
  Upload,
  MessageSquare,
  ArrowRight,
  X,
} from 'lucide-react';
import ExcelHelpForm from '@/components/landing/ExcelHelpForm';

export default function HowItWorks() {
  const [open, setOpen] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const steps = [
    {
      icon: <FileSpreadsheet className="w-10 h-10 text-emerald-600" />,
      title: '1. Tell Us What You Need',
      description:
        'Choose whether you need a new spreadsheet, a formula fix, VBA automation, or help debugging an issue. The more context you share, the faster we can help.',
      detail:
        'We’ll quickly assess your request and confirm the best path forward — typically within a few hours.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />,
      title: '2. Sign Your NDA',
      description:
        'Before any files are shared, we make confidentiality official. You’ll sign a simple, digital NDA that protects your business data and intellectual property.',
      detail:
        'Every project is handled under strict privacy guidelines — your spreadsheets stay yours.',
    },
    {
      icon: <Upload className="w-10 h-10 text-emerald-600" />,
      title: '3. Upload Your File & Describe the Problem',
      description:
        'Securely upload your workbook through our encrypted portal. Add a few notes about what’s broken or what you’d like built.',
      detail:
        'Our experts analyze the structure, formulas, and VBA logic so we can fix or enhance it efficiently.',
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-emerald-600" />,
      title: '4. Get Real-Time Support',
      description:
        'You’ll receive updates and feedback directly inside your customer portal. Ask questions, approve fixes, and download updated files as we work.',
      detail:
        'Our ticket system keeps every message and version organized in one place — no email chaos.',
    },
  ];

  return (
    <section id="how-it-works" className="py-28 bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-emerald-700 mb-4"
        >
          How It Works
        </motion.h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-16 text-base">
          Getting expert Excel help shouldn’t be complicated. Here’s how we make
          it fast, secure, and stress-free.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-start text-left bg-emerald-50/40 border border-emerald-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100">
                  {step.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-700 text-sm mb-2 leading-relaxed">
                  {step.description}
                </p>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all text-base"
            style={{
              backgroundImage: 'linear-gradient(90deg, #047857, #10b981)',
            }}
          >
            Start Your Request <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Modal Overlay */}
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
              // Close modal when clicking the overlay (outside the modal content)
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
                <ExcelHelpForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
