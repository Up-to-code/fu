// File: src/screens/ai/CameraCaptureScreen.tsx
// Purpose: Modern and accessible camera UI

import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { saveAISession } from '../../utils/storage';
import { getStyles } from './StyleSheets/CameraCaptureScreen.styles';

const CameraCaptureScreen = () => {
    const { mode, searchQuery } = useLocalSearchParams<{ mode?: 'search' | 'design'; searchQuery?: string }>();
    const isSearchMode = mode === 'search';
    const [showFlash, setShowFlash] = useState(false);
    const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(getSize);

    if (!permission) {
        return <View style={styles.loadingContainer} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer} edges={['top', 'bottom']}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

                <View style={styles.permissionIcon}>
                    <Feather name="camera-off" size={iconSize.lg} color="white" />
                </View>

                <Text style={styles.permissionTitle}>
                    نحتاج إذن الكاميرا
                </Text>

                <Text style={styles.permissionDescription}>
                    {isSearchMode 
                        ? 'للبحث عن منتجات مشابهة بالصورة'
                        : 'للتصوير وتصميم غرفتك بالذكاء الاصطناعي'
                    }
                </Text>

                <TouchableOpacity
                    onPress={requestPermission}
                    style={styles.permissionButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.permissionButtonText}>السماح</Text>
                    <Feather name="unlock" size={iconSize.sm} color="white" />
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
                    if (isSearchMode) {
                        // Navigate to search results with image search
                        router.push({
                            pathname: '/search/results',
                            params: { 
                                imageSearch: photoUri,
                                q: searchQuery || 'image search'
                            }
                        });
                    } else {
                        // Navigate to AI design results
                        saveAISession({ originalPhotoUri: photoUri });
                        router.push({
                            pathname: '/ai-design/results',
                            params: { 
                                photo: photoUri,
                                mode: mode || 'design'
                            }
                        });
                    }
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
                
                if (isSearchMode) {
                    // Navigate to search results with image search
                    router.push({
                        pathname: '/search/results',
                        params: { 
                            imageSearch: photoUri,
                            q: searchQuery || 'image search'
                        }
                    });
                } else {
                    // Navigate to AI design results
                    saveAISession({ originalPhotoUri: photoUri });
                    router.push({
                        pathname: '/ai-design/results',
                        params: { 
                            photo: photoUri,
                            mode: mode || 'design'
                        }
                    });
                }
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

            {/* Top Bar - Close Button Only */}
            <SafeAreaView style={styles.topBar} edges={['top']}>
                <View style={styles.topBarContent}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.closeButton}
                        activeOpacity={0.8}
                    >
                        <Feather name="x" size={iconSize.md} color="white" />
                    </TouchableOpacity>
                </View>
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
                        {isSearchMode 
                            ? 'التقط صورة للبحث عن منتجات مشابهة'
                            : 'حاول تصوير الغرفة كاملة'
                        }
                    </Text>

                    {/* Controls */}
                    <View style={styles.controlsRow}>
                        {/* Gallery */}
                        <TouchableOpacity
                            onPress={handleGalleryPick}
                            style={styles.galleryButton}
                            activeOpacity={0.8}
                        >
                            <Feather name="image" size={iconSize.md} color="white" />
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
                                size={iconSize.md}
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
