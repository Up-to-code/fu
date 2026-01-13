// File: src/screens/auth/LoginScreen.tsx
// Purpose: Simple Arabic Login screen

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants/theme';

const LoginScreen = () => {
    const { login, isLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            alert(error.message || "فشل تسجيل الدخول");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white" style={{ padding: 20 }}>
            <Text className="text-2xl font-cairo-bold text-slate-800 text-right mb-8">
                تسجيل الدخول
            </Text>

            <View className="mb-4">
                <Text className="text-slate-700 font-cairo-bold text-right mb-2">البريد الإلكتروني</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="border border-slate-200 rounded-xl px-4 py-3 text-right font-cairo-medium text-slate-800"
                    placeholderTextColor={COLORS.textLight}
                />
            </View>

            <View className="mb-4">
                <Text className="text-slate-700 font-cairo-bold text-right mb-2">كلمة المرور</Text>
                <View className="flex-row-reverse items-center border border-slate-200 rounded-xl px-4 py-3">
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry={!showPassword}
                        className="flex-1 text-right font-cairo-medium text-slate-800"
                        placeholderTextColor={COLORS.textLight}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity className="mb-6">
                <Text className="font-cairo-medium text-right text-sm" style={{ color: COLORS.primary }}>
                    نسيت كلمة المرور؟
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className="py-4 rounded-xl mb-6"
                style={{ backgroundColor: COLORS.primary }}
            >
                <Text className="text-white font-cairo-bold text-center">
                    {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                </Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-slate-200" />
                <Text className="px-4 text-slate-400 font-cairo-medium text-sm">أو</Text>
                <View className="flex-1 h-px bg-slate-200" />
            </View>

            <View className="flex-row gap-3 mb-6">
                <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl"
                    style={{ backgroundColor: '#4285F4' }}
                >
                    <Feather name="chrome" size={20} color="#FFFFFF" />
                    <Text className="font-cairo-bold text-white">Google</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl"
                    style={{ backgroundColor: '#000000' }}
                >
                    <Feather name="smartphone" size={20} color="#FFFFFF" />
                    <Text className="font-cairo-bold text-white">Apple</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center gap-2">
                <Text className="text-slate-500 font-cairo-medium text-sm">ليس لديك حساب؟</Text>
                <Link href="/auth/register" asChild>
                    <TouchableOpacity>
                        <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>سجل الآن</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
