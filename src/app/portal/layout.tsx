'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileSpreadsheet,
  Clock,
  MessageSquare,
  Settings,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
    { name: 'Projects', href: '/portal/projects', icon: FileSpreadsheet },
    { name: 'Messages', href: '/portal/messages', icon: MessageSquare },
    { name: 'Billing', href: '/portal/billing', icon: Clock },
    { name: 'Settings', href: '/portal/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {/* Sidebar */}
      <aside
        className="sticky top-0 flex flex-col justify-between w-64 h-screen bg-white border-r border-emerald-100 p-6"
      >
        {/* Top Section */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-emerald-700 mb-8">Client Portal</h1>
          <nav className="flex flex-col gap-3 overflow-y-auto">
            {links.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  pathname === href
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-neutral-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-10">
          <Link
            href="/signout"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content (scrollable area) */}
      <main className="flex-1 h-screen overflow-y-auto p-10">{children}</main>
    </div>
  );
}
