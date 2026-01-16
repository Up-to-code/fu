// File: app/ai-design/index.tsx
// Purpose: Modern and accessible AI Room Design Configuration

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/constants/theme';
import { saveAISession } from '../../src/utils/storage';
import { SavePreferencesView } from '../../src/screens/ai/_components';

const ROOM_TYPES = [
    { id: 'living', name: 'مجلس', icon: 'home' },
    { id: 'bedroom', name: 'غرفة نوم', icon: 'moon' },
    { id: 'dining', name: 'غرفة طعام', icon: 'coffee' },
    { id: 'office', name: 'مكتب', icon: 'monitor' },
    { id: 'kitchen', name: 'مطبخ', icon: 'box' },
    { id: 'outdoor', name: 'خارجية', icon: 'sun' },
];

const ROOM_STYLES = [
    { id: 'modern', name: 'مودرن', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400' },
    { id: 'classic', name: 'كلاسيك', image: 'https://images.unsplash.com/photo-1505693416388-50efe58338d4?q=80&w=400' },
    { id: 'minimalist', name: 'بسيط', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=400' },
    { id: 'boho', name: 'بوهيمي', image: 'https://images.unsplash.com/photo-1522771753062-5887739e5c5e?q=80&w=400' },
];

export default function AIConfigurationScreen() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/home');
        }
    };

    const handleContinue = () => {
        if (selectedType && selectedStyle) {
            saveAISession({ roomType: selectedType, roomStyle: selectedStyle });
            router.push({
                pathname: '/ai-design/camera',
                params: { mode: 'design' }
            });
        }
    };

    const handleSelectPreferences = (roomType: string, roomStyle: string) => {
        setSelectedType(roomType);
        setSelectedStyle(roomStyle);
    };

    const isReady = selectedType && selectedStyle;

    return (
        <SafeAreaView className="flex-1 bg-gray-50/50" edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-5 py-4 flex-row-reverse justify-between items-center bg-white">
                <TouchableOpacity
                    onPress={handleBack}
                    className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center"
                    activeOpacity={0.8}
                >
                    <Feather name="x" size={22} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="text-xl font-cairo-bold text-slate-800">صمّم غرفتك</Text>
                <View className="w-12" />
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Save Preferences View */}
                <SavePreferencesView
                    onSelectPreferences={handleSelectPreferences}
                    currentRoomType={selectedType}
                    currentRoomStyle={selectedStyle}
                />

                {/* Step 1: Room Type */}
                <View className="mb-8">
                    <Text className="text-lg font-cairo-bold text-slate-800 text-right mb-4 px-5">
                        ١. اختر نوع الغرفة
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
                        style={{ transform: [{ scaleX: -1 }] }}
                    >
                        {ROOM_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                onPress={() => setSelectedType(type.id)}
                                className={`items-center justify-center py-4 px-5 rounded-2xl min-w-[100px] ${
                                    selectedType === type.id
                                        ? 'bg-primary'
                                        : 'bg-white'
                                }`}
                                style={{ transform: [{ scaleX: -1 }] }}
                                activeOpacity={0.8}
                            >
                                <Feather
                                    name={type.icon as any}
                                    size={24}
                                    color={selectedType === type.id ? 'white' : COLORS.text}
                                />
                                <Text
                                    className={`text-sm font-cairo-bold mt-3 ${
                                        selectedType === type.id ? 'text-white' : 'text-slate-700'
                                    }`}
                                >
                                    {type.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Step 2: Room Style */}
                <View className="px-5 mb-6">
                    <Text className="text-lg font-cairo-bold text-slate-800 text-right mb-4">
                        ٢. اختر الستايل
                    </Text>
                    <View className="flex-row-reverse flex-wrap justify-between">
                        {ROOM_STYLES.map((style) => (
                            <TouchableOpacity
                                key={style.id}
                                onPress={() => setSelectedStyle(style.id)}
                                className="w-[48%] mb-4 rounded-2xl overflow-hidden bg-white"
                                activeOpacity={0.9}
                            >
                                <View className="h-36 bg-slate-100 relative">
                                    <Image
                                        source={{ uri: style.image }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                    {selectedStyle === style.id && (
                                        <View className="absolute inset-0 bg-primary/20" />
                                    )}
                                    {selectedStyle === style.id && (
                                        <View className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full items-center justify-center">
                                            <Feather name="check" size={18} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View className="py-4 px-3">
                                    <Text
                                        className={`text-center font-cairo-bold text-base ${
                                            selectedStyle === style.id ? 'text-primary' : 'text-slate-800'
                                        }`}
                                    >
                                        {style.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <SafeAreaView className="bg-white border-t border-slate-100" edges={['bottom']}>
                <View className="px-5 py-4">
                    <TouchableOpacity
                        onPress={handleContinue}
                        disabled={!isReady}
                        className={`w-full py-4 rounded-2xl flex-row-reverse justify-center items-center gap-3 ${
                            isReady ? 'bg-primary' : 'bg-slate-200'
                        }`}
                        activeOpacity={0.8}
                    >
                        <Text
                            className={`text-lg font-cairo-bold ${
                                isReady ? 'text-white' : 'text-slate-400'
                            }`}
                        >
                            التقط صورة الغرفة
                        </Text>
                        <Feather
                            name="camera"
                            size={22}
                            color={isReady ? 'white' : '#94a3b8'}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}
