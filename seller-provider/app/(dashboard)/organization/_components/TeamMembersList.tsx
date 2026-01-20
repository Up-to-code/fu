"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Plus, MoreVertical, Settings } from "lucide-react";
import { RoleBadge } from "./RoleBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";
import { MemberPermissions } from "./MemberPermissions";
import type { TeamMember } from "../_hooks";

interface TeamMembersListProps {
    members: TeamMember[];
    onInviteMember?: () => void;
    onEditRole?: (member: TeamMember) => void;
    onRemoveMember?: (member: TeamMember) => void;
    onBulkAction?: (selectedMemberIds: string[]) => void;
}

export function TeamMembersList({ members, onInviteMember, onEditRole, onRemoveMember, onBulkAction }: TeamMembersListProps) {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedMembers(new Set(members.filter(m => m.role !== 'owner').map(m => m.id)));
        } else {
            setSelectedMembers(new Set());
        }
    };

    const nonOwnerMembers = members.filter(m => m.role !== 'owner');
    const allSelected = nonOwnerMembers.length > 0 && nonOwnerMembers.every(m => selectedMembers.has(m.id));

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#242C5A]" />
                    <h2 className="text-xl font-bold text-[#242C5A]">فريق العمل</h2>
                </div>
                <PermissionGuard permission={Permission.MANAGE_TEAM}>
                    <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl" onClick={onInviteMember}>
                        <Plus className="h-4 w-4 ml-2" />
                        دعوة عضو
                    </Button>
                </PermissionGuard>
            </div>
            {nonOwnerMembers.length > 0 && (
                <PermissionGuard permission={Permission.MANAGE_TEAM}>
                    <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="select-all"
                                    checked={allSelected}
                                    onCheckedChange={handleSelectAll}
                                    className="rounded"
                                />
                                <label
                                    htmlFor="select-all"
                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    تحديد الكل
                                </label>
                                {selectedMembers.size > 0 && (
                                    <span className="text-sm text-gray-500 mr-2">
                                        ({selectedMembers.size} محدد)
                                    </span>
                                )}
                            </div>
                            {selectedMembers.size > 0 && onBulkAction && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
                                    onClick={() => onBulkAction(Array.from(selectedMembers))}
                                >
                                    <Settings className="h-4 w-4 ml-2" />
                                    إجراءات مجمعة
                                </Button>
                            )}
                        </div>
                    </div>
                </PermissionGuard>
            )}
            <div className="space-y-4">
                {members.map((member) => {
                    const isOwner = member.role === "owner";
                    const isSelected = selectedMembers.has(member.id);
                    return (
                        <div 
                            key={member.id} 
                            className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                                isSelected ? 'bg-blue-50/50 border border-blue-200' : 'bg-gray-50/50 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-[#242C5A] text-white font-bold text-sm">
                                        {member.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RoleBadge role={member.role} />
                                <MemberPermissions role={member.role as "owner" | "admin" | "member"} customPermissions={member.customPermissions} />
                                <PermissionGuard permission={Permission.MANAGE_TEAM}>
                                    {!isOwner && (onEditRole || onRemoveMember) && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[150px]">
                                                {onEditRole && (
                                                    <DropdownMenuItem onClick={() => onEditRole(member)}>
                                                        تعديل الدور
                                                    </DropdownMenuItem>
                                                )}
                                                {onRemoveMember && (
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveMember(member)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        إزالة العضو
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </PermissionGuard>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
