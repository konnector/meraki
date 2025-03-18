'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface EmailPreference {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export default function EmailPage() {
  const supabase = createClientComponentClient();
  const [preferences, setPreferences] = useState<EmailPreference[]>([
    {
      id: 'updates',
      title: 'Product updates',
      description: 'Get notified about new features and improvements.',
      checked: true,
    },
    {
      id: 'security',
      title: 'Security alerts',
      description: 'Receive alerts about your account security.',
      checked: true,
    },
    {
      id: 'marketing',
      title: 'Marketing emails',
      description: 'Receive tips, trends, and insights about spreadsheet management.',
      checked: false,
    },
    {
      id: 'social',
      title: 'Social notifications',
      description: 'Get notified when someone shares a spreadsheet with you or mentions you.',
      checked: true,
    },
    {
      id: 'billing',
      title: 'Billing updates',
      description: 'Get notified about your subscription and billing status.',
      checked: true,
    }
  ]);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, checked: !pref.checked } : pref
    ));
  };

  return (
    <div className="max-w-3xl">
      <div>
        <h2 className="text-lg font-medium text-black">Email Preferences</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage how and when you receive email notifications.
        </p>
      </div>

      <div className="mt-6">
        <div className="divide-y divide-gray-200">
          {preferences.map((preference) => (
            <div key={preference.id} className="flex items-start py-4">
              <div className="flex h-5 items-center">
                <input
                  id={preference.id}
                  name={preference.id}
                  type="checkbox"
                  checked={preference.checked}
                  onChange={() => togglePreference(preference.id)}
                  className="checkbox checkbox-black"
                />
              </div>
              <div className="ml-3">
                <label htmlFor={preference.id} className="text-sm font-medium text-black">
                  {preference.title}
                </label>
                <p className="text-sm text-gray-500">{preference.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-black">Email Frequency</h3>
        <div className="mt-4">
          <select className="select select-bordered border-gray-200 w-full max-w-xs">
            <option value="instant">Send emails instantly</option>
            <option value="daily">Daily digest</option>
            <option value="weekly">Weekly digest</option>
            <option value="never">Never send emails</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-black">Additional Email Addresses</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add additional email addresses to receive notifications.
        </p>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter an email address"
            className="input input-bordered border-gray-200 w-full max-w-md"
          />
          <button className="btn bg-black text-white hover:bg-black/90 mt-2">
            Add email
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <button className="btn bg-white text-gray-700 hover:bg-gray-100 border-gray-200">Cancel</button>
        <button className="btn bg-black text-white hover:bg-black/90">Save changes</button>
      </div>
    </div>
  );
} 