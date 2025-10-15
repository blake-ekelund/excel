'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock } from 'lucide-react';

// canonical filter options
const FILTERS = ['All', 'Active', 'Paused'] as const;
type FilterType = typeof FILTERS[number];

export default function AdminClientsPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      plan: 'Monthly Retainer',
      hoursUsed: 6,
      hoursTotal: 10,
      status: 'Active' as const,
      lastActive: 'Apr 10, 2025',
    },
    {
      id: 2,
      name: 'Alex Chen',
      email: 'alex@example.com',
      plan: 'Ad Hoc',
      hoursUsed: 2,
      hoursTotal: 2,
      status: 'Active' as const,
      lastActive: 'Apr 8, 2025',
    },
    {
      id: 3,
      name: 'Taylor Johnson',
      email: 'taylor@example.com',
      plan: 'Retainer (Paused)',
      hoursUsed: 15,
      hoursTotal: 20,
      status: 'Paused' as const,
      lastActive: 'Mar 28, 2025',
    },
  ];

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (FILTERS.includes(value as FilterType)) {
      setFilter(value as FilterType);
    }
  };

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">Clients</h2>
          <p className="text-sm text-neutral-600">
            Manage client accounts, plans, and activity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
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
              {FILTERS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
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
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Plan</th>
              <th className="py-3 px-4 font-semibold">Hours Used</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Last Active</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-neutral-500">
                  No matching clients.
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const percentUsed = Math.round((c.hoursUsed / c.hoursTotal) * 100);
                return (
                  <motion.tr
                    key={c.id}
                    whileHover={{ backgroundColor: 'rgba(240,253,244,1)' }}
                    className="border-b border-neutral-100 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-neutral-800">
                      {c.name}
                    </td>
                    <td className="py-3 px-4 text-neutral-700">{c.email}</td>
                    <td className="py-3 px-4 text-neutral-700">{c.plan}</td>
                    <td className="py-3 px-4 text-neutral-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        {c.hoursUsed}/{c.hoursTotal}h
                      </div>
                      <div className="relative w-full h-2 bg-neutral-200 rounded-full mt-1">
                        <div
                          className="absolute left-0 top-0 h-2 bg-emerald-500 rounded-full"
                          style={{ width: `${percentUsed}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                          c.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">{c.lastActive}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="text-sm text-emerald-600 hover:underline font-medium">
                        View Projects
                      </button>
                      <button className="text-sm text-neutral-500 hover:underline font-medium">
                        Message
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
