// File: src/screens/account/ProfileEditScreen.tsx
// Purpose: Edit user profile

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../components/shared';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function ProfileEditScreen() {
    const router = useRouter();
    const [name, setName] = useState('أحمد منصور');
    const [email, setEmail] = useState('ahmed@example.com');
    const [phone, setPhone] = useState('0512345678');

    const handleSave = () => {
        console.log('Save profile', { name, email, phone });
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-right" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">تعديل الملف الشخصي</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Avatar */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' }}
                            className="w-24 h-24 rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-white">
                            <Feather name="camera" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form */}
                <View className="gap-4">
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">الاسم</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">البريد الإلكتروني</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">رقم الجوال</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <View className="mt-8">
                    <ActionButton label="حفظ التغييرات" icon="check" onPress={handleSave} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
