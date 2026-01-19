"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PermissionCheckboxes } from "./PermissionCheckboxes";
import { Permission, getUserPermissions, getEffectivePermissions, type Role } from "@/lib/permissions";

interface EditRoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: { role: string; customPermissions?: Permission[] }) => void;
    memberName: string;
    memberEmail: string;
    currentRole: string;
    currentCustomPermissions?: Permission[];
    isLoading?: boolean;
}

export function EditRoleDialog({
    open,
    onOpenChange,
    onSubmit,
    memberName,
    memberEmail,
    currentRole,
    currentCustomPermissions,
    isLoading,
}: EditRoleDialogProps) {
    const [role, setRole] = useState<Role>(currentRole as Role);
    const [customPermissions, setCustomPermissions] = useState<Permission[]>(() => {
        return getEffectivePermissions(currentRole as Role, currentCustomPermissions);
    });

    useEffect(() => {
        setRole(currentRole as Role);
        setCustomPermissions(getEffectivePermissions(currentRole as Role, currentCustomPermissions));
    }, [currentRole, currentCustomPermissions, open]);

    // When role changes, update permissions to match new role defaults (but keep custom if they exist)
    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
        // If switching roles, use the new role's permissions as starting point
        // User can then customize from there
        if (newRole !== currentRole) {
            setCustomPermissions(getUserPermissions(newRole));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const permissionsToSubmit = role === "owner" ? undefined : customPermissions;
        onSubmit({
            role,
            customPermissions: permissionsToSubmit,
        });
    };

    const handleClose = (open: boolean) => {
        if (!open && !isLoading) {
            setRole(currentRole as Role);
            setCustomPermissions(getEffectivePermissions(currentRole as Role, currentCustomPermissions));
        }
        onOpenChange(open);
    };

    const handlePermissionsChange = (permissions: Permission[]) => {
        setCustomPermissions(permissions);
    };

    const isOwner = currentRole === "owner";
    const isRoleChanged = role !== currentRole;
    const arePermissionsChanged = JSON.stringify(customPermissions.sort()) !== JSON.stringify(getEffectivePermissions(currentRole as Role, currentCustomPermissions).sort());

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>تعديل دور العضو</DialogTitle>
                    <DialogDescription>
                        <div className="mt-2">
                            <p className="font-medium text-gray-900">{memberName}</p>
                            <p className="text-sm text-gray-500">{memberEmail}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">الدور *</Label>
                            <Select value={role} onValueChange={(value) => handleRoleChange(value as Role)} disabled={isLoading || isOwner}>
                                <SelectTrigger className="rounded-xl" id="role">
                                    <SelectValue placeholder="اختر الدور" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">مدير</SelectItem>
                                    <SelectItem value="member">عضو</SelectItem>
                                    {isOwner && (
                                        <SelectItem value="owner" disabled>مالك</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {isOwner && (
                                <p className="text-xs text-gray-500 mt-1">لا يمكن تعديل دور المالك</p>
                            )}
                        </div>
                        {!isOwner && (
                            <div className="space-y-2">
                                <Label>الصلاحيات</Label>
                                <div className="border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto custom-scrollbar">
                                    <PermissionCheckboxes
                                        role={role}
                                        initialPermissions={customPermissions}
                                        onChange={handlePermissionsChange}
                                        disabled={isLoading || isOwner}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleClose(false)}
                            disabled={isLoading}
                        >
                            إلغاء
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading || (!isRoleChanged && !arePermissionsChanged) || isOwner} 
                            className="bg-[#242C5A] hover:bg-[#1a2144]"
                        >
                            {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
