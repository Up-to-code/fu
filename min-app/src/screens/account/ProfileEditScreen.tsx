// File: src/screens/account/ProfileEditScreen.tsx
// Purpose: Screen for editing user profile information

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useUserProfile';
import { Header, FormInput, PrimaryButton, LoadingSpinner } from '../shared';
import { RoleBadge, CountryCodePicker } from '../shared';
import { useProfileImage } from './_hooks';
import { initDB, savePhoneNumbers, getPhoneNumbers } from '../../lib/database';

// Helper function to get user initials
const getUserInitials = (user: { name?: string | null; email?: string | null } | null): string => {
    if (!user) return 'U';
    
    if (user.name) {
        // Get first letter of name
        const firstLetter = user.name.trim().charAt(0).toUpperCase();
        return firstLetter || 'U';
    }
    
    if (user.email) {
        // Get first letter of email
        const firstLetter = user.email.trim().charAt(0).toUpperCase();
        return firstLetter || 'U';
    }
    
    return 'U';
};

// Helper function to render avatar component
const renderAvatar = (
    user: { image?: string | null; name?: string | null; email?: string | null } | null,
    localImageBase64: string | null,
    size: number = 120
) => {
    // Priority: local image > user image > initials
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

export default function ProfileEditScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const { role } = useUserProfile(user?.id);
    const updateUserProfile = useMutation(api.users.updateUserProfile);
    const { localImageBase64, pickImage, isUploading } = useProfileImage();

    // Form State
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [phone1, setPhone1] = useState('');
    const [phone1CountryCode, setPhone1CountryCode] = useState('+966');
    const [phone2, setPhone2] = useState('');
    const [phone2CountryCode, setPhone2CountryCode] = useState('+966');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Load phone numbers from SQLite on mount
    useEffect(() => {
        const loadPhones = async () => {
            if (!user?.id) {
                setIsLoadingData(false);
                return;
            }

            try {
                await initDB();
                const savedPhones = await getPhoneNumbers(user.id);
                
                if (savedPhones.phone1) {
                    setPhone1(savedPhones.phone1.number);
                    setPhone1CountryCode(savedPhones.phone1.countryCode);
                }
                if (savedPhones.phone2) {
                    setPhone2(savedPhones.phone2.number);
                    setPhone2CountryCode(savedPhones.phone2.countryCode);
                }
            } catch (error) {
                console.error('Error loading phone numbers:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        loadPhones();
    }, [user?.id]);

    // Validate phone number format (digits only, length varies by country)
    const validatePhone = (phoneNumber: string, countryCode: string): boolean => {
        if (!phoneNumber.trim()) return true; // Optional
        // Remove any non-digit characters
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        // Basic validation: at least 7 digits, max 15 digits
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    };

    const handleSave = async () => {
        if (!name) {
            Alert.alert('تنبيه', 'يرجى ملء الاسم على الأقل');
            return;
        }

        if (!user?.id) {
            Alert.alert('خطأ', 'لم يتم العثور على معلومات المستخدم');
            return;
        }

        // Validate phones if provided
        if (phone1.trim() && !validatePhone(phone1, phone1CountryCode)) {
            Alert.alert('تنبيه', 'يرجى إدخال رقم الجوال الأول صحيح');
            return;
        }
        if (phone2.trim() && !validatePhone(phone2, phone2CountryCode)) {
            Alert.alert('تنبيه', 'يرجى إدخال رقم الجوال الثاني صحيح');
            return;
        }

        setIsLoading(true);
        try {
            await initDB();

            // Save phones to SQLite
            const phone1Data = phone1.trim() ? { number: phone1.trim(), countryCode: phone1CountryCode } : undefined;
            const phone2Data = phone2.trim() ? { number: phone2.trim(), countryCode: phone2CountryCode } : undefined;
            await savePhoneNumbers(user.id, phone1Data, phone2Data);

            // Update profile in Convex (using phone1 as primary)
            // Note: Email is not updated as it cannot be changed
            await updateUserProfile({
                userId: user.id,
                name: name.trim() || undefined,
                phone: phone1.trim() ? `${phone1CountryCode}${phone1.trim()}` : undefined,
            });

            Alert.alert('تم الحفظ', 'تم تحديث بيانات الملف الشخصي بنجاح', [
                { text: 'حسناً', onPress: () => router.back() }
            ]);
        } catch (error: any) {
            console.error('Error updating profile:', error);
            Alert.alert('خطأ', error?.message || 'حدث خطأ أثناء تحديث البيانات');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header title="تعديل الملف الشخصي" showBack />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Avatar Section */}
                        <View style={styles.avatarSection}>
                            <View style={styles.avatarContainer}>
                                {renderAvatar(user, localImageBase64, 120)}
                                <TouchableOpacity 
                                    style={styles.changePhotoBtn}
                                    onPress={pickImage}
                                    disabled={isUploading}
                                >
                                    <Feather name="camera" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.changePhotoText}>تغيير الصورة الشخصية</Text>
                            {role !== 'customer' && (
                                <View style={styles.roleBadgeContainer}>
                                    <Text style={styles.roleLabel}>نوع المستخدم:</Text>
                                    <RoleBadge role={role} size="medium" />
                                </View>
                            )}
                        </View>

                        {/* Form Fields */}
                        <View style={styles.formSection}>
                            <FormInput
                                label="الاسم بالكامل"
                                value={name}
                                onChangeText={setName}
                                placeholder="الاسم"
                                icon="user"
                                required
                            />

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>البريد الإلكتروني</Text>
                                <View style={[styles.inputContainer, styles.inputDisabled]}>
                                    <View style={styles.inputIcon}>
                                        <Feather name="mail" size={20} color="#94a3b8" />
                                    </View>
                                    <TextInput
                                        style={[styles.input, styles.inputDisabledText]}
                                        value={email}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        placeholder="user@example.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        textAlign="right"
                                    />
                                </View>
                                <Text style={styles.helperText}>لا يمكن تغيير البريد الإلكتروني</Text>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>رقم الجوال الأول</Text>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputIcon}>
                                        <Feather name="phone" size={20} color="#94a3b8" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={phone1}
                                        onChangeText={setPhone1}
                                        placeholder="05XXXXXXXX"
                                        keyboardType="phone-pad"
                                        textAlign="right"
                                    />
                                    <CountryCodePicker
                                        selectedCode={phone1CountryCode}
                                        onSelect={setPhone1CountryCode}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    رقم الجوال الثاني <Text style={{ fontFamily: 'Cairo_400Regular', fontSize: 12, color: '#94a3b8' }}>(اختياري)</Text>
                                </Text>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputIcon}>
                                        <Feather name="phone" size={20} color="#94a3b8" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={phone2}
                                        onChangeText={setPhone2}
                                        placeholder="05XXXXXXXX"
                                        keyboardType="phone-pad"
                                        textAlign="right"
                                    />
                                    <CountryCodePicker
                                        selectedCode={phone2CountryCode}
                                        onSelect={setPhone2CountryCode}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer / Save Button */}
                    <View style={styles.footer}>
                        <PrimaryButton
                            label="حفظ التغييرات"
                            onPress={handleSave}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: { padding: 20 },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
    changePhotoBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#f8fafc',
    },
    changePhotoText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 12,
    },
    roleBadgeContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    roleLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
    formSection: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginRight: 4,
    },
    inputContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        height: 56,
    },
    inputIcon: {
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1, // Visual divider if needed, or remove for cleaner look
        borderRightColor: 'transparent',
    },
    input: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
        height: '100%',
        paddingLeft: 16,
    },
    inputDisabled: {
        backgroundColor: '#f1f5f9',
        opacity: 0.7,
    },
    inputDisabledText: {
        color: '#64748b',
    },
    helperText: {
        fontFamily: 'Cairo_400Regular',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'right',
        marginTop: 4,
        marginRight: 4,
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    deleteAccountButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        marginTop: 8,
    },
    deleteAccountText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#EF4444',
    },
});
