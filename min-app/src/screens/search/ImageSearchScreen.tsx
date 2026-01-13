// Image Search Screen - Enhanced UI
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

export default function ImageSearchScreen() {
    const router = useRouter();

    const handleOpenCamera = async () => {
        router.push('/ai-design/camera?mode=search' as any);
    };

    const handlePickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    quality: 0.8,
                });
                if (!result.canceled && result.assets[0]) {
                    router.push(`/search/results?q=&image=${result.assets[0].uri}` as any);
                }
            }
        } catch (error) {
            console.error('Image picker error:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row-reverse items-center justify-between px-5 py-4 border-b border-slate-100">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Feather name="arrow-right" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                        <Text className="font-cairo-bold text-lg text-slate-800">البحث بالصورة</Text>
                        <View className="w-6" />
                    </View>

                    {/* Content */}
                    <View className="flex-1 items-center justify-center px-5">
                        <View className="w-24 h-24 rounded-2xl bg-primary/10 items-center justify-center mb-8">
                            <Feather name="camera" size={40} color={COLORS.primary} />
                        </View>
                        
                        <Text className="font-cairo-bold text-2xl text-slate-900 text-center mb-3">
                            ابحث بصورة
                        </Text>
                        <Text className="font-cairo-medium text-slate-500 text-center mb-10 text-base">
                            التقط صورة أو اختر صورة من المعرض{'\n'}للعثور على منتجات مشابهة
                        </Text>

                        <View className="w-full gap-4" style={{ maxWidth: 340 }}>
                            <TouchableOpacity
                                onPress={handleOpenCamera}
                                className="bg-primary py-4 rounded-xl flex-row-reverse items-center justify-center gap-3 shadow-sm"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <Feather name="camera" size={22} color="white" />
                                <Text className="font-cairo-bold text-white text-lg">فتح الكاميرا</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={handlePickImage}
                                className="bg-white border-2 border-slate-200 py-4 rounded-xl flex-row-reverse items-center justify-center gap-3"
                            >
                                <Feather name="image" size={22} color={COLORS.primary} />
                                <Text className="font-cairo-bold text-slate-800 text-lg">اختيار من المعرض</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
