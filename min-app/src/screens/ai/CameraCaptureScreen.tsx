// File: src/screens/ai/CameraCaptureScreen.tsx
// Purpose: Camera UI with Photo Saving

import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { saveAISession } from '../../utils/storage';

const CameraCaptureScreen = () => {
    const [showFlash, setShowFlash] = useState(false);
    const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return <View className="flex-1 bg-black" />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className="flex-1 bg-slate-900 items-center justify-center px-8">
                <StatusBar barStyle="light-content" />

                <View className="w-20 h-20 rounded-full bg-slate-800 items-center justify-center mb-8">
                    <Feather name="camera-off" size={32} color="white" />
                </View>

                <Text className="text-white text-xl font-cairo-bold text-center mb-4">
                    نحتاج إذن الكاميرا
                </Text>

                <Text className="text-slate-400 text-center mb-10 font-cairo-medium text-sm leading-6">
                    للتصوير وتصميم غرفتك بالذكاء الاصطناعي
                </Text>

                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-primary px-10 py-4 rounded-full flex-row items-center gap-3"
                >
                    <Text className="text-white font-cairo-bold text-base">السماح</Text>
                    <Feather name="unlock" size={18} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/home');
        }
    };

    const handleCapture = async () => {
        if (cameraRef.current) {
            try {
                setShowFlash(true);
                setTimeout(() => setShowFlash(false), 150);

                const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
                const photoUri = photo?.uri;

                if (photoUri) {
                    console.log('📸 Photo captured:', photoUri);
                    // Save to storage
                    saveAISession({ originalPhotoUri: photoUri });
                    // Navigate with photo param for immediate access
                    router.push({
                        pathname: '/ai-design/results',
                        params: { photo: photoUri }
                    });
                }
            } catch (error) {
                console.error('Camera error:', error);
                Alert.alert('خطأ', 'فشل التقاط الصورة');
            }
        }
    };

    const handleGalleryPick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const photoUri = result.assets[0].uri;
                console.log('🖼️ Gallery photo:', photoUri);
                saveAISession({ originalPhotoUri: photoUri });
                router.push({
                    pathname: '/ai-design/results',
                    params: { photo: photoUri }
                });
            }
        } catch (error) {
            Alert.alert('خطأ', 'فشل اختيار الصورة');
        }
    };

    const toggleFlash = () => {
        setFlashMode(prev => prev === 'off' ? 'on' : 'off');
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Camera */}
            <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing="back"
                flash={flashMode}
                enableTorch={flashMode === 'on'}
            />

            {/* Top Bar */}
            <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
                <View className="px-5 py-4 flex-row-reverse justify-between items-center">
                    <TouchableOpacity
                        onPress={handleBack}
                        className="w-12 h-12 rounded-full bg-black/50 items-center justify-center"
                    >
                        <Feather name="x" size={22} color="white" />
                    </TouchableOpacity>

                    <View className="bg-black/50 px-5 py-2.5 rounded-full">
                        <Text className="text-white text-sm font-cairo-bold">صوّر الغرفة</Text>
                    </View>

                    <View className="w-12" />
                </View>
            </SafeAreaView>

            {/* Guide Frame */}
            <View className="absolute inset-0 items-center justify-center pointer-events-none">
                <View className="w-[85%] h-[55%] border-2 border-white/30 rounded-3xl" />
            </View>

            {/* Bottom */}
            <SafeAreaView className="absolute bottom-0 left-0 right-0" edges={['bottom']}>
                <View className="pb-6 pt-8">
                    {/* Hint */}
                    <Text className="text-white/70 text-xs font-cairo-medium text-center mb-8">
                        حاول تصوير الغرفة كاملة
                    </Text>

                    {/* Controls */}
                    <View className="flex-row justify-center items-center px-8">
                        {/* Gallery */}
                        <TouchableOpacity
                            onPress={handleGalleryPick}
                            className="w-14 h-14 rounded-full bg-white/20 items-center justify-center"
                        >
                            <Feather name="image" size={24} color="white" />
                        </TouchableOpacity>

                        {/* Capture */}
                        <TouchableOpacity
                            onPress={handleCapture}
                            className="w-20 h-20 rounded-full border-4 border-white items-center justify-center mx-8"
                            activeOpacity={0.8}
                        >
                            <View className="w-16 h-16 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                        </TouchableOpacity>

                        {/* Flash Toggle */}
                        <TouchableOpacity
                            onPress={toggleFlash}
                            className={`w-14 h-14 rounded-full items-center justify-center ${flashMode === 'on' ? 'bg-yellow-500' : 'bg-white/20'
                                }`}
                        >
                            <Feather
                                name={flashMode === 'on' ? 'zap' : 'zap-off'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Flash Overlay */}
            {showFlash && <View className="absolute inset-0 bg-white" style={{ zIndex: 9999 }} />}
        </View>
    );
};

export default CameraCaptureScreen;
