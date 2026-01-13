"use client";

import { Badge } from "@/components/ui/badge";
import { Settings, Crown, User } from "lucide-react";

interface RoleBadgeProps {
    role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
    switch (role) {
        case 'owner':
            return (
                <Badge className="bg-amber-100 text-amber-700">
                    <Crown className="h-3 w-3 ml-1" />
                    المالك
                </Badge>
            );
        case 'admin':
            return (
                <Badge className="bg-blue-100 text-blue-700">
                    <Settings className="h-3 w-3 ml-1" />
                    مدير
                </Badge>
            );
        default:
            return (
                <Badge className="bg-gray-100 text-gray-700">
                    <User className="h-3 w-3 ml-1" />
                    عضو
                </Badge>
            );
    }
}
