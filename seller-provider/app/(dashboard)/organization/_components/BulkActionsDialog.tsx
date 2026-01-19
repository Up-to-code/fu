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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionCheckboxes } from "./PermissionCheckboxes";
import { Permission, getUserPermissions, type Role } from "@/lib/permissions";
import type { TeamMember } from "../_hooks";

interface BulkActionsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedMembers: TeamMember[];
    onSubmit: (action: "remove" | "edit-role" | "edit-permissions", data: { role?: Role; customPermissions?: Permission[] }) => void;
    isLoading?: boolean;
}

export function BulkActionsDialog({
    open,
    onOpenChange,
    selectedMembers,
    onSubmit,
    isLoading,
}: BulkActionsDialogProps) {
    const [activeTab, setActiveTab] = useState<"remove" | "edit-role" | "edit-permissions">("remove");
    const [role, setRole] = useState<Role>("member");
    const [customPermissions, setCustomPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        if (role) {
            setCustomPermissions(getUserPermissions(role));
        }
    }, [role]);

    const handleClose = (open: boolean) => {
        if (!open && !isLoading) {
            setActiveTab("remove");
            setRole("member");
            setCustomPermissions(getUserPermissions("member"));
        }
        onOpenChange(open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (activeTab === "remove") {
            onSubmit("remove", {});
        } else if (activeTab === "edit-role") {
            const permissionsToSubmit = role === "owner" ? undefined : customPermissions;
            onSubmit("edit-role", { role, customPermissions: permissionsToSubmit });
        } else if (activeTab === "edit-permissions") {
            onSubmit("edit-permissions", { customPermissions });
        }
    };

    const handlePermissionsChange = (permissions: Permission[]) => {
        setCustomPermissions(permissions);
    };

    const selectedCount = selectedMembers.length;
    const selectedNames = selectedMembers.map(m => m.name).join(", ");

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>إجراءات مجمعة</DialogTitle>
                    <DialogDescription>
                        {selectedCount > 0 && (
                            <>
                                تم تحديد {selectedCount} {selectedCount === 1 ? "عضو" : "أعضاء"}
                                <br />
                                <span className="text-xs text-gray-500">{selectedNames}</span>
                            </>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="remove">إزالة</TabsTrigger>
                            <TabsTrigger value="edit-role">تعديل الدور</TabsTrigger>
                            <TabsTrigger value="edit-permissions">تعديل الصلاحيات</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="remove" className="space-y-4 py-4">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-sm text-red-800 font-medium">
                                    تحذير: سيتم إزالة {selectedCount} {selectedCount === 1 ? "عضو" : "أعضاء"} من الفريق.
                                </p>
                                <p className="text-xs text-red-600 mt-2">
                                    لا يمكن التراجع عن هذا الإجراء.
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="edit-role" className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="bulk-role">الدور الجديد *</Label>
                                <Select value={role} onValueChange={(value) => setRole(value as Role)} disabled={isLoading}>
                                    <SelectTrigger className="rounded-xl" id="bulk-role">
                                        <SelectValue placeholder="اختر الدور" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">مدير</SelectItem>
                                        <SelectItem value="member">عضو</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {role !== "owner" && (
                                <div className="space-y-2">
                                    <Label>الصلاحيات</Label>
                                    <div className="border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto custom-scrollbar">
                                        <PermissionCheckboxes
                                            role={role}
                                            initialPermissions={customPermissions}
                                            onChange={handlePermissionsChange}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="edit-permissions" className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>الصلاحيات الجديدة</Label>
                                <div className="border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto custom-scrollbar">
                                    <PermissionCheckboxes
                                        role="member"
                                        initialPermissions={customPermissions}
                                        onChange={handlePermissionsChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    سيتم تطبيق هذه الصلاحيات على جميع الأعضاء المحددين (مع الحفاظ على أدوارهم الحالية)
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>

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
                            disabled={isLoading || selectedCount === 0}
                            className={activeTab === "remove" ? "bg-red-600 hover:bg-red-700" : "bg-[#242C5A] hover:bg-[#1a2144]"}
                        >
                            {isLoading 
                                ? "جاري المعالجة..." 
                                : activeTab === "remove" 
                                    ? `إزالة ${selectedCount} ${selectedCount === 1 ? "عضو" : "أعضاء"}`
                                    : "تطبيق التغييرات"
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
