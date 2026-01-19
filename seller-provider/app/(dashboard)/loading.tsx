import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full bg-slate-50/50">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-64 flex-col border-l bg-white p-4 space-y-4">
        <div className="h-8 w-32 bg-slate-100 rounded animate-pulse" />
        <div className="space-y-2 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-slate-50 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
          <div className="h-10 w-10 bg-slate-100 rounded-full animate-pulse" />
        </div>

        {/* Page Content Skeleton */}
        <div className="flex-1 p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-10 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-xl border border-slate-100 p-6 animate-pulse" />
            ))}
          </div>

          <div className="h-96 bg-white rounded-xl border border-slate-100 animate-pulse" />
        </div>
      </div>

      {/* Centered Spinner Overlay (Optional, for smoother transition) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm pointer-events-none">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
