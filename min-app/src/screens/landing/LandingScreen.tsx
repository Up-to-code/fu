// File: src/screens/landing/LandingScreen.tsx
// Purpose: App Landing/Welcome Screen - Responsive

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStyles } from './StyleSheets/LandingScreen.styles';
import { useResponsive } from '../../hooks/useResponsive';

const LandingScreen = () => {
    const router = useRouter();
    const { getSize } = useResponsive();
    const styles = getStyles(getSize);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000' }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'black']}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    locations={[0, 0.4, 0.9]}
                />

                <SafeAreaView edges={['bottom', 'left', 'right']}>
                    <View style={styles.contentContainer}>
                        {/* Logo */}
                        <View style={styles.logo}>
                            <Feather name="box" size={40} color="white" />
                        </View>

                        {/* Headline */}
                        <Text style={styles.headline}>
                            صمم منزل {'\n'}
                            <Text style={styles.headlineAccent}>أحلامك</Text> بسهولة
                        </Text>

                        <Text style={styles.description}>
                            اكتشف أحدث صيحات الأثاث والديكور، واستخدم الذكاء الاصطناعي لتجربة القطع في غرفتك.
                        </Text>

                        {/* Buttons */}
                        <View style={styles.buttonsContainer}>
                            <Link href="/auth/register" asChild>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    activeOpacity={0.9}
                                >
                                    <Text style={styles.primaryButtonText}>
                                        ابدأ الآن
                                    </Text>
                                </TouchableOpacity>
                            </Link>

                            <Link href="/auth/login" asChild>
                                <TouchableOpacity
                                    style={styles.secondaryButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.secondaryButtonText}>
                                        لدي حساب بالفعل
                                    </Text>
                                </TouchableOpacity>
                            </Link>

                            <TouchableOpacity
                                onPress={() => router.replace('/(tabs)/home')}
                                style={styles.guestButton}
                            >
                                <Text style={styles.guestButtonText}>
                                    تصفح كزائر
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

export default LandingScreen;
