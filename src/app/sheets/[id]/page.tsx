'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Spreadsheet from '@/components/spreadsheet/Spreadsheet';

interface PageProps {
  params: {
    id: string;
  };
}

export default function SheetPage({ params }: PageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        // Check if sheet exists and user has access
        const { data: sheet, error } = await supabase
          .from('sheets')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error || !sheet) {
          setError('Sheet not found or you don\'t have access to it');
          return;
        }

        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while loading the sheet');
      }
    };

    checkAccess();
  }, [params.id, router, supabase]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading spreadsheet...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Spreadsheet sheetId={params.id} />
    </main>
  );
} 