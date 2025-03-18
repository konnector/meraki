'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, UserCircle, Key, Users, CreditCard, Mail, Bell } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'My Details', icon: <UserCircle className="w-4 h-4" />, href: '/settings/my-details' },
  { label: 'Profile', icon: <Settings className="w-4 h-4" />, href: '/settings/profile' },
  { label: 'Password', icon: <Key className="w-4 h-4" />, href: '/settings/password' },
  { label: 'Team', icon: <Users className="w-4 h-4" />, href: '/settings/team' },
  { label: 'Billing', icon: <CreditCard className="w-4 h-4" />, href: '/settings/billing' },
  { label: 'Email', icon: <Mail className="w-4 h-4" />, href: '/settings/email' },
  { label: 'Notifications', icon: <Bell className="w-4 h-4" />, href: '/settings/notifications' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <div className="flex gap-3">
            <button className="btn btn-ghost">Cancel</button>
            <button className="btn btn-primary">Save changes</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <nav className="col-span-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-colors
                  ${pathname === item.href
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Main content area */}
          <div className="col-span-9 bg-white rounded-xl shadow-sm p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
} 