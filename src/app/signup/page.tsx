'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: prefilledEmail,
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledEmail) {
      setFormData((f) => ({ ...f, email: prefilledEmail }));
    }
  }, [prefilledEmail]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Sign up data:', formData);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f6fef8] to-white px-4 py-12 relative">
      {/* Background decorative blurs */}
      <div className="absolute -top-32 right-1/3 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] bg-black/5 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg border border-emerald-100 p-10"
      >
        {/* Breadcrumb / Back to Home */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2 text-center">
              Create Your Account
            </h1>
            <p className="text-neutral-600 text-sm text-center mb-4">
              Join ExcelHelp.ai to track your requests and get priority support.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Jane"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
                <p className="text-xs text-neutral-500 mt-1">Use at least 8 characters.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="mt-4 py-3 rounded-md font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600 shadow transition"
              >
                Sign Up
              </motion.button>
            </form>

            <p className="text-sm text-neutral-600 text-center mt-4">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Log in
              </Link>
            </p>

            <p className="text-xs text-neutral-500 text-center mt-4">
              By continuing you agree to our{' '}
              <Link href="/terms" className="underline">
                Terms
              </Link>{' '}
              &{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>.
            </p>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <h3 className="text-2xl font-bold text-emerald-700 mb-3">
              Welcome aboard!
            </h3>
            <p className="text-neutral-700 text-sm mb-6">
              Your account has been created. You can now access your dashboard to track projects and messages.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600 shadow transition"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
