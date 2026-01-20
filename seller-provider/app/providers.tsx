'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { authClient } from '@/lib/auth/client';
import { getPublicEnv } from '@/lib/env';

// Initialize Convex client
let convex: ConvexReactClient | null = null;
let envError: string | null = null;
try {
  const env = getPublicEnv();
  convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);
} catch (err) {
  const details = err instanceof Error ? err.message : "Unknown configuration error";
  envError = `${details} Please configure seller-provider/.env.local.`;
}

export function Providers({ children }: { children: ReactNode }) {
  // Show error if Convex URL is not configured
  if (!convex) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-red-600 text-xl font-bold mb-2">Configuration Error</h1>
          <p className="text-gray-600">
            {envError || 'Required environment variables are missing.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexProvider client={convex}>
        <ConvexBetterAuthProvider
          client={convex}
          authClient={authClient}
        >
          {children}
        </ConvexBetterAuthProvider>
      </ConvexProvider>
    </ThemeProvider>
  );
}
