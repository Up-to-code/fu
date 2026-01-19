"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Building2,
    Menu,
    Layers,
    BarChart3,
    HelpCircle,
    Bell,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePermissions } from "@/app/(dashboard)/_hooks/usePermissions";
import { useProviderConfig } from "@/app/(dashboard)/_hooks/useProviderConfig";
import { Permission } from "@/lib/permissions";

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

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const { mainRoutes, organizationRoutes, accountRoutes } = useProviderConfig();

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("تم تسجيل الخروج بنجاح");
                        router.push("/login");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("فشل تسجيل الخروج");
        }
    };
    
    // Filter routes based on permissions
    const filteredMainRoutes = mainRoutes.filter(route => 
        !route.permission || hasPermission(route.permission as Permission)
    );
    const filteredOrganizationRoutes = organizationRoutes.filter(route => 
        !route.permission || hasPermission(route.permission as Permission)
    );
    const filteredAccountRoutes = accountRoutes.filter(route => 
        !route.permission || hasPermission(route.permission as Permission)
    );

    // Mock user data for UI demo
    const mockUser = {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        initials: "أم"
    };

    return (
        <div className="flex flex-col h-full bg-[#1A1A27] text-white border-none relative font-sans">
            {/* Logo Area */}
            <div className="h-28 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-[#1A1A27]">
                        <Layers className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white tracking-tighter leading-none italic uppercase">Antig</span>
                        <span className="text-[10px] text-primary-foreground/50 font-bold tracking-[0.2em] mt-1 pr-0.5">DASHBOARD</span>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-10 px-5 space-y-10 no-scrollbar">
                {/* Main Section */}
                <div className="space-y-2">
                    {filteredMainRoutes.map((route) => (
                        <SidebarItem
                            key={route.href}
                            route={route}
                            isActive={pathname === route.href}
                        />
                    ))}
                </div>

                {/* Organization Section */}
                <div className="space-y-4">
                    <h3 className="px-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                        الإدارة
                    </h3>
                    <div className="space-y-2">
                        {filteredOrganizationRoutes.map((route) => (
                            <SidebarItem
                                key={route.href}
                                route={route}
                                isActive={pathname === route.href}
                            />
                        ))}
                    </div>
                </div>

                {/* Account Section */}
                <div className="space-y-4">
                    <h3 className="px-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                        التفضيلات
                    </h3>
                    <div className="space-y-2">
                        {filteredAccountRoutes.map((route) => (
                            <SidebarItem
                                key={route.href}
                                route={route}
                                isActive={pathname === route.href}
                            />
                        ))}
                    </div>
                </div>
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
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-l border-white/10 w-72 bg-[#0F172A] text-white">
                <DashboardSidebar />
            </SheetContent>
        </Sheet>
    );
}
