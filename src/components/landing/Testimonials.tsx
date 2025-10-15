'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-emerald-700 mb-4"
        >
          What Our Customers Say
        </motion.h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-12">
          We are still early and proud of it. Every project so far has been
          confidential and under NDA, but once we have permission, we will share the best
          success stories here.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-2xl p-10 text-left shadow-sm max-w-xl mx-auto"
        >
          <Quote className="w-8 h-8 text-emerald-600 mb-4" />
          <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
            “We do not have public testimonials yet, but when we do, we will handpick the
            most insightful ones and post them here. Every client’s trust and confidentiality
            comes first.”
          </p>
          <div>
            <p className="font-semibold text-emerald-700 text-sm">The Sheet Up Team</p>
            <p className="text-xs text-neutral-500">Building trust, one spreadsheet at a time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
