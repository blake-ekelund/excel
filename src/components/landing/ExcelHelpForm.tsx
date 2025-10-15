'use client';

import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface ExcelHelpFormProps {
  onClose?: () => void;
}

// exact shape of the form data
interface FormData {
  type: string;
  urgency: string;
  device: string;
  details: string;
  name: string;
  email: string;
  phone: string;
  nda: boolean;
}

export default function ExcelHelpForm({ onClose }: ExcelHelpFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: '',
    urgency: '',
    device: '',
    details: '',
    name: '',
    email: '',
    phone: '',
    nda: false,
  });

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // ✅ typed updater (no any)
  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setSubmitted(true);
  };

  const cardVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const progress = (step / 5) * 100;

  return (
    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-neutral-200 rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h2 className="text-2xl font-bold text-emerald-700 mb-2">Get Excel Help Now</h2>
      <p className="text-sm text-neutral-600 mb-6">Step {step} of 5</p>

      <form onSubmit={handleSubmit}>
        <div
          className="relative min-h-[340px] flex flex-col justify-between"
          style={{ transition: 'height 0.3s ease' }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="1"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    What are you looking for?
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      'Spreadsheet Creation',
                      'Edit Current Spreadsheet',
                      'Create / Fix a Formula',
                      'Create / Fix VBA Code',
                    ].map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => update('type', option)}
                        className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                          formData.type === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                            : 'border-neutral-300 hover:border-emerald-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={next}
                    disabled={!formData.type}
                    className={`px-5 py-2 rounded-md font-semibold text-white ${
                      formData.type
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="2"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    How urgent is your project?
                  </label>
                  <div className="flex flex-col gap-3">
                    {['Immediate (Today)', 'This Week', 'This Month', 'Flexible'].map(
                      (option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => update('urgency', option)}
                          className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                            formData.urgency === option
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                              : 'border-neutral-300 hover:border-emerald-400'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!formData.urgency}
                    className={`px-5 py-2 rounded-md font-semibold text-white ${
                      formData.urgency
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="3"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    What device do you use?
                  </label>
                  <div className="flex flex-col gap-3">
                    {['Mac', 'PC'].map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => update('device', option)}
                        className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                          formData.device === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                            : 'border-neutral-300 hover:border-emerald-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={back}
                    className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!formData.device}
                    className={`px-5 py-2 rounded-md font-semibold text-white ${
                      formData.device
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="4"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Tell us about the project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your project or issue..."
                    value={formData.details}
                    onChange={(e) => update('details', e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={back}
                    className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!formData.details}
                    className={`px-5 py-2 rounded-md font-semibold text-white ${
                      formData.details
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <motion.div
                key="5"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm mb-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />

                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm mb-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />

                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="(555) 555-5555"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm mb-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />

                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={formData.nda}
                      onChange={(e) => update('nda', e.target.checked)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <span className="text-sm text-neutral-700">
                      I would like to sign an NDA before work begins.
                    </span>
                  </label>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={back}
                    className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email}
                    className={`px-5 py-2 rounded-md font-semibold text-white ${
                      formData.name && formData.email
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-white/70 rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="px-8 py-10 text-center max-w-sm"
            >
              <h3 className="text-2xl font-bold text-emerald-700 mb-3">
                Your request has been submitted!
              </h3>
              <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
                Create a free account to{' '}
                <span className="text-emerald-600 font-medium">
                  track your project
                </span>
                , upload files, and chat directly with our Excel team.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/signup?email=${encodeURIComponent(
                    formData.email || ''
                  )}`}
                  className="px-6 py-3 rounded-md font-semibold text-white text-sm shadow-md transition-all bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-600"
                >
                  Create My Account
                </Link>

                <button
                  onClick={() => {
                    if (onClose) onClose(); // 👈 close modal if provided
                    setSubmitted(false);
                    setStep(1);
                    setFormData({
                      type: '',
                      urgency: '',
                      device: '',
                      details: '',
                      name: '',
                      email: '',
                      phone: '',
                      nda: false,
                    });
                  }}
                  className="text-sm text-neutral-600 hover:text-emerald-600 mt-1"
                >
                  Skip for now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
