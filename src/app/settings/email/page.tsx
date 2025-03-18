import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false to prevent client hooks errors during SSR
const EmailContent = dynamic(() => import('@/components/settings/EmailContent'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function EmailPage() {
  return <EmailContent />;
} 