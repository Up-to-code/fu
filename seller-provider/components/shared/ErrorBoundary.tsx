"use client";

/**
 * Error Boundary Component
 * Catches and displays errors with retry option
 */

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[400px]">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-gray-900">حدث خطأ</h2>
                        <p className="text-gray-500">
                            {this.state.error?.message || "حدث خطأ غير متوقع"}
                        </p>
                    </div>
                    <Button onClick={this.handleReset} variant="outline">
                        إعادة المحاولة
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
