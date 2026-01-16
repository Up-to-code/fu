// Image Search Screen - Enhanced UI
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, PrimaryButton } from '../shared';
import { useImageSearch } from './_hooks';
import { COLORS } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { getStyles } from './StyleSheets/ImageSearchScreen.styles';

export default function ImageSearchScreen() {
    const router = useRouter();
    const { pickImage, searchResults, isLoading, imageUri } = useImageSearch();
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(getSize);

    const handleOpenCamera = async () => {
        router.push('/ai-design/camera?mode=search' as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <Header title="البحث بالصورة" showBack />

                    {/* Content */}
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Feather name="camera" size={iconSize.xl} color={COLORS.primary} />
                        </View>
                        
                        <Text style={styles.title}>
                            ابحث بصورة
                        </Text>
                        <Text style={styles.description}>
                            التقط صورة أو اختر صورة من المعرض{'\n'}للعثور على منتجات مشابهة
                        </Text>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={handleOpenCamera}
                                style={styles.cameraButton}
                            >
                                <Feather name="camera" size={iconSize.md} color="white" />
                                <Text style={styles.cameraButtonText}>فتح الكاميرا</Text>
                            </TouchableOpacity>
                            
                            <PrimaryButton
                                label="اختيار من المعرض"
                                onPress={pickImage}
                                variant="outline"
                                icon="image"
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
