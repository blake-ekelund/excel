'use client';

import { motion } from 'framer-motion';
import { CreditCard, Clock, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export default function BillingPage() {
  // Dummy data for now — replace with Supabase / Stripe data later
  const billing = {
    plan: 'Monthly Retainer',
    rate: '$500/mo',
    commitment: '3-month minimum',
    nextInvoice: 'Apr 15, 2025',
    hoursUsed: 6,
    hoursTotal: 10,
    paymentMethod: 'Visa •••• 4242',
    transactions: [
      {
        id: 1,
        date: 'Mar 15, 2025',
        amount: '$500.00',
        description: 'Monthly Retainer Payment',
        status: 'Paid',
      },
      {
        id: 2,
        date: 'Feb 15, 2025',
        amount: '$500.00',
        description: 'Monthly Retainer Payment',
        status: 'Paid',
      },
    ],
  };

  const hoursRemaining = billing.hoursTotal - billing.hoursUsed;
  const percentUsed = Math.round((billing.hoursUsed / billing.hoursTotal) * 100);

  return (
    <main className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-emerald-700 mb-2">Billing & Usage</h1>
        <p className="text-neutral-600 text-sm">
          Manage your plan, view retainer usage, and download invoices.
        </p>
      </div>

      {/* Retainer Summary */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Plan Details */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-emerald-700">Current Plan</h2>
            <CreditCard className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-neutral-800 font-medium mb-1">{billing.plan}</p>
          <p className="text-neutral-600 text-sm mb-4">{billing.rate}</p>

          <div className="flex flex-col gap-1 text-sm text-neutral-600">
            <p>
              <span className="font-medium text-emerald-700">Next Invoice:</span>{' '}
              {billing.nextInvoice}
            </p>
            <p>
              <span className="font-medium text-emerald-700">Commitment:</span>{' '}
              {billing.commitment}
            </p>
            <p>
              <span className="font-medium text-emerald-700">Payment Method:</span>{' '}
              {billing.paymentMethod}
            </p>
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition">
              Manage Billing
            </button>
          </div>
        </motion.div>

        {/* Usage Summary */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-emerald-700">Retainer Usage</h2>
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="relative h-3 w-full bg-neutral-200 rounded-full overflow-hidden mb-3">
            <div
              className="absolute top-0 left-0 h-full bg-emerald-500"
              style={{ width: `${percentUsed}%` }}
            />
          </div>

          <p className="text-sm text-neutral-700">
            {billing.hoursUsed} of {billing.hoursTotal} hours used
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            {hoursRemaining} hours remaining this cycle
          </p>

          <div className="mt-6 flex gap-2">
            <button className="flex-1 px-4 py-2 rounded-md border border-emerald-600 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition">
              Buy More Hours
            </button>
            <button className="flex-1 px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition">
              Upgrade Plan
            </button>
          </div>
        </motion.div>
      </section>

      {/* Invoices */}
      <section>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-700">Payment History</h2>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>

          {billing.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-200">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-neutral-100 hover:bg-emerald-50/50 transition"
                    >
                      <td className="py-3 pr-4 text-neutral-700">{t.date}</td>
                      <td className="py-3 pr-4 text-neutral-700">{t.description}</td>
                      <td className="py-3 pr-4 font-medium text-neutral-800">{t.amount}</td>
                      <td
                        className={`py-3 pr-4 font-medium ${
                          t.status === 'Paid'
                            ? 'text-emerald-600'
                            : 'text-neutral-500'
                        }`}
                      >
                        {t.status}
                      </td>
                      <td className="py-3">
                        <button className="text-emerald-600 hover:underline text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-neutral-500 text-sm italic">No transactions yet.</p>
          )}
        </motion.div>
      </section>

      {/* Plan Renewal Info */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-emerald-700 text-white rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold mb-1">Your next renewal</h3>
            <p className="text-emerald-100 text-sm">
              {billing.nextInvoice} — billed automatically to your saved card.
            </p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2 rounded-md bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition">
            View Invoices <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </main>
  );
}
