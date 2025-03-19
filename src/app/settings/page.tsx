import nextDynamic from 'next/dynamic';

// Use dynamic import with ssr:false to prevent client-only hooks from running during SSR
const SettingsContent = nextDynamic(() => import('@/components/settings/SettingsContent'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

// Disable static rendering for this page
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return <SettingsContent />;
} 