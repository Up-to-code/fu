"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./GoogleIcon";
import { AppleIcon } from "./AppleIcon";

interface SocialLoginButtonsProps {
    mode: "login" | "register";
    onGoogleClick?: () => void;
    onAppleClick?: () => void;
}

export function SocialLoginButtons({ mode, onGoogleClick, onAppleClick }: SocialLoginButtonsProps) {
    const googleText = mode === "login" ? "المتابعة مع Google" : "التسجيل مع Google";
    const appleText = mode === "login" ? "المتابعة مع Apple" : "التسجيل مع Apple";

    return (
        <>
            {/* Google Sign-in */}
            <Button
                variant="outline"
                className="w-full h-13 text-base font-medium bg-white hover:bg-slate-50 border-slate-200 rounded-xl transition-all flex items-center justify-center gap-3"
                onClick={onGoogleClick}
            >
                <GoogleIcon />
                <span>{googleText}</span>
            </Button>

            {/* Apple Sign-in */}
            <Button
                variant="outline"
                className="w-full h-13 text-base font-medium bg-slate-900 hover:bg-slate-800 text-white border-slate-900 rounded-xl transition-all flex items-center justify-center gap-3"
                onClick={onAppleClick}
            >
                <AppleIcon />
                <span>{appleText}</span>
            </Button>

        </>
    );
}
