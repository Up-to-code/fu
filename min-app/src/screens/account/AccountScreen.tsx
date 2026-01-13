// File: src/screens/account/AccountScreen.tsx
// Purpose: User Account/Settings Screen - Using Shared Components

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton, SettingItem } from '../../components/shared';
import { useAuth } from '../../hooks/useAuth';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function AccountScreen() {
    const router = useRouter();
    const { logout, user } = useAuth();
    const [notifications, setNotifications] = React.useState(true);

    const handleLogout = async () => {
        Alert.alert(
            'تسجيل الخروج',
            'هل أنت متأكد أنك تريد تسجيل الخروج؟',
            [
                { text: 'إلغاء', style: 'cancel' },
                {
                    text: 'خروج',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/');
                    }
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                    maxWidth: isTablet ? 600 : '100%',
                    alignSelf: 'center',
                    width: '100%'
                }}
            >
                {/* Profile Header */}
                <View className="bg-slate-50 items-center py-8 px-5">
                    <View className="relative mb-4">
                        <View className={`rounded-full bg-white p-1 ${isTablet ? 'w-32 h-32' : 'w-24 h-24'}`}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80' }}
                                className="w-full h-full rounded-full"
                            />
                        </View>
                        <TouchableOpacity className={`absolute bottom-0 right-0 bg-primary rounded-full items-center justify-center border-2 border-white ${isTablet ? 'w-10 h-10' : 'w-8 h-8'}`}>
                            <Feather name="camera" size={isTablet ? 18 : 14} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Text className={`font-cairo-bold text-slate-800 mb-1 ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                        {user?.name || 'أحمد منصور'}
                    </Text>
                    <Text className={`text-slate-500 font-cairo-medium ${isTablet ? 'text-base' : 'text-sm'}`}>
                        {user?.email || 'ahmed@example.com'}
                    </Text>
                </View>

                {/* Account Settings */}
                <View className="px-5 pt-6">
                    <Text className={`text-right font-cairo-bold text-slate-800 mb-4 ${isTablet ? 'text-xl' : 'text-lg'}`}>
                        إعدادات الحساب
                    </Text>

                    <SettingItem icon="user" label="تعديل الملف الشخصي" subLabel="الاسم، البريد الإلكتروني" />
                    <SettingItem icon="package" label="طلباتي" subLabel="تتبع طلباتك" />
                    <SettingItem icon="map-pin" label="العناوين المحفوظة" onPress={() => router.push('/account/addresses' as any)} />
                    <SettingItem
                        icon="heart"
                        label="المفضلة"
                        subLabel="المنتجات المحفوظة"
                        iconColor="#EF4444"
                        iconBgColor="#fef2f2"
                        onPress={() => router.push('/(tabs)/favorites')}
                    />
                </View>

                <View className="h-2 bg-slate-50 my-6" />

                {/* General Settings */}
                <View className="px-5">
                    <Text className={`text-right font-cairo-bold text-slate-800 mb-4 ${isTablet ? 'text-xl' : 'text-lg'}`}>
                        عام
                    </Text>

                    <SettingItem
                        icon="bell"
                        label="الإشعارات"
                        toggle
                        toggleValue={notifications}
                        onToggle={setNotifications}
                    />
                    <SettingItem icon="help-circle" label="المساعدة والدعم" onPress={() => router.push('/account/support' as any)} />
                </View>

                <View className="h-2 bg-slate-50 my-6" />

                {/* Logout */}
                <View className="px-5 pb-8">
                    <ActionButton
                        label="تسجيل الخروج"
                        icon="log-out"
                        variant="danger"
                        onPress={handleLogout}
                    />

                    <Text className={`text-center text-slate-400 mt-6 font-cairo-medium ${isTablet ? 'text-sm' : 'text-xs'}`}>
                        الإصدار 1.0.0
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
