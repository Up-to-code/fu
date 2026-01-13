"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Permission, getPermissionGroups, permissionLabels, getUserPermissions, type Role } from "@/lib/permissions";

interface PermissionCheckboxesProps {
    role: Role;
    initialPermissions?: Permission[];
    onChange: (permissions: Permission[]) => void;
    disabled?: boolean;
}

export function PermissionCheckboxes({ role, initialPermissions, onChange, disabled = false }: PermissionCheckboxesProps) {
    const permissionGroups = getPermissionGroups();
    const rolePermissions = getUserPermissions(role);
    
    // Use initialPermissions if provided, otherwise use role permissions
    const [selectedPermissions, setSelectedPermissions] = useState<Set<Permission>>(
        new Set(initialPermissions || rolePermissions)
    );

    useEffect(() => {
        // Update selected permissions when role or initialPermissions change
        setSelectedPermissions(new Set(initialPermissions || rolePermissions));
    }, [role, initialPermissions, rolePermissions]);

    const handlePermissionChange = (permission: Permission, checked: boolean) => {
        const newSelected = new Set(selectedPermissions);
        if (checked) {
            newSelected.add(permission);
        } else {
            newSelected.delete(permission);
        }
        setSelectedPermissions(newSelected);
        onChange(Array.from(newSelected));
    };

    const handleCategorySelectAll = (categoryPermissions: Permission[], checked: boolean) => {
        const newSelected = new Set(selectedPermissions);
        if (checked) {
            categoryPermissions.forEach(p => newSelected.add(p));
        } else {
            categoryPermissions.forEach(p => newSelected.delete(p));
        }
        setSelectedPermissions(newSelected);
        onChange(Array.from(newSelected));
    };

    const isOwner = role === "owner";

    if (isOwner || disabled) {
        return (
            <div className="text-sm text-gray-500 py-2">
                {isOwner ? "المالك لديه جميع الصلاحيات" : "الصلاحيات معطلة"}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {Object.entries(permissionGroups).map(([categoryName, categoryPermissions]) => {
                const allSelected = categoryPermissions.every(p => selectedPermissions.has(p));
                const someSelected = categoryPermissions.some(p => selectedPermissions.has(p));

                return (
                    <div key={categoryName} className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <Checkbox
                                id={`category-${categoryName}`}
                                checked={allSelected}
                                onCheckedChange={(checked) => handleCategorySelectAll(categoryPermissions, checked as boolean)}
                                disabled={disabled}
                                className="rounded"
                            />
                            <Label
                                htmlFor={`category-${categoryName}`}
                                className="text-sm font-bold text-gray-900 cursor-pointer"
                            >
                                {categoryName}
                                {someSelected && !allSelected && (
                                    <span className="text-xs text-gray-500 mr-2">(بعض الصلاحيات محدد)</span>
                                )}
                            </Label>
                        </div>
                        <div className="space-y-2 pr-6 custom-scrollbar">
                            {categoryPermissions.map((permission) => (
                                <div key={permission} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`permission-${permission}`}
                                        checked={selectedPermissions.has(permission)}
                                        onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                                        disabled={disabled}
                                        className="rounded"
                                    />
                                    <Label
                                        htmlFor={`permission-${permission}`}
                                        className="text-sm text-gray-700 cursor-pointer flex-1"
                                    >
                                        {permissionLabels[permission]}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
