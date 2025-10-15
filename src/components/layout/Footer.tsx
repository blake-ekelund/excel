'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-12 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Sheet Up</h3>
          <p className="text-emerald-200 text-sm leading-relaxed">
            Professional Excel support for startups and small businesses.
            Fast, secure, and confidential.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-white mb-2">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/get-started" className="hover:text-white transition-colors">
                Ad Hoc Projects
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-white transition-colors">
                Monthly Retainers
              </Link>
            </li>
            <li>
              <Link href="/enterprise" className="hover:text-white transition-colors">
                Enterprise Solutions
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-2">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-emerald-400 border-t border-emerald-800 pt-6">
        © {new Date().getFullYear()} Sheetup.io | All rights reserved.
      </div>
    </footer>
  );
}
