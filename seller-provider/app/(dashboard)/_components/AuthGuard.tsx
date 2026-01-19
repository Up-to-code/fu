"use client";

import { useAuth } from "@/lib/auth/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProviderProvider } from "../_context/ProviderContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const ensureSellerInitialized = useMutation(api.users.ensureSellerInitialized);
    const [isInitializing, setIsInitializing] = useState(false);
    const initializedUserId = useRef<string | null>(null);
    const sellerProfile = useQuery(api.users.getSellerProfile, user?.id ? { userId: user.id } : "skip");

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/dashboard");
        }
    }, [isAuthenticated, authLoading, router]);

    // Ensure seller profile exists in Convex with "vendor" role
    useEffect(() => {
        const initUser = async () => {
            if (isAuthenticated && user && !isInitializing && user.id !== initializedUserId.current) {
                // Mark as initialized immediately to prevent loops
                initializedUserId.current = user.id;
                
                try {
                    setIsInitializing(true);
                    await ensureSellerInitialized({ name: user.name });
                } catch (error) {
                    console.error("Failed to ensure seller profile:", error);
                    // If it fails, we don't reset initializedUserId, so we won't retry automatically
                    // The second useEffect will handle the missing profile case
                } finally {
                    setIsInitializing(false);
                }
            }
        };

        initUser();
    }, [isAuthenticated, user, isInitializing, ensureSellerInitialized]); 
    
    useEffect(() => {
        if (!authLoading && isAuthenticated && user && !isInitializing && pathname?.startsWith("/dashboard")) {
            // Wait for sellerProfile to load (undefined means loading)
            if (sellerProfile === null) {
                // Profile loaded but is null (not found or not vendor)
                // However, ensureSellerInitialized should have created it.
                // If it's still null, maybe they are not a vendor (e.g. admin or customer role only?)
                // Or ensureSellerInitialized failed.
                router.replace("/onboarding");
            }
        }
    }, [authLoading, isAuthenticated, user, isInitializing, sellerProfile, pathname, router]);

    if (authLoading || isInitializing) {
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
