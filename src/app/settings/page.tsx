'use client';

import dynamic from 'next/dynamic';
import SuspenseWrapper from '@/components/SuspenseWrapper';

// Use dynamic import with ssr:false as a fallback if needed
const SettingsContent = dynamic(() => import('@/components/settings/SettingsContent'), { 
  ssr: true 
});

export default function SettingsPage() {
  return (
    <SuspenseWrapper>
      <SettingsContent />
    </SuspenseWrapper>
  );
} 