"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Wallet,
    Settings,
    Layers,
    LogOut,
    Menu,
    FileText,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainRoutes = [
    {
        label: "الرئيسية",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "خدماتي",
        icon: Briefcase,
        href: "/services",
    },
    {
        label: "الرسائل",
        icon: MessageSquare,
        href: "/messages",
    },
    {
        label: "المالية",
        icon: Wallet,
        href: "/finance",
    },
    {
        label: "الإعدادات",
        icon: Settings,
        href: "/settings",
    },
    {
        label: "التوثيق",
        icon: FileText,
        href: "/docs",
    },
];

function SidebarItem({ route, isActive }: { route: any, isActive: boolean }) {
    return (
        <Link
            href={route.href}
            className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-300 group relative",
                isActive
                    ? "bg-white text-[#242C5A]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <route.icon className={cn("h-5 w-5 transition-all", isActive ? "scale-110" : "opacity-70 group-hover:opacity-100")} />
            <span>{route.label}</span>
        </Link>
    );
}

export function DashboardSidebar({ verificationStatus }: { verificationStatus: "unverified" | "pending" | "verified" | "rejected" }) {
    const pathname = usePathname();

    // Mock user data for UI demo
    const mockUser = {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        initials: "أم"
    };

    const visibleMainRoutes =
        verificationStatus === "verified"
            ? mainRoutes
            : mainRoutes.filter((r) => r.href !== "/docs");

    const verificationCtaText =
        verificationStatus === "pending"
            ? "طلب التحقق قيد المراجعة"
            : verificationStatus === "rejected"
            ? "أعد إرسال طلب التحقق"
            : "أكمل التحقق";

    return (
        <div className="flex flex-col h-full bg-[#1A1A27] text-white border-none relative font-sans">
            {/* Logo Area */}
            <div className="h-28 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-[#1A1A27]">
                        <Layers className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white tracking-tighter leading-none italic uppercase">Services</span>
                        <span className="text-[10px] text-primary-foreground/50 font-bold tracking-[0.2em] mt-1 pr-0.5">PROVIDER</span>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-10 px-5 space-y-10 no-scrollbar">
                {/* Main Section */}
                <div className="space-y-2">
                    {visibleMainRoutes.map((route) => (
                        <SidebarItem
                            key={route.href}
                            route={route}
                            isActive={pathname === route.href || pathname.startsWith(route.href + "/")}
                        />
                    ))}
                </div>

                {verificationStatus !== "verified" && (
                    <div className="pt-2">
                        <Link
                            href="/verification"
                            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-300 group relative bg-white/5 hover:bg-white/10 text-white"
                        >
                            <CheckCircle2 className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-all" />
                            <span>{verificationCtaText}</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* User Profile Footer - Static Demo */}
            <div className="p-6 mt-auto border-t border-white/5">
                <div className="flex items-center gap-4 p-3 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all cursor-pointer group pr-2">
                    <Avatar className="h-11 w-11 border-2 border-white/10 group-hover:border-white/20 transition-all">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#242C5A] text-white font-bold">
                            {mockUser.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{mockUser.name}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider truncate">
                            {mockUser.email}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-white/30 hover:text-red-400 hover:bg-white/5"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function MobileSidebar({ verificationStatus }: { verificationStatus: "unverified" | "pending" | "verified" | "rejected" }) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-l border-white/10 w-72 bg-[#0F172A] text-white">
                <DashboardSidebar verificationStatus={verificationStatus} />
            </SheetContent>
        </Sheet>
    );
}
