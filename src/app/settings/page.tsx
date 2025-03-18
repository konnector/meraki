import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false to prevent client-only hooks from running during SSR
const SettingsContent = dynamic(() => import('@/components/settings/SettingsContent'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function SettingsPage() {
  return <SettingsContent />;
} 