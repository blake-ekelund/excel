'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, Users, Clock, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Projects', value: 12, icon: FileSpreadsheet },
    { label: 'Clients', value: 27, icon: Users },
    { label: 'Hours Logged This Week', value: 42, icon: Clock },
    { label: 'New Messages', value: 8, icon: MessageSquare },
  ];

  return (
    <main>
      <h1 className="text-3xl font-bold text-emerald-700 mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-100">
              <Icon className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">{label}</p>
              <p className="text-xl font-bold text-emerald-700">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-emerald-700 mb-3">Recent Projects</h2>
          <ul className="text-sm text-neutral-700 space-y-2">
            <li>• Sales Dashboard – In Progress</li>
            <li>• Payroll Automation – Completed</li>
            <li>• Expense Tracker – Pending Review</li>
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-emerald-700 mb-3">Recent Messages</h2>
          <ul className="text-sm text-neutral-700 space-y-2">
            <li>
              <span className="font-semibold text-emerald-700">Jordan Smith:</span>{' '}
              “Can you check the macros?”
            </li>
            <li>
              <span className="font-semibold text-emerald-700">Sarah Lee:</span>{' '}
              “New request uploaded.”
            </li>
            <li>
              <span className="font-semibold text-emerald-700">Alex Chen:</span>{' '}
              “Dashboard working great — thanks!”
            </li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
