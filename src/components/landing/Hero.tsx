'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';
import Link from 'next/link';
import ExcelHelpForm from '@/components/landing/ExcelHelpForm';

export default function Hero() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center px-8 py-32 bg-gradient-to-b from-[#f6fef8] to-white overflow-hidden gap-16">
      {/* Background radial highlight */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]" />

      {/* LEFT: Text content */}
      <div className="flex-1 max-w-2xl text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-emerald-600 font-semibold uppercase tracking-wide mb-4 text-sm md:text-base"
        >
          Professional Excel Experts • Confidential Support
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-tight"
        >
          Excel Help, <span className="text-emerald-600">Done Right.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-neutral-700 leading-relaxed"
        >
          Upload your spreadsheet, sign an NDA, and get expert solutions to your Excel problems.
          Fast, secure, and confidential.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10"
        >
          <Link
            href="/#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              backgroundImage: 'linear-gradient(90deg, #047857, #10b981)',
            }}
          >
            How it Works
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 font-medium text-sm shadow-sm"
        >
          <Gift className="w-4 h-4 text-emerald-600" />
          <span>
            Formula & VBA fixes are <strong>free for your first project</strong> • Spreadsheet edit & 
            creation projects are <strong>50% off</strong> your first build
          </span>
        </motion.div>
      </div>

      {/* RIGHT: Multi-step form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 w-full max-w-md"
      >
        <ExcelHelpForm />
      </motion.div>

      {/* Background blur shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-32 right-1/3 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] bg-black/10 blur-[140px] rounded-full pointer-events-none"
      />
    </section>
  );
}
