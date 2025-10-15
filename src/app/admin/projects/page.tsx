'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserCheck, FileSpreadsheet } from 'lucide-react';

// 1️⃣  canonical list of allowed statuses
const STATUSES = ['All', 'Pending', 'In Progress', 'Completed'] as const;
type ProjectStatus = typeof STATUSES[number];

export default function AdminProjectsPage() {
  // 2️⃣  state typed from that union
  const [filter, setFilter] = useState<ProjectStatus>('All');
  const [search, setSearch] = useState('');

  const [projects] = useState([
    {
      id: 1,
      title: 'Sales Dashboard',
      client: 'Jordan Smith',
      status: 'In Progress' as const,
      assignedTo: 'Sarah Lee',
      hours: 4.5,
      submitted: 'Mar 20 2025',
    },
    {
      id: 2,
      title: 'Inventory Tracker',
      client: 'Alex Chen',
      status: 'Completed' as const,
      assignedTo: 'Chris Kim',
      hours: 7,
      submitted: 'Feb 15 2025',
    },
    {
      id: 3,
      title: 'Expense Automation',
      client: 'Taylor Johnson',
      status: 'Pending' as const,
      assignedTo: 'Unassigned',
      hours: 0,
      submitted: 'Apr 3 2025',
    },
  ]);

  // 3️⃣  safe change handler – checks value is one of STATUSES
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (STATUSES.includes(value as ProjectStatus)) setFilter(value as ProjectStatus);
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">All Projects</h2>
          <p className="text-sm text-neutral-600">Manage client projects and assignments.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by project or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-neutral-400" />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="appearance-none border border-neutral-300 rounded-md text-sm px-3 py-2 pr-8 text-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-2.5 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
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
              <th className="py-3 px-4 font-semibold">Client</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Assigned To</th>
              <th className="py-3 px-4 font-semibold">Hours</th>
              <th className="py-3 px-4 font-semibold">Date Submitted</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-neutral-500">
                  No matching projects.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <motion.tr
                  key={p.id}
                  whileHover={{ backgroundColor: 'rgba(240,253,244,1)' }}
                  className="border-b border-neutral-100 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-neutral-800">{p.title}</td>
                  <td className="py-3 px-4 text-neutral-700">{p.client}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        p.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : p.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <FileSpreadsheet className="w-3 h-3" />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-700 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    {p.assignedTo}
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{p.hours}</td>
                  <td className="py-3 px-4 text-neutral-600">{p.submitted}</td>
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
    </section>
  );
}
