'use client';

import { useEffect, useState } from 'react';
import { app } from '@/lib/firebase';

export default function FirebaseProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Firebase is initialized in the lib/firebase.ts file
    // This effect just confirms it's ready
    if (app) {
      setIsInitialized(true);
    }
  }, []);
  
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  
  return <>{children}</>;
}