'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { authClient } from '@/lib/auth/client';

// Initialize Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || '';
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function Providers({ children }: { children: ReactNode }) {
  // Show error if Convex URL is not configured
  if (!convex) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-red-600 text-xl font-bold mb-2">Configuration Error</h1>
          <p className="text-gray-600">
            NEXT_PUBLIC_CONVEX_URL is not set. Please create a .env.local file with your Convex URL.
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
