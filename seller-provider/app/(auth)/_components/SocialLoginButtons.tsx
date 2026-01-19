"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./GoogleIcon";
import { authClient } from "@/lib/auth/client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface SocialLoginButtonsProps {
    mode: "login" | "register";
    onGoogleClick?: () => void;
}

export function SocialLoginButtons({ mode, onGoogleClick }: SocialLoginButtonsProps) {
    const googleText = mode === "login" ? "المتابعة مع Google" : "التسجيل مع Google";
    const searchParams = useSearchParams();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleGoogleClick = async () => {
        if (onGoogleClick) {
            onGoogleClick();
            return;
        }

        setIsGoogleLoading(true);
        try {
            console.log("Starting Google OAuth flow...", { provider: "google", callbackURL: redirectTo });

            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo,
            }) as { data?: { url?: string }; error?: any } | undefined;

            console.log("Google OAuth result:", result);

            // If result has an error, show it
            if (result?.error) {
                setIsGoogleLoading(false);
                console.error("Google OAuth error:", result.error);
                console.error("Full result:", result);

                // Extract error message from various possible formats
                let errorMessage = "حدث خطأ أثناء الاتصال بخدمة Google.";

                if (typeof result.error === 'string') {
                    errorMessage = result.error;
                } else if (result.error?.message) {
                    errorMessage = result.error.message;
                } else if (result.error?.code) {
                    errorMessage = `خطأ ${result.error.code}: ${result.error.message || 'يرجى التحقق من إعدادات OAuth'}`;
                } else if (typeof result.error === 'object') {
                    // Try to extract any useful info from the error object
                    const errorKeys = Object.keys(result.error);
                    if (errorKeys.length > 0) {
                        errorMessage = `خطأ في OAuth: ${JSON.stringify(result.error)}`;
                    } else {
                        errorMessage = "حدث خطأ غير معروف. يرجى التحقق من إعدادات Google OAuth في Convex (GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET)";
                    }
                }

                toast.error("فشل تسجيل الدخول مع Google", {
                    description: errorMessage,
                    duration: 5000,
                });
                return;
            }

            // If result has a redirect URL, navigate to it (OAuth flow)
            if (result?.data?.url) {
                console.log("Redirecting to OAuth URL:", result.data.url);
                window.location.href = result.data.url;
                return; // Don't set loading to false, we're redirecting
            }

            // If no URL but no error, check if we got a response
            if (result?.data) {
                console.log("OAuth response received but no URL:", result.data);
                // The OAuth flow might be starting, wait a bit
                setTimeout(() => {
                    setIsGoogleLoading(false);
                }, 2000);
            } else {
                setIsGoogleLoading(false);
                console.warn("No data or URL in OAuth response");
            }
        } catch (error: any) {
            setIsGoogleLoading(false);
            console.error("Google OAuth exception:", error);
            const errorMessage = error?.message || error?.toString() || "حدث خطأ غير متوقع. يرجى التحقق من إعدادات OAuth أو المحاولة مرة أخرى.";
            toast.error("فشل تسجيل الدخول مع Google", {
                description: errorMessage,
                duration: 5000,
            });
        }
    };

    return (
        <>
            {/* Google Sign-in */}
            <Button
                variant="outline"
                className="w-full h-12 text-base font-medium bg-white hover:bg-slate-50 border-slate-200 rounded-xl transition-all flex items-center justify-center gap-3"
                onClick={handleGoogleClick}
                disabled={isGoogleLoading}
            >
                <GoogleIcon />
                <span>{isGoogleLoading ? "جاري التحميل..." : googleText}</span>
            </Button>
        </>
    );
}
