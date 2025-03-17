'use client';

import { createSheet, getSheetBySlug, getUserSheets } from '@/lib/sheets';
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function TestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function runTests() {
    try {
      setIsLoading(true);
      const supabase = getSupabaseClient();
      
      // Test 0: Verify session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session) {
        throw new Error('No active session found. Please log in.');
      }
      setTestResults(prev => [...prev, `✅ Session verified for user: ${session.user.email}`]);

      // Test 1: Create a new sheet
      console.log('Creating sheet...');
      const sheet = await createSheet('Test Sheet', 'This is a test sheet');
      console.log('Sheet created:', sheet);
      setTestResults(prev => [...prev, '✅ Created sheet successfully']);

      // Test 2: Verify slug generation
      if (sheet.slug && sheet.slug.startsWith('test-sheet-')) {
        setTestResults(prev => [...prev, `✅ Slug generated correctly: ${sheet.slug}`]);
      }

      // Test 3: Get sheet by slug
      console.log('Fetching sheet by slug...');
      const fetchedSheet = await getSheetBySlug(sheet.slug);
      console.log('Fetched sheet:', fetchedSheet);
      if (fetchedSheet.id === sheet.id) {
        setTestResults(prev => [...prev, '✅ Retrieved sheet by slug']);
      }

      // Test 4: List user sheets
      console.log('Listing user sheets...');
      const sheets = await getUserSheets();
      console.log('User sheets:', sheets);
      if (sheets.length > 0) {
        setTestResults(prev => [...prev, `✅ Listed ${sheets.length} sheets`]);
      }

    } catch (err) {
      console.error('Test error:', err);
      setError({
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        details: err
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    runTests();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Running Database Tests...</h1>
        <p>Please wait while we verify the database setup...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600">Error</h1>
        <p className="mb-2">{error.message}</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(error.details, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Database Setup Test</h1>
      <div className="space-y-2">
        {testResults.map((result, i) => (
          <p key={i} className="font-mono">{result}</p>
        ))}
      </div>
    </div>
  );
} 