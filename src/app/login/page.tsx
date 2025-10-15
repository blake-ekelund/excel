'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      // 👉 Replace this mock with Supabase or your auth API later
      console.log('Attempting login:', formData);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f6fef8] to-white px-4 py-16 relative">
      {/* Background Blurs */}
      <div className="absolute -top-32 right-1/3 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] bg-black/5 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-lg border border-emerald-100 p-10"
      >
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {!success ? (
          <>
            <h1 className="text-3xl font-bold text-emerald-700 mb-3 text-center">
              Log In
            </h1>
            <p className="text-neutral-600 text-sm text-center mb-8">
              Welcome back! Sign in to view and manage your projects.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('email', e.target.value)
                  }
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('password', e.target.value)
                  }
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
                <div className="text-right mt-2">
                  <Link
                    href="/reset-password"
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className={`mt-4 py-3 rounded-md font-semibold text-white shadow transition 
                  ${
                    loading
                      ? 'bg-emerald-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600'
                  }`}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </motion.button>
            </form>

            <p className="text-sm text-neutral-600 text-center mt-6">
              Don’t have an account?{' '}
              <Link
                href="/signup"
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Sign up
              </Link>
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
              Welcome back!
            </h3>
            <p className="text-neutral-700 text-sm mb-6">
              You’re now logged in and can access your project dashboard.
            </p>
            <Link
              href="/portal"
              className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600 shadow transition"
            >
              Go to Portal
            </Link>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
