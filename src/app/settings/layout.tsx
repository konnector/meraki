import nextDynamic from 'next/dynamic';

// Disable static rendering for all settings pages
export const dynamic = 'force-dynamic';

// Import client components with SSR disabled
const SettingsLayoutClient = nextDynamic(() => import('@/components/settings/SettingsLayoutClient'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayoutClient>{children}</SettingsLayoutClient>;
} 