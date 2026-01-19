// File: src/screens/auth/RegisterScreen.tsx
// Purpose: Simple Arabic Registration screen

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput, PasswordInput, PrimaryButton, SocialButton, AlertBanner } from '../shared';
import { useRegister } from './_hooks';
import { COLORS } from '../../constants/theme';

const RegisterScreen = () => {
    const { name, email, password, setName, setEmail, setPassword, handleRegister, isLoading, errors, serverError, clearServerError } = useRegister();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Feather name="user-plus" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.title}>إنشاء حساب جديد</Text>
                <Text style={styles.subtitle}>ابدأ رحلتك معنا اليوم</Text>
            </View>

            <View style={styles.content}>
                <AlertBanner
                    type="error"
                    message={serverError || ''}
                    visible={!!serverError}
                    onDismiss={clearServerError}
                />

                <FormInput
                    placeholder="الاسم الكامل"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    icon="user"
                    error={errors.name}
                />

                <FormInput
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail"
                    error={errors.email}
                />

                <PasswordInput
                    placeholder="كلمة المرور"
                    value={password}
                    onChangeText={setPassword}
                    error={errors.password}
                />

                <PrimaryButton
                    label="إنشاء حساب"
                    onPress={handleRegister}
                    loading={isLoading}
                    disabled={isLoading}
                />



                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>أو</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                    <SocialButton
                        provider="google"
                        label="Google"
                        onPress={() => { }}
                    />
                    <SocialButton
                        provider="apple"
                        label="Apple"
                        onPress={() => { }}
                    />
                </View>

                <View style={styles.loginLink}>
                    <Text style={styles.loginText}>لديك حساب بالفعل؟</Text>
                    <Link href="/auth/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLinkText}>سجل الدخول</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 24,
        gap: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(30, 58, 95, 0.1)', // primary with opacity
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 24,
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        gap: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#94a3b8',
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    loginLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    loginText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
    },
    loginLinkText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 13,
        color: COLORS.primary,
    },
});

export default RegisterScreen;
