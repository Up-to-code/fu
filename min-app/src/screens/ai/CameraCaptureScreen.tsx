// File: src/screens/ai/CameraCaptureScreen.tsx
// Purpose: Modern and accessible camera UI

import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { COLORS } from '../../constants/theme';
import { saveAISession } from '../../utils/storage';
import { styles } from './StyleSheets/CameraCaptureScreen.styles';

const CameraCaptureScreen = () => {
    const [showFlash, setShowFlash] = useState(false);
    const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return <View style={styles.loadingContainer} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer} edges={['top', 'bottom']}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

                <View style={styles.permissionIcon}>
                    <Feather name="camera-off" size={32} color="white" />
                </View>

                <Text style={styles.permissionTitle}>
                    نحتاج إذن الكاميرا
                </Text>

                <Text style={styles.permissionDescription}>
                    للتصوير وتصميم غرفتك بالذكاء الاصطناعي
                </Text>

                <TouchableOpacity
                    onPress={requestPermission}
                    style={styles.permissionButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.permissionButtonText}>السماح</Text>
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
                    saveAISession({ originalPhotoUri: photoUri });
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
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Camera */}
            <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing="back"
                flash={flashMode}
                enableTorch={flashMode === 'on'}
            />

            {/* Header */}
            <SafeAreaView style={styles.topBar} edges={['top']}>
                <Header
                    title="تصميم بالذكاء الاصطناعي"
                    showBack
                    onBack={handleBack}
                />
            </SafeAreaView>

            {/* Guide Frame */}
            <View style={styles.guideFrame} pointerEvents="none">
                <View style={styles.guideFrameBorder} />
            </View>

            {/* Bottom Controls */}
            <SafeAreaView style={styles.bottomContainer} edges={['bottom']}>
                <View style={styles.bottomContent}>
                    {/* Hint */}
                    <Text style={styles.hintText}>
                        حاول تصوير الغرفة كاملة
                    </Text>

                    {/* Controls */}
                    <View style={styles.controlsRow}>
                        {/* Gallery */}
                        <TouchableOpacity
                            onPress={handleGalleryPick}
                            style={styles.galleryButton}
                            activeOpacity={0.8}
                        >
                            <Feather name="image" size={24} color="white" />
                        </TouchableOpacity>

                        {/* Capture */}
                        <TouchableOpacity
                            onPress={handleCapture}
                            style={styles.captureButton}
                            activeOpacity={0.8}
                        >
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>

                        {/* Flash Toggle */}
                        <TouchableOpacity
                            onPress={toggleFlash}
                            style={[
                                styles.flashButton,
                                flashMode === 'on' ? styles.flashButtonOn : styles.flashButtonOff
                            ]}
                            activeOpacity={0.8}
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
            {showFlash && <View style={styles.flashOverlay} />}
        </View>
    );
};

export default CameraCaptureScreen;
