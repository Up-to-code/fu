"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Permission, getUserPermissions, type Role } from "@/lib/permissions";

interface InviteMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: { email: string; role: string; customPermissions?: Permission[] }) => void;
    isLoading?: boolean;
}

export function InviteMemberDialog({ open, onOpenChange, onSubmit, isLoading }: InviteMemberDialogProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Role>("member");
    const [customPermissions, setCustomPermissions] = useState<Permission[]>([]);

    // When role changes, update permissions to match role defaults
    useEffect(() => {
        if (role) {
            setCustomPermissions(getUserPermissions(role));
        }
    }, [role]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const permissionsToSubmit = role === "owner" ? undefined : customPermissions;
        onSubmit({
            email: email.trim(),
            role,
            customPermissions: permissionsToSubmit,
        });
        // Reset form
        setEmail("");
        setRole("member");
        setCustomPermissions(getUserPermissions("member"));
    };

    const handleClose = (open: boolean) => {
        if (!open && !isLoading) {
            setEmail("");
            setRole("member");
            setCustomPermissions(getUserPermissions("member"));
        }
        onOpenChange(open);
    };

    const handlePermissionsChange = (permissions: Permission[]) => {
        setCustomPermissions(permissions);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>دعوة عضو جديد</DialogTitle>
                    <DialogDescription>
                        أدخل بريد العضو الإلكتروني واختر الدور المطلوب
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">الدور *</Label>
                            <Select value={role} onValueChange={(value) => setRole(value as Role)} disabled={isLoading}>
                                <SelectTrigger className="rounded-xl" id="role">
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
                        <Button type="submit" disabled={isLoading} className="bg-[#242C5A] hover:bg-[#1a2144]">
                            {isLoading ? "جاري الإرسال..." : "إرسال الدعوة"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
