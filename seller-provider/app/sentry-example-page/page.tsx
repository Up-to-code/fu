"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  const triggerError = () => {
    const error = new Error("Sentry test error from /sentry-example-page");
    Sentry.captureException(error);
    throw error;
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-bold">Sentry Example Page</h1>
        <p className="text-sm text-gray-600">
          Click the button to send a test error to Sentry.
        </p>
        <button
          type="button"
          onClick={triggerError}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          Trigger Test Error
        </button>
      </div>
    </main>
  );
}

