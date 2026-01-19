"use client";

import { useAuth } from "@/lib/auth/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProviderProvider } from "../_context/ProviderContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/dashboard");
        }
    }, [isAuthenticated, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-slate-500">جاري التحميل...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <ProviderProvider>
            {children}
        </ProviderProvider>
    );
}
