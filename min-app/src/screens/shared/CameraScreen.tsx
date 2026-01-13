// Shared Camera Screen - mode=search OR mode=design
import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CameraMode = 'search' | 'design';

export default function CameraScreen() {
    const router = useRouter();
    const { mode = 'search' } = useLocalSearchParams<{ mode?: CameraMode }>();
    const [permission, requestPermission] = useCameraPermissions();
    const [capturing, setCapturing] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    const isSearch = mode === 'search';
    const title = isSearch ? 'البحث بالصورة' : 'صمم غرفتك';
    const hint = isSearch ? 'التقط صورة لمنتج للبحث عن مشابه' : 'التقط صورة لغرفتك';

    const handleCapture = async () => {
        if (!cameraRef.current || capturing) return;
        setCapturing(true);
        try {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
            navigateWithImage(photo?.uri || '');
        } finally {
            setCapturing(false);
        }
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            navigateWithImage(result.assets[0].uri);
        }
    };

    const navigateWithImage = (uri: string) => {
        if (isSearch) {
            router.replace(`/search/results?q=صورة&image=${encodeURIComponent(uri)}` as any);
        } else {
            router.replace(`/ai-design/results?image=${encodeURIComponent(uri)}` as any);
        }
    };

    // Permission handling
    if (!permission) return <View className="flex-1 bg-black" />;
    if (!permission.granted) {
        return (
            <SafeAreaView className="flex-1 bg-black items-center justify-center px-6">
                <Feather name="camera-off" size={48} color="white" />
                <Text className="text-white font-cairo-bold text-lg text-center mt-4 mb-2">الكاميرا مطلوبة</Text>
                <Text className="text-white/70 font-cairo-medium text-center mb-6">{hint}</Text>
                <TouchableOpacity onPress={requestPermission} className="bg-primary px-8 py-3 rounded-full">
                    <Text className="text-white font-cairo-bold">السماح بالكاميرا</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
                {/* Header */}
                <SafeAreaView edges={['top']}>
                    <View className="flex-row-reverse items-center justify-between px-4 py-2">
                        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/40 rounded-full items-center justify-center">
                            <Feather name="x" size={22} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white font-cairo-bold text-base">{title}</Text>
                        <View className="w-10" />
                    </View>
                </SafeAreaView>

                {/* Hint */}
                <View className="absolute top-24 left-0 right-0 items-center">
                    <View className="bg-black/50 px-4 py-2 rounded-full">
                        <Text className="text-white font-cairo-medium text-sm">{hint}</Text>
                    </View>
                </View>

                {/* Bottom Controls */}
                <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0">
                    <View className="flex-row items-center justify-center gap-8 pb-6">
                        {/* Gallery */}
                        <TouchableOpacity onPress={handlePickImage} className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                            <Feather name="image" size={22} color="white" />
                        </TouchableOpacity>

                        {/* Capture */}
                        <TouchableOpacity onPress={handleCapture} disabled={capturing} className="w-20 h-20 rounded-full border-4 border-white items-center justify-center">
                            {capturing ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <View className="w-16 h-16 rounded-full bg-white" />
                            )}
                        </TouchableOpacity>

                        {/* Flip (placeholder) */}
                        <View className="w-12 h-12" />
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}
