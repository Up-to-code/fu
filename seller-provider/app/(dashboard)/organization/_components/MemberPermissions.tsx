"use client";

import { getEffectivePermissions, permissionLabels, type Role } from "@/lib/permissions";
import { Permission } from "@/lib/permissions";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MemberPermissionsProps {
    role: Role;
    customPermissions?: Permission[];
}

export function MemberPermissions({ role, customPermissions }: MemberPermissionsProps) {
    const permissions = getEffectivePermissions(role, customPermissions);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="inline-flex items-center justify-center rounded-full hover:bg-gray-100 p-1">
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="w-64 p-4 bg-white border border-gray-200 shadow-lg">
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm text-gray-900 mb-3">الصلاحيات المتاحة</h4>
                        <div className="space-y-1.5 max-h-64 overflow-y-auto">
                            {permissions.map((permission) => (
                                <div key={permission} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                    <span>{permissionLabels[permission]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <p className="text-xs text-gray-500">
                                إجمالي الصلاحيات: {permissions.length}
                            </p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
