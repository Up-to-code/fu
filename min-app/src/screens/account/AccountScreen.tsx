// File: src/screens/account/AccountScreen.tsx
// Purpose: Redesigned Account Screen with clean grid layout, role badge, and flat minimal design

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { useAccountStats } from '../../hooks/useAccountStats';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useProfileImage } from '../../hooks/useLocalData';
import { RoleBadge } from '../shared';

// Helper function to get user initials
const getUserInitials = (user: { name?: string | null; email?: string | null } | null): string => {
    if (!user) return 'U';
    
    if (user.name) {
        const firstLetter = user.name.trim().charAt(0).toUpperCase();
        return firstLetter || 'U';
    }
    
    if (user.email) {
        const firstLetter = user.email.trim().charAt(0).toUpperCase();
        return firstLetter || 'U';
    }
    
    return 'U';
};

// Helper function to render avatar component
const renderAvatar = (
    user: { image?: string | null; name?: string | null; email?: string | null } | null,
    convexImageUrl: string | null | undefined,
    localImageBase64: string | null,
    size: number = 80
) => {
    // Priority: Convex storage > SQLite base64 > user image > initials
    if (convexImageUrl) {
        return (
            <Image
                source={{ uri: convexImageUrl }}
                style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
            />
        );
    }
    
    if (localImageBase64) {
        return (
            <Image
                source={{ uri: `data:image/jpeg;base64,${localImageBase64}` }}
                style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
            />
        );
    }
    
    if (user?.image) {
        return (
            <Image
                source={{ uri: user.image }}
                style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
            />
        );
    }
    
    const initials = getUserInitials(user);
    const backgroundColor = user ? COLORS.primary : '#e2e8f0';
    
    return (
        <View style={[
            styles.avatar,
            styles.avatarInitials,
            { width: size, height: size, borderRadius: size / 2, backgroundColor }
        ]}>
            {user ? (
                <Text style={[styles.avatarInitialsText, { fontSize: size * 0.4 }]}>
                    {initials}
                </Text>
            ) : (
                <Feather name="user" size={size * 0.5} color="#94a3b8" />
            )}
        </View>
    );
};

// Stat Card Component - Flat minimal design
const StatCard = ({ 
    icon, 
    label, 
    count, 
    onPress 
}: { 
    icon: string; 
    label: string; 
    count: number | undefined; 
    onPress: () => void;
}) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.statIconContainer}>
            <Feather name={icon as any} size={24} color={COLORS.primary} />
        </View>
        <Text style={styles.statCount}>{count ?? 0}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
);

export default function AccountScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const { role } = useUserProfile(user?.id);
    const { imageBase64 } = useProfileImage(user?.id);
    
    // Fetch profile image URL from Convex storage
    const convexImageUrl = useQuery(
        api.users.getProfileImageUrl,
        user?.id ? { userId: user.id } : 'skip'
    );
    
    // Fetch counts from Convex using custom hook
    const { ordersCount, bookingsCount, addressesCount, favoritesCount, messagesCount } = useAccountStats(user?.id);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Card - Full Width, Clickable, Flat Design */}
                    <TouchableOpacity
                        style={styles.profileCard}
                        onPress={() => router.push('/account/settings' as any)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.profileCardContent}>
                            <View style={styles.profileInfo}>
                                {renderAvatar(user, convexImageUrl, imageBase64, 80)}
                                <View style={styles.profileText}>
                                    <Text style={styles.userName}>
                                        {user?.name || 'الاسم غير متوفر'}
                                    </Text>
                                    <Text style={styles.userEmail}>
                                        {user?.email || 'البريد الإلكتروني غير متوفر'}
                                    </Text>
                                    {role !== 'customer' && (
                                        <View style={styles.roleBadgeContainer}>
                                            <RoleBadge role={role} size="small" />
                                        </View>
                                    )}
                                </View>
                            </View>
                            <Feather name="chevron-left" size={20} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>

                    {/* Stats Grid - 2x2 with Messages */}
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="package"
                            label="الطلبات"
                            count={ordersCount}
                            onPress={() => router.push('/orders' as any)}
                        />
                        <StatCard
                            icon="message-circle"
                            label="الرسائل"
                            count={messagesCount}
                            onPress={() => router.push('/chats' as any)}
                        />
                        <StatCard
                            icon="map-pin"
                            label="العناوين"
                            count={addressesCount}
                            onPress={() => router.push('/account/addresses' as any)}
                        />
                        <StatCard
                            icon="heart"
                            label="المفضلة"
                            count={favoritesCount}
                            onPress={() => router.push('/(tabs)/favorites')}
                        />
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background
    },
    safeArea: { 
        flex: 1 
    },
    scrollContent: { 
        padding: 20 
    },
    profileCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        // No shadows - flat minimal design
    },
    profileCardContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileInfo: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        flex: 1,
    },
    profileText: {
        marginRight: 16,
        flex: 1,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e2e8f0',
    },
    avatarInitials: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitialsText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
    },
    userName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.text,
        marginBottom: 4,
        textAlign: 'right',
    },
    userEmail: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'right',
        marginBottom: 8,
    },
    roleBadgeContainer: {
        marginTop: 4,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 12,
    },
    statCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        // No shadows - flat minimal design
        width: '47%',
        minHeight: 120,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statCount: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 24,
        color: COLORS.text,
        marginBottom: 4,
    },
    statLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: COLORS.textLight,
        textAlign: 'center',
    },
});
