// File: src/screens/auth/RegisterScreen.tsx
// Purpose: Simple Arabic Registration screen

import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FormInput, PasswordInput, PrimaryButton, SocialButton } from '../shared';
import { useRegister } from './_hooks';
import { COLORS } from '../../constants/theme';

const RegisterScreen = () => {
    const { name, email, password, setName, setEmail, setPassword, handleRegister, isLoading, errors } = useRegister();

    return (
        <SafeAreaView style={styles.container}>
            <Header title="إنشاء حساب جديد" showBack={false} />

            <View style={styles.content}>
                <FormInput
                    label="الاسم الكامل"
                    value={name}
                    onChangeText={setName}
                    placeholder="أحمد منصور"
                    required
                    error={errors.name}
                />

                <FormInput
                    label="البريد الإلكتروني"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    required
                    error={errors.email}
                />

                <PasswordInput
                    label="كلمة المرور"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    required
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
                        onPress={() => {}}
                    />
                    <SocialButton
                        provider="apple"
                        label="Apple"
                        onPress={() => {}}
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
        padding: 20,
        gap: 16,
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
        fontSize: 13,
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
