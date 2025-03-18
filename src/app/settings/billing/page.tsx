import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false to prevent client hooks errors during SSR
const BillingContent = dynamic(() => import('@/components/settings/BillingContent'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function BillingPage() {
  return <BillingContent />;
} 