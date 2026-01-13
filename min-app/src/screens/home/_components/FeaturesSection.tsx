// File: src/components/home/FeaturesSection.tsx
// Purpose: Simplified features/quick actions section

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const FEATURES = [
    { id: '1', name: 'صمّم مساحتك', icon: 'layout', link: '/ai-design' },
    { id: '2', name: 'جرّب AR', icon: 'box', link: '/ar-view' },
    { id: '3', name: 'استشارة خبير', icon: 'user-check', link: '/consultation' },
    { id: '4', name: 'طلبات خاصة', icon: 'tool', link: '/custom-orders' }
];

export const FeaturesSection = () => (
    <View className="mt-6 mb-8">
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
            style={{ transform: [{ scaleX: -1 }] }}
        >
            {FEATURES.map((feature) => (
                <Link key={feature.id} href={feature.link as any} asChild>
                    <TouchableOpacity className="items-center" style={{ transform: [{ scaleX: -1 }] }}>
                        <View className="w-16 h-16 rounded-2xl items-center justify-center bg-slate-50 border border-slate-100 mb-2">
                            <Feather name={feature.icon as any} size={24} color={COLORS.primary} />
                        </View>
                        <Text className="text-slate-800 font-cairo-bold text-xs text-center w-20">
                            {feature.name}
                        </Text>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    </View>
);
