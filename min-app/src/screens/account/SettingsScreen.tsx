// File: src/screens/account/SettingsScreen.tsx
// Purpose: Settings screen with logout, delete account, and other settings

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useUserProfile';
import { Header } from '../shared';
import { RoleBadge, SimpleModal } from '../shared';
import { useSettings } from './_hooks';

const SettingItem = ({
    icon,
    label,
    subLabel,
    onPress,
    color = COLORS.text,
    isDestructive = false,
    hasToggle = false,
    toggleValue = false,
    onToggle = () => { }
}: {
    icon: string;
    label: string;
    subLabel?: string;
    onPress?: () => void;
    color?: string;
    isDestructive?: boolean;
    hasToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
}) => (
    <TouchableOpacity
        style={[styles.settingItem, isDestructive && styles.destructiveItem]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={hasToggle}
    >
        <View style={styles.settingLeft}>
            {hasToggle ? (
                <Switch
                    trackColor={{ false: '#e2e8f0', true: COLORS.primary }}
                    thumbColor={'white'}
                    ios_backgroundColor="#e2e8f0"
                    onValueChange={onToggle}
                    value={toggleValue}
                />
            ) : (
                <Feather
                    name="chevron-left"
                    size={20}
                    color={isDestructive ? '#EF4444' : '#94a3b8'}
                />
            )}
        </View>

        <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, isDestructive && styles.destructiveText]}>
                {label}
            </Text>
            {subLabel && <Text style={styles.settingSubLabel}>{subLabel}</Text>}
        </View>

        <View style={[
            styles.iconContainer,
            isDestructive && { backgroundColor: '#FEF2F2' }
        ]}>
            <Feather name={icon as any} size={20} color={isDestructive ? '#EF4444' : color} />
        </View>
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const router = useRouter();
    const { logout, user } = useAuth();
    const { role } = useUserProfile(user?.id);
    const softDeleteAccount = useMutation(api.users.softDeleteAccount);
    const { settings, updateSetting } = useSettings();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleNotificationsToggle = async (value: boolean) => {
        await updateSetting('notifications', value);
    };

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const handleConfirmLogout = async () => {
        setLogoutModalVisible(false);
        await logout();
        router.replace('/auth/login');
    };

    const handleDeleteAccount = () => {
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!user?.id) {
            setDeleteModalVisible(false);
            return;
        }

        try {
            // Soft delete account (marks for deletion, will be hard deleted after 15 days)
            await softDeleteAccount({ userId: user.id });
            setDeleteModalVisible(false);
            
            // Logout user after soft delete
            await logout();
            router.replace('/auth/login');
        } catch (error: any) {
            console.error('Error deleting account:', error);
            setDeleteModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="الإعدادات" showBack />

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* User Info Section */}
                    {user && (
                        <View style={styles.userInfoSection}>
                            <View style={styles.userInfoCard}>
                                <View style={styles.userInfoContent}>
                                    <View style={styles.userInfoText}>
                                        <Text style={styles.userInfoName}>
                                            {user.name || 'الاسم غير متوفر'}
                                        </Text>
                                    <Text style={styles.userInfoEmail}>
                                        {user.email || 'البريد الإلكتروني غير متوفر'}
                                    </Text>
                                </View>
                                {role !== 'customer' && (
                                    <RoleBadge role={role} size="small" />
                                )}
                            </View>
                        </View>
                    </View>
                )}

                    {/* General Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الإعدادات العامة</Text>
                        <View style={styles.sectionContent}>
                            <SettingItem
                                icon="bell"
                                label="الإشعارات"
                                hasToggle
                                toggleValue={settings.notifications}
                                onToggle={handleNotificationsToggle}
                            />
                            <View style={styles.divider} />
                            <SettingItem
                                icon="globe"
                                label="اللغة"
                                subLabel="العربية"
                                onPress={() => router.push('/account/language' as any)}
                            />
                        </View>
                    </View>

                    {/* Account Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الحساب</Text>
                        <View style={styles.sectionContent}>
                            <SettingItem
                                icon="user"
                                label="تعديل الملف الشخصي"
                                subLabel="الاسم، البريد الإلكتروني"
                                onPress={() => router.push('/account/profile' as any)}
                            />
                            <View style={styles.divider} />
                            <SettingItem
                                icon="map-pin"
                                label="العناوين المحفوظة"
                                onPress={() => router.push('/account/addresses' as any)}
                            />
                        </View>
                    </View>

                    {/* Support Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الدعم</Text>
                        <View style={styles.sectionContent}>
                            <SettingItem
                                icon="help-circle"
                                label="المساعدة والدعم"
                                onPress={() => router.push('/account/help' as any)}
                            />
                            <View style={styles.divider} />
                            <SettingItem
                                icon="info"
                                label="عن التطبيق"
                                onPress={() => router.push('/account/about' as any)}
                            />
                        </View>
                    </View>

                    {/* Danger Zone */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الحساب</Text>
                        <View style={styles.sectionContent}>
                            <SettingItem
                                icon="log-out"
                                label="تسجيل الخروج"
                                onPress={handleLogout}
                                isDestructive
                            />
                            <View style={styles.divider} />
                            <SettingItem
                                icon="trash-2"
                                label="حذف الحساب"
                                subLabel="حذف نهائي لجميع بياناتك"
                                onPress={handleDeleteAccount}
                                isDestructive
                            />
                        </View>
                    </View>

                    <Text style={styles.versionText}>الإصدار 1.0.0</Text>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>

            {/* Logout Modal */}
            <SimpleModal
                visible={logoutModalVisible}
                message="هل أنت متأكد أنك تريد تسجيل الخروج؟"
                confirmText="خروج"
                cancelText="إلغاء"
                onConfirm={handleConfirmLogout}
                onCancel={() => setLogoutModalVisible(false)}
            />

            {/* Delete Account Modal */}
            <SimpleModal
                visible={deleteModalVisible}
                message="هل أنت متأكد؟ سيتم حذف حسابك نهائياً بعد 15 يوماً. يمكنك إلغاء الحذف خلال هذه الفترة."
                confirmText="حذف الحساب"
                cancelText="إلغاء"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f8fafc' 
    },
    safeArea: { 
        flex: 1 
    },
    scrollContent: { 
        padding: 20 
    },
    section: { 
        marginBottom: 20 
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
        marginRight: 4,
    },
    sectionContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    destructiveItem: {
        backgroundColor: '#FEF2F2',
    },
    settingLeft: {
        minWidth: 24,
        alignItems: 'flex-start',
    },
    settingContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 16,
    },
    settingLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    settingSubLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'right',
        marginTop: 2,
    },
    destructiveText: { 
        color: '#EF4444' 
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginLeft: 16,
    },
    versionText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 20,
    },
    userInfoSection: {
        marginBottom: 20,
    },
    userInfoCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    userInfoContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfoText: {
        flex: 1,
    },
    userInfoName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 4,
        textAlign: 'right',
    },
    userInfoEmail: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'right',
    },
});
