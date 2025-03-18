'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/auth-helpers-nextjs';
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

export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-medium text-gray-900">Settings Overview</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage your account settings and preferences.
      </p>
      
      <div className="mt-6 prose prose-sm text-gray-500">
        <p>
          Welcome to your settings dashboard. Here you can:
        </p>
        <ul>
          <li>Update your personal information</li>
          <li>Manage your company profile</li>
          <li>Change your password</li>
          <li>Manage team members</li>
          <li>Handle billing and subscriptions</li>
          <li>Configure email preferences</li>
          <li>Set up notifications</li>
        </ul>
        <p>
          Select a category from the sidebar to get started.
        </p>
      </div>
    </div>
  );
} 