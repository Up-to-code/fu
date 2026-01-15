// File: src/screens/auth/LoginScreen.tsx
// Purpose: Simple Arabic Login screen

import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FormInput, PasswordInput, PrimaryButton, SocialButton } from '../shared';
import { useLogin } from './_hooks';
import { COLORS } from '../../constants/theme';

const LoginScreen = () => {
    const { email, password, setEmail, setPassword, handleLogin, isLoading, errors } = useLogin();

    return (
        <SafeAreaView style={styles.container}>
            <Header title="تسجيل الدخول" showBack={false} />

            <View style={styles.content}>
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

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                        نسيت كلمة المرور؟
                    </Text>
                </TouchableOpacity>

                <PrimaryButton
                    label="تسجيل الدخول"
                    onPress={handleLogin}
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

                <View style={styles.registerLink}>
                    <Text style={styles.registerText}>ليس لديك حساب؟</Text>
                    <Link href="/auth/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.registerLinkText}>سجل الآن</Text>
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -8,
    },
    forgotPasswordText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: COLORS.primary,
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
    registerLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    registerText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
    },
    registerLinkText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 13,
        color: COLORS.primary,
    },
});

export default LoginScreen;
