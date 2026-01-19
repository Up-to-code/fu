"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Menu, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/hooks";

export function LandingHeader() {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 space-x-reverse group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#242C5A] rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-[#242C5A] rounded-xl p-2.5">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#242C5A] leading-tight">أثاث بلس</span>
                            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">شريكك الموثوق</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
                        <Link href="#المميزات" className="text-sm font-semibold text-gray-700 hover:text-[#242C5A] transition-colors">
                            المميزات
                        </Link>
                        <Link href="#الشراكة" className="text-sm font-semibold text-gray-700 hover:text-[#242C5A] transition-colors">
                            الشراكة
                        </Link>
                        <Link href="#الخدمات" className="text-sm font-semibold text-gray-700 hover:text-[#242C5A] transition-colors">
                            الخدمات
                        </Link>
                        <Link href="#التواصل" className="text-sm font-semibold text-gray-700 hover:text-[#242C5A] transition-colors">
                            التواصل
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-24">
                                <Loader2 className="h-5 w-5 animate-spin text-[#242C5A]" />
                            </div>
                        ) : isAuthenticated ? (
                            <Link href="/dashboard">
                                <Button className="bg-[#242C5A] hover:bg-[#1a2144] text-white font-semibold px-6 h-10 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>لوحة التحكم</span>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-[#242C5A] transition-colors">
                                    تسجيل الدخول
                                </Link>
                                <Link href="/register" className="hidden sm:inline-block">
                                    <Button className="bg-[#242C5A] hover:bg-[#1a2144] text-white font-semibold px-6 h-10 rounded-lg shadow-sm hover:shadow-md transition-all">
                                        انضم إلينا
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
