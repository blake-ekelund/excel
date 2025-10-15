'use client';

import { motion } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, Clock, MessageSquare } from 'lucide-react';

export default function PortalDashboard() {
  // Dummy data — replace with Supabase data later
  const client = {
    name: 'Jordan Smith',
    hoursUsed: 6,
    hoursTotal: 10,
    projects: [
      { id: 1, title: 'Marketing Dashboard', status: 'In Progress' },
      { id: 2, title: 'Inventory Tracker', status: 'Completed' },
    ],
  };

  const hoursRemaining = client.hoursTotal - client.hoursUsed;
  const percentUsed = Math.round((client.hoursUsed / client.hoursTotal) * 100);

  return (
    <main className="space-y-10">
      {/* Welcome + Retainer Summary */}
      <section>
        <h1 className="text-3xl font-bold text-emerald-700 mb-2">
          Welcome back, {client.name.split(' ')[0]} 👋
        </h1>
        <p className="text-neutral-600 text-sm mb-6">
          Here’s an overview of your projects and retainer usage this month.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Hours Summary */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-1 bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-emerald-700">
                Retainer Usage
              </h2>
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="relative h-3 w-full bg-neutral-200 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500"
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            <p className="text-sm text-neutral-700">
              {client.hoursUsed} of {client.hoursTotal} hours used
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {hoursRemaining} hours remaining this cycle
            </p>
          </motion.div>

          {/* Active Projects */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-2 bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-emerald-700">
                Active Projects
              </h2>
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            </div>

            {client.projects.length > 0 ? (
              <div className="grid gap-3">
                {client.projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 hover:bg-emerald-50 transition"
                  >
                    <div>
                      <p className="font-medium text-neutral-800">{p.title}</p>
                      <p className="text-xs text-neutral-500">{p.status}</p>
                    </div>
                    <button className="text-sm text-emerald-600 font-semibold hover:underline">
                      View
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                No active projects yet.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick Upload */}
      <section>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-700">
              Upload a New Request
            </h2>
            <UploadCloud className="w-5 h-5 text-emerald-600" />
          </div>

          <label className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer hover:border-emerald-500 transition">
            <UploadCloud className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-sm font-medium text-emerald-700">
              Drop your file here or click to upload
            </span>
            <input type="file" className="hidden" />
          </label>
        </motion.div>
      </section>

      {/* Quick Message */}
      <section>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-700">
              Message the Team
            </h2>
            <MessageSquare className="w-5 h-5 text-emerald-600" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent!');
            }}
            className="flex flex-col md:flex-row gap-4"
          >
            <textarea
              rows={3}
              placeholder="Ask a question or send us an update..."
              className="flex-1 border border-neutral-300 rounded-md p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition shadow-sm"
            >
              Send
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
