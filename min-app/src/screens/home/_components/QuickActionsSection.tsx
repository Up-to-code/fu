// File: src/screens/home/_components/QuickActionsSection.tsx
// Purpose: Horizontally scrollable quick actions with top padding

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { QuickAction } from './types/home';
import { styles } from './StyleSheets/QuickActionsSection.styles';

const QUICK_ACTIONS: QuickAction[] = [
    {
        id: 'shop',
        label: 'تسوق',
        icon: 'shopping-bag',
        color: '#3B82F6',
        link: '/(tabs)/categories',
    },
    {
        id: 'categories',
        label: 'التصنيفات',
        icon: 'grid',
        color: '#10B981',
        link: '/(tabs)/categories',
    },
    {
        id: 'design',
        label: 'المصمم الذكي',
        icon: 'layout',
        color: '#8B5CF6',
        link: '/ai-design',
    },
    {
        id: 'services',
        label: 'الخدمات',
        icon: 'users',
        color: '#F59E0B',
        link: '/services',
    },
];

export const QuickActionsSection = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.id} href={action.link as any} asChild>
                        <TouchableOpacity
                            style={styles.actionCard}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: `${action.color}15` }
                                ]}
                            >
                                <Feather name={action.icon as any} size={28} color={action.color} />
                            </View>
                            <Text style={styles.actionLabel}>
                                {action.label}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </View>
    );
};
