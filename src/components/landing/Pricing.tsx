'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, X } from 'lucide-react';
import ExcelHelpForm from '@/components/landing/ExcelHelpForm';

export default function Pricing() {
  const [open, setOpen] = useState(false);

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const plans = [
    {
      name: 'Ad Hoc',
      price: '$75/hr',
      description:
        'For one-off projects, quick fixes, or smaller builds. Perfect for first-time customers or those who need occasional help.',
      features: [
        'Portal Access',
        'NDA Protection',
        '72-hour turnaround',
        'Pay per project or hourly',
      ],
      button: { label: 'Start a Project' },
      highlight: false,
    },
    {
      name: 'Monthly Retainer',
      price: '$500/mo',
      subtext: '3-month minimum commitment',
      description:
        'Up to 10 hours of expert Excel help per month. Guaranteed turnaround and ongoing support for your business.',
      features: [
        'Priority 24-hour turnaround',
        'Portal Access & Task Tracking',
        'NDA Protection',
        'Additional hours at $50/hr',
        '3-month minimum commitment',
      ],
      button: { label: 'Start Monthly Plan', href: '/signup' },
      highlight: true,
    },
  ];

  return (
    <>
      <section className="py-28 bg-gradient-to-b from-white to-emerald-50 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-emerald-700 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-16">
            Expert Excel help when you need it. Pay per project, or save with a monthly retainer.
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex flex-col text-left rounded-2xl p-8 shadow-sm border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white border-emerald-300 shadow-md hover:shadow-xl'
                    : 'bg-white border-neutral-200 hover:shadow-md'
                }`}
              >
                <h3 className="text-xl font-semibold text-emerald-700 mb-1">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-black mb-1">
                  {plan.price}
                </p>
                {plan.subtext && (
                  <p className="text-sm text-emerald-700 font-medium mb-4">
                    {plan.subtext}
                  </p>
                )}
                <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-[2px]" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-auto"
                >
                  {/* 🔹 If Ad Hoc plan → open modal instead of navigating */}
                  {plan.name === 'Ad Hoc' ? (
                    <button
                      onClick={() => setOpen(true)}
                      className="w-full block text-center px-6 py-3 rounded-md font-semibold shadow-md transition-all border border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                    >
                      {plan.button.label}
                    </button>
                  ) : (
                    <a
                      href={plan.button.href}
                      className="w-full block text-center px-6 py-3 rounded-md font-semibold shadow-md transition-all bg-gradient-to-r from-emerald-700 to-emerald-500 text-white hover:from-emerald-800 hover:to-emerald-600"
                    >
                      {plan.button.label}
                      <ArrowRight className="inline ml-2 w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-neutral-500 mt-10">
            Every plan includes secure portal access, billing automation, and NDA-backed confidentiality.
          </p>
        </div>
      </section>

      {/* 🔹 Modal Overlay */}
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
