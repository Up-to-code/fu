import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/app/(dashboard)/_hooks/useCurrentUser";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

import { Permission } from "@/lib/permissions";

export type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    customPermissions?: Permission[];
    userId?: string;
};

/**
 * Hook to get organization data
 */
export function useOrganization() {
    const user = useCurrentUser();
    const organizationId = user?.organizationId as Id<"organizations"> | undefined;

    const organization = useQuery(
        api.organizations.getOrganization,
        organizationId ? { organizationId } : "skip"
    );

    const updateOrganizationMutation = useMutation(api.organizations.updateOrganization);
    const createOrganizationMutation = useMutation(api.organizations.createOrganization);

    const updateOrganization = async (updates: any) => {
        if (organizationId) {
            // Map links.website to website and remove links/logo which are not in schema
            const website = updates.links?.website;
            
            const cleanUpdates: any = {
                organizationId,
            };
            
            if (updates.name) cleanUpdates.name = updates.name;
            if (updates.slug) cleanUpdates.slug = updates.slug;
            if (updates.commercialRegistration !== undefined) cleanUpdates.commercialRegistration = updates.commercialRegistration;
            if (updates.description !== undefined) cleanUpdates.description = updates.description;
            if (website !== undefined) cleanUpdates.website = website;
            
            // Logo is not supported in schema yet
            
            await updateOrganizationMutation(cleanUpdates);
            toast.success("تم تحديث معلومات المنشأة");
        } else {
            // Create mode
            // If we are here, it means we are creating a new org
            // But usually creating is done via a separate flow or if this form is used for creation
            // The current UI assumes editing an existing one mostly.
            // If we want to support creation here, we need to handle it.
            // But let's assume update for now if org exists.
            if (updates.name && updates.slug) {
                 await createOrganizationMutation(updates);
                 toast.success("تم إنشاء المنشأة بنجاح");
            }
        }
    };
    
    // Return a default structure if loading or not found, to avoid UI crashes during transition
    const safeOrganization = organization ? {
        ...organization,
        commercialRegistration: organization.commercialRegistration || "",
        description: organization.description || "",
        links: {
            website: organization.website,
        }
    } : {
        name: "",
        slug: "",
        commercialRegistration: "",
        description: "",
        links: {},
    };

    return {
        organization: safeOrganization,
        updateOrganization,
        isLoading: !organization && !!organizationId,
    };
}

/**
 * Hook to get team members
 */
export function useTeamMembers(): TeamMember[] {
    const user = useCurrentUser();
    const organizationId = user?.organizationId as Id<"organizations"> | undefined;

    const membersPage = useQuery(
        api.organizationMembers.listOrganizationMembers,
        organizationId ? { organizationId, paginationOpts: { numItems: 50, cursor: null } } : "skip"
    );

    if (!membersPage) return [];

    return membersPage.page.map((m: any) => ({
        id: m._id,
        name: m.user?.name || m.inviteEmail?.split('@')[0] || "Unknown",
        email: m.user?.email || m.inviteEmail || "", // userProfile schema doesn't have email usually, but let's assume we can get it or use inviteEmail
        role: m.role,
        avatar: m.user?.name?.substring(0, 2).toUpperCase() || "??",
        customPermissions: m.customPermissions as Permission[],
        userId: m.userId,
    }));
}

/**
 * Hook for team member actions
 */
export function useTeamMemberActions() {
    const user = useCurrentUser();
    const organizationId = user?.organizationId as Id<"organizations"> | undefined;

    const createMemberMutation = useMutation(api.organizationMembers.createOrganizationMember);
    const updateMemberMutation = useMutation(api.organizationMembers.updateOrganizationMember);
    const deleteMemberMutation = useMutation(api.organizationMembers.deleteOrganizationMember);

    const addTeamMember = async (member: any) => {
        if (!organizationId) return;
        try {
            await createMemberMutation({
                organizationId,
                email: member.email,
                role: member.role,
                customPermissions: member.customPermissions,
            });
            toast.success("تمت دعوة العضو بنجاح");
        } catch (error: any) {
            toast.error("فشل إضافة العضو", { description: error.message });
            throw error;
        }
    };

    const updateTeamMember = async (id: string, updates: any) => {
        try {
            await updateMemberMutation({
                memberId: id as Id<"organizationMembers">,
                role: updates.role,
                customPermissions: updates.customPermissions,
            });
            toast.success("تم تحديث العضو بنجاح");
        } catch (error: any) {
            toast.error("فشل تحديث العضو", { description: error.message });
            throw error;
        }
    };

    const removeTeamMember = async (id: string) => {
        try {
            await deleteMemberMutation({
                memberId: id as Id<"organizationMembers">,
            });
            toast.success("تم حذف العضو بنجاح");
        } catch (error: any) {
            toast.error("فشل حذف العضو", { description: error.message });
            throw error;
        }
    };
    
    return {
        addTeamMember,
        updateTeamMember,
        removeTeamMember,
    };
}
