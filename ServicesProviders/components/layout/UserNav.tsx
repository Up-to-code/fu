"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";

export function UserNav() {
    // Mock user data for UI demo
    const mockUser = {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        initials: "أم"
    };

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-gray-100 transition-all p-0">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={mockUser.name} />
                        <AvatarFallback className="bg-slate-900 text-white font-bold text-xs">
                            {mockUser.initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-gray-100 rounded-xl p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900">{mockUser.name}</p>
                        <p className="text-xs leading-none text-gray-500">
                            {mockUser.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-50" />
                <DropdownMenuGroup>
                    <Link href="/settings">
                        <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 px-2 py-2">
                            <User className="ml-2 h-4 w-4 text-gray-500" />
                            الملف الشخصي
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                        <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 px-2 py-2">
                            <Settings className="ml-2 h-4 w-4 text-gray-500" />
                            الإعدادات
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-50" />
                <Link href="/login">
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 focus:text-red-700 px-2 py-2">
                        <LogOut className="ml-2 h-4 w-4" />
                        تسجيل الخروج
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
