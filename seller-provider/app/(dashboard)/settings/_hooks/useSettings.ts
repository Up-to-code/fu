import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/app/(dashboard)/_hooks/useCurrentUser";
import { toast } from "sonner";
import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Hook to manage user settings
 */
export function useUserSettings() {
    const user = useCurrentUser();
    const [localProfile, setLocalProfile] = useState<any>(null);
    
    // Fetch profile from Convex
    const profile = useQuery(
        api.users.getUserProfile,
        user?.id ? { userId: user.id } : "skip"
    );
    
    // Sync local state when profile loads
    useEffect(() => {
        if (profile) {
            const safeProfile = profile as any; // Cast to any because union type issues
            setLocalProfile({
                name: safeProfile.name || "",
                businessName: safeProfile.businessName || "",
                phone: safeProfile.phone || "",
                email: user?.email || "",
                language: safeProfile.language || "ar",
            });
        }
    }, [profile, user]);

    const updateUserProfileMutation = useMutation(api.users.updateUserProfile);

    const updateProfile = useCallback(async (updates: any) => {
        if (!user?.id) return;
        
        try {
            await updateUserProfileMutation({
                userId: user.id,
                name: updates.name,
                businessName: updates.businessName,
                phone: updates.phone,
                language: updates.language,
                expectedUpdatedAt: (profile as any)?.updatedAt,
            });
            toast.success("تم تحديث الملف الشخصي بنجاح");
        } catch (error: any) {
            toast.error("فشل تحديث الملف الشخصي", { description: error.message });
            throw error;
        }
    }, [user?.id, updateUserProfileMutation, profile]);

    const userData = useMemo(() => localProfile || {
        name: user?.name || "",
        businessName: "",
        phone: "",
        email: user?.email || "",
        language: "ar",
    }, [localProfile, user]);

    return useMemo(() => ({
        user: userData,
        updateProfile,
        isLoading: !profile && !!user?.id,
    }), [userData, updateProfile, profile, user?.id]);
}
