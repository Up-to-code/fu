/**
 * Loading State Component
 * Shows loading spinner and skeleton loaders
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export function LoadingState({ className, size = 'md', text }: LoadingStateProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-2 p-8", className)}>
            <Loader2 className={cn("animate-spin text-[#242C5A]", sizeClasses[size])} />
            {text && <p className="text-sm text-gray-500">{text}</p>}
        </div>
    );
}

/**
 * Skeleton Loader Component
 */
export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
    );
}
