// File: src/screens/home/_components/FeaturesSection.tsx
// Purpose: Simplified features/quick actions section

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { Feature } from './types/home';
import { styles } from './StyleSheets/FeaturesSection.styles';

const FEATURES: Feature[] = [
    { id: '1', name: 'صمّم مساحتك', icon: 'layout', link: '/ai-design' },
    { id: '2', name: 'جرّب AR', icon: 'box', link: '/ar-view' },
    { id: '3', name: 'استشارة خبير', icon: 'user-check', link: '/consultation' },
    { id: '4', name: 'طلبات خاصة', icon: 'tool', link: '/custom-orders' }
];

export const FeaturesSection = () => (
    <View style={styles.container}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
        >
            {FEATURES.map((feature) => (
                <Link key={feature.id} href={feature.link as any} asChild>
                    <TouchableOpacity style={styles.featureCard}>
                        <View style={styles.iconContainer}>
                            <Feather name={feature.icon as any} size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.featureName}>
                            {feature.name}
                        </Text>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    </View>
);
