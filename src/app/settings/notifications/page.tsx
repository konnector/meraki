'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Bell, Monitor, Phone } from 'lucide-react';

interface NotificationChannel {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  channels: {
    push: boolean;
    email: boolean;
    mobile: boolean;
  };
}

export default function NotificationsPage() {
  const supabase = createClientComponentClient();
  
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'push',
      title: 'Push notifications',
      description: 'Receive notifications in your browser',
      icon: <Monitor className="w-5 h-5" />,
      enabled: true,
    },
    {
      id: 'mobile',
      title: 'Mobile notifications',
      description: 'Receive notifications on your mobile device',
      icon: <Phone className="w-5 h-5" />,
      enabled: true,
    },
  ]);

  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'spreadsheet_updates',
      title: 'Spreadsheet updates',
      description: 'When someone makes changes to your spreadsheets',
      channels: { push: true, email: true, mobile: true },
    },
    {
      id: 'comments',
      title: 'Comments and mentions',
      description: 'When someone comments on your spreadsheets or mentions you',
      channels: { push: true, email: true, mobile: true },
    },
    {
      id: 'shares',
      title: 'Shares and invites',
      description: 'When someone shares a spreadsheet with you or invites you to collaborate',
      channels: { push: true, email: true, mobile: false },
    },
    {
      id: 'reminders',
      title: 'Reminders',
      description: 'For your scheduled reports and deadlines',
      channels: { push: false, email: true, mobile: false },
    },
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };

  const togglePreference = (prefId: string, channelType: keyof NotificationPreference['channels']) => {
    setPreferences(preferences.map(pref =>
      pref.id === prefId
        ? {
            ...pref,
            channels: {
              ...pref.channels,
              [channelType]: !pref.channels[channelType],
            },
          }
        : pref
    ));
  };

  return (
    <div className="max-w-4xl">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose how and when you want to be notified.
        </p>
      </div>

      {/* Notification Channels */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900">Notification Channels</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {channel.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{channel.title}</h4>
                  <p className="text-sm text-gray-500">{channel.description}</p>
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={channel.enabled}
                  onChange={() => toggleChannel(channel.id)}
                  className="toggle toggle-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900">Notification Preferences</h3>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-4 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="pb-4 text-center text-sm font-medium text-gray-500">Push</th>
                <th className="pb-4 text-center text-sm font-medium text-gray-500">Email</th>
                <th className="pb-4 text-center text-sm font-medium text-gray-500">Mobile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {preferences.map((pref) => (
                <tr key={pref.id}>
                  <td className="py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pref.title}</div>
                      <div className="text-sm text-gray-500">{pref.description}</div>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={pref.channels.push}
                      onChange={() => togglePreference(pref.id, 'push')}
                      className="checkbox"
                      disabled={!channels.find(c => c.id === 'push')?.enabled}
                    />
                  </td>
                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={pref.channels.email}
                      onChange={() => togglePreference(pref.id, 'email')}
                      className="checkbox"
                    />
                  </td>
                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={pref.channels.mobile}
                      onChange={() => togglePreference(pref.id, 'mobile')}
                      className="checkbox"
                      disabled={!channels.find(c => c.id === 'mobile')?.enabled}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-primary">Save changes</button>
      </div>
    </div>
  );
} 