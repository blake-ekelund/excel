'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Plus, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Archived'>('All');

  const projects = [
    {
      id: 1,
      title: 'Sales Dashboard',
      status: 'In Progress',
      hours: 3.5,
      dateSubmitted: 'Mar 20, 2025',
      dateCompleted: null,
    },
    {
      id: 2,
      title: 'Inventory Tracker',
      status: 'Completed',
      hours: 5,
      dateSubmitted: 'Feb 10, 2025',
      dateCompleted: 'Feb 14, 2025',
    },
    {
      id: 3,
      title: 'Payroll Template',
      status: 'Archived',
      hours: 8,
      dateSubmitted: 'Jan 22, 2025',
      dateCompleted: 'Jan 28, 2025',
    },
  ];

  const filteredProjects =
    filter === 'All'
      ? projects
      : filter === 'Active'
      ? projects.filter((p) => p.status !== 'Archived')
      : projects.filter((p) => p.status === 'Archived');

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-emerald-700">My Projects</h2>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'All' | 'Active' | 'Archived')}
              className="appearance-none border border-neutral-300 rounded-md text-sm px-3 py-2 pr-8 text-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              <option>All</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
            <Filter className="absolute right-2 top-2.5 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          {/* New Project Button */}
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* Table View */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white border border-emerald-100 rounded-2xl shadow-sm"
      >
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-emerald-50 border-b border-emerald-100 text-neutral-700">
            <tr>
              <th className="py-3 px-4 font-semibold">Project</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Hours Used</th>
              <th className="py-3 px-4 font-semibold">Date Submitted</th>
              <th className="py-3 px-4 font-semibold">Date Completed</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-neutral-500">
                  No {filter.toLowerCase()} projects.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <motion.tr
                  key={p.id}
                  whileHover={{ backgroundColor: 'rgba(240,253,244,1)' }}
                  className="border-b border-neutral-100 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-neutral-800">{p.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        p.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : p.status === 'Archived'
                          ? 'bg-neutral-100 text-neutral-500'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{p.hours}</td>
                  <td className="py-3 px-4 text-neutral-600">{p.dateSubmitted}</td>
                  <td className="py-3 px-4 text-neutral-600">
                    {p.dateCompleted || <span className="text-neutral-400">—</span>}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-emerald-600 hover:underline font-medium">
                      View
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Upload New File */}
      <div className="mt-10">
        <label className="flex items-center justify-center w-full py-10 border-2 border-dashed border-emerald-300 rounded-2xl cursor-pointer hover:border-emerald-500 transition">
          <UploadCloud className="w-6 h-6 text-emerald-600 mr-2" />
          <span className="text-sm font-medium text-emerald-700">
            Upload a new spreadsheet or project file
          </span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </section>
  );
}
