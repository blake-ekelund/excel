'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, BarChart3, Zap } from 'lucide-react';

export default function OurWork() {
  const projects = [
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-emerald-600" />,
      title: 'Sales Dashboard Automation',
      description:
        'Built a dynamic sales tracker with auto-updating charts and monthly performance summaries — saving the client 10 hours/week.',
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      title: 'VBA Macro Streamlining',
      description:
        'Re-engineered legacy macros to run 6× faster and eliminate manual file merging for a manufacturing client.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
      title: 'Financial Forecast Template',
      description:
        'Created a plug-and-play financial model for a startup to track burn, runway, and investor updates automatically.',
    },
  ];

  return (
    <section id="our-work" className="py-28 bg-emerald-50/50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-emerald-700 mb-4"
        >
          What We’ve Built
        </motion.h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-16 text-base">
          A few examples of the kind of spreadsheets, automations, and dashboards
          we deliver for our clients — always under NDA.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-100">{proj.icon}</div>
                <h3 className="text-lg font-semibold text-emerald-700">{proj.title}</h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">{proj.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 mt-10 italic">
          *All projects shown are anonymized or reconstructed examples for confidentiality.
        </p>
      </div>
    </section>
  );
}
