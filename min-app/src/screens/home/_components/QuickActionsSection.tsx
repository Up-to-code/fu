// File: src/screens/home/_components/QuickActionsSection.tsx
// Purpose: Horizontally scrollable quick actions with top padding

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const QUICK_ACTIONS = [
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
        <View className="pt-4 mb-6">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.id} href={action.link as any} asChild>
                        <TouchableOpacity
                            className="items-center"
                            style={{ transform: [{ scaleX: -1 }] }}
                            activeOpacity={0.8}
                        >
                            <View
                                className="w-16 h-16 rounded-full items-center justify-center mb-2"
                                style={{ backgroundColor: `${action.color}15` }}
                            >
                                <Feather name={action.icon as any} size={28} color={action.color} />
                            </View>
                            <Text className="font-cairo-medium text-gray-700 text-xs text-center" style={{ width: 70 }}>
                                {action.label}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </View>
    );
};
