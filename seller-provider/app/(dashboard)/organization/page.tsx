"use client";

import { useState } from "react";
import { useOrganization, useTeamMembers, useTeamMemberActions } from "./_hooks";
import { OrganizationInfoForm, TeamMembersList, InviteMemberDialog, EditRoleDialog, BulkActionsDialog } from "./_components";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Permission, type Role } from "@/lib/permissions";
import type { TeamMember } from "./_hooks";

export default function OrganizationPage() {
    const { organization, updateOrganization } = useOrganization();
    const teamMembers = useTeamMembers();
    const { addTeamMember, updateTeamMember, removeTeamMember } = useTeamMemberActions();

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [bulkActionsDialogOpen, setBulkActionsDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInviteMember = () => {
        setInviteDialogOpen(true);
    };

    const handleInviteSubmit = async (data: { email: string; role: string; customPermissions?: Permission[] }) => {
        setIsSubmitting(true);
        try {
            // Generate initials from email (first two characters)
            const initials = data.email.substring(0, 2).toUpperCase();
            // Generate a temporary name from email (will be updated when they accept)
            const name = data.email.split("@")[0];
            // Generate ID (in real app, this would come from backend)
            const id = `member-${Date.now()}`;

            addTeamMember({
                id,
                name,
                email: data.email,
                role: data.role,
                avatar: initials,
                customPermissions: data.customPermissions,
            });
            setInviteDialogOpen(false);
        } catch (error) {
            console.error("Error inviting member:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditRole = (member: TeamMember) => {
        setSelectedMember(member);
        setEditRoleDialogOpen(true);
    };

    const handleEditRoleSubmit = async (data: { role: string; customPermissions?: Permission[] }) => {
        if (!selectedMember) return;
        setIsSubmitting(true);
        try {
            updateTeamMember(selectedMember.id, { 
                role: data.role,
                customPermissions: data.customPermissions,
            });
            setEditRoleDialogOpen(false);
            setSelectedMember(null);
        } catch (error) {
            console.error("Error updating role:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveMember = (member: TeamMember) => {
        setSelectedMember(member);
        setRemoveDialogOpen(true);
    };

    const handleRemoveConfirm = async () => {
        if (!selectedMember) return;
        setIsSubmitting(true);
        try {
            removeTeamMember(selectedMember.id);
            setRemoveDialogOpen(false);
            setSelectedMember(null);
        } catch (error) {
            console.error("Error removing member:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveOrganization = async (data: {
        name: string;
        commercialRegistration: string;
        description?: string;
        logo?: string;
        links?: {
            website?: string;
            facebook?: string;
            twitter?: string;
            instagram?: string;
            linkedin?: string;
        };
    }) => {
        setIsSubmitting(true);
        try {
            // Merge links properly to handle optional fields
            const updates: any = {
                name: data.name,
                commercialRegistration: data.commercialRegistration,
            };
            if (data.description !== undefined) updates.description = data.description;
            if (data.logo !== undefined) updates.logo = data.logo;
            if (data.links !== undefined) {
                updates.links = {
                    ...organization.links,
                    ...data.links,
                };
            }
            updateOrganization(updates);
        } catch (error) {
            console.error("Error updating organization:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBulkAction = (memberIds: string[]) => {
        setSelectedMemberIds(memberIds);
        setBulkActionsDialogOpen(true);
    };

    const handleBulkActionSubmit = async (
        action: "remove" | "edit-role" | "edit-permissions",
        data: { role?: Role; customPermissions?: Permission[] }
    ) => {
        setIsSubmitting(true);
        try {
            if (action === "remove") {
                // Remove all selected members
                selectedMemberIds.forEach(id => {
                    removeTeamMember(id);
                });
            } else if (action === "edit-role") {
                // Update role and permissions for all selected members
                selectedMemberIds.forEach(id => {
                    updateTeamMember(id, {
                        role: data.role,
                        customPermissions: data.customPermissions,
                    });
                });
            } else if (action === "edit-permissions") {
                // Update only permissions for all selected members (keep their roles)
                selectedMemberIds.forEach(id => {
                    updateTeamMember(id, {
                        customPermissions: data.customPermissions,
                    });
                });
            }
            setBulkActionsDialogOpen(false);
            setSelectedMemberIds([]);
        } catch (error) {
            console.error("Error performing bulk action:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedMembers = teamMembers.filter((m) => selectedMemberIds.includes(m.id));

    return (
        <>
            <div className="space-y-8 max-w-4xl mx-auto" dir="rtl">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#242C5A]">منشأتي</h1>
                    <p className="text-gray-500">إدارة معلومات المنشأة وفريق العمل</p>
                </div>

                {/* Organization Info */}
                <OrganizationInfoForm
                    name={organization.name}
                    slug={organization.slug}
                    commercialRegistration={organization.commercialRegistration}
                    onSave={handleSaveOrganization}
                    isLoading={isSubmitting}
                />

                {/* Team Members */}
                <TeamMembersList
                    members={teamMembers}
                    onInviteMember={handleInviteMember}
                    onEditRole={handleEditRole}
                    onRemoveMember={handleRemoveMember}
                    onBulkAction={handleBulkAction}
                />
            </div>

            {/* Invite Member Dialog */}
            <InviteMemberDialog
                open={inviteDialogOpen}
                onOpenChange={setInviteDialogOpen}
                onSubmit={handleInviteSubmit}
                isLoading={isSubmitting}
            />

            {/* Edit Role Dialog */}
            {selectedMember && (
                <EditRoleDialog
                    open={editRoleDialogOpen}
                    onOpenChange={setEditRoleDialogOpen}
                    onSubmit={handleEditRoleSubmit}
                    memberName={selectedMember.name}
                    memberEmail={selectedMember.email}
                    currentRole={selectedMember.role}
                    currentCustomPermissions={selectedMember.customPermissions}
                    isLoading={isSubmitting}
                />
            )}

            <BulkActionsDialog
                open={bulkActionsDialogOpen}
                onOpenChange={setBulkActionsDialogOpen}
                selectedMembers={selectedMembers}
                onSubmit={handleBulkActionSubmit}
                isLoading={isSubmitting}
            />

            {/* Remove Member Confirmation Dialog */}
            <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>إزالة العضو</AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedMember && (
                                <>
                                    هل أنت متأكد من إزالة <strong>{selectedMember.name}</strong> من الفريق؟
                                    <br />
                                    لا يمكن التراجع عن هذا الإجراء.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRemoveConfirm}
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isSubmitting ? "جاري الإزالة..." : "تأكيد الإزالة"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
