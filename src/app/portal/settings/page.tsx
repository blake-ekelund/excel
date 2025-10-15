'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, FileCheck } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    phone: '(555) 123-4567',
  });
  const [editing, setEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <main className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-emerald-700 mb-2">Account Settings</h1>
        <p className="text-neutral-600 text-sm">
          Manage your personal information, security, and NDA documents.
        </p>
      </div>

      {/* Profile Information */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-emerald-700">Profile</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-neutral-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!editing}
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                editing
                  ? 'border-emerald-300 focus:ring-1 focus:ring-emerald-500 outline-none'
                  : 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!editing}
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                editing
                  ? 'border-emerald-300 focus:ring-1 focus:ring-emerald-500 outline-none'
                  : 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!editing}
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                editing
                  ? 'border-emerald-300 focus:ring-1 focus:ring-emerald-500 outline-none'
                  : 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-2 rounded-md border border-emerald-600 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-5 py-2 rounded-md border border-neutral-300 text-neutral-600 font-semibold text-sm hover:bg-neutral-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-emerald-700">Security</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Password updated!');
          }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm text-neutral-700 mb-1">
              Current Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">
              New Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-600 mt-2">
            <input
              type="checkbox"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)}
              className="accent-emerald-600 w-4 h-4"
            />
            <span>Show password</span>
          </div>

          <div className="col-span-full flex justify-end mt-4">
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
            >
              Update Password
            </button>
          </div>
        </form>
      </motion.section>

      {/* NDA / Legal Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-emerald-700">
            NDA & Legal
          </h2>
        </div>

        <p className="text-sm text-neutral-700 mb-6 leading-relaxed">
          All projects are covered under our mutual non-disclosure agreement (NDA) to
          ensure confidentiality and ownership of your data. You can download your copy
          below for your records.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 italic">
            Signed on Jan 12, 2025 — Status: <span className="text-emerald-600 font-medium">Active</span>
          </p>
          <a
            href="/nda.pdf"
            download
            className="px-5 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
          >
            Download NDA
          </a>
        </div>
      </motion.section>
    </main>
  );
}
