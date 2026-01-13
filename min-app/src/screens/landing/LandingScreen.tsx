// File: src/screens/landing/LandingScreen.tsx
// Purpose: App Landing/Welcome Screen - Responsive

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const LandingScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000' }}
                className="flex-1 justify-end"
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'black']}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    locations={[0, 0.4, 0.9]}
                />

                <SafeAreaView edges={['bottom', 'left', 'right']}>
                    <View
                        style={{
                            maxWidth: isTablet ? 500 : '100%',
                            alignSelf: 'center',
                            width: '100%'
                        }}
                        className={isTablet ? 'px-12 pb-16' : 'px-8 pb-12'}
                    >
                        {/* Logo */}
                        <View className={`bg-primary rounded-2xl items-center justify-center mb-8 self-end ${isTablet ? 'w-20 h-20' : 'w-16 h-16'}`}>
                            <Feather name="box" size={isTablet ? 40 : 32} color="white" />
                        </View>

                        {/* Headline */}
                        <Text className={`text-white font-cairo-bold text-right mb-4 leading-tight ${isTablet ? 'text-5xl' : 'text-4xl'}`}>
                            صمم منزل {'\n'}
                            <Text style={{ color: '#1E3A5F' }}>أحلامك</Text> بسهولة
                        </Text>

                        <Text className={`text-gray-400 font-cairo-medium text-right mb-10 leading-7 ${isTablet ? 'text-lg' : 'text-base'}`}>
                            اكتشف أحدث صيحات الأثاث والديكور، واستخدم الذكاء الاصطناعي لتجربة القطع في غرفتك.
                        </Text>

                        {/* Buttons */}
                        <View className="gap-4">
                            <Link href="/auth/register" asChild>
                                <TouchableOpacity
                                    className={`w-full bg-primary rounded-2xl items-center ${isTablet ? 'py-5' : 'py-4'}`}
                                    activeOpacity={0.9}
                                >
                                    <Text className={`text-white font-cairo-bold ${isTablet ? 'text-xl' : 'text-lg'}`}>
                                        ابدأ الآن
                                    </Text>
                                </TouchableOpacity>
                            </Link>

                            <Link href="/auth/login" asChild>
                                <TouchableOpacity
                                    className={`w-full bg-white/10 border border-white/20 rounded-2xl items-center ${isTablet ? 'py-5' : 'py-4'}`}
                                    activeOpacity={0.8}
                                >
                                    <Text className={`text-white font-cairo-bold ${isTablet ? 'text-xl' : 'text-lg'}`}>
                                        لدي حساب بالفعل
                                    </Text>
                                </TouchableOpacity>
                            </Link>

                            <TouchableOpacity
                                onPress={() => router.replace('/(tabs)/home')}
                                className="w-full py-2 items-center"
                            >
                                <Text className={`text-gray-500 font-cairo-medium underline ${isTablet ? 'text-base' : 'text-sm'}`}>
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
