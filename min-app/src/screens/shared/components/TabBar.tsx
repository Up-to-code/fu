// File: src/screens/shared/components/TabBar.tsx
// Purpose: Reusable tab navigation component

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Tab, TabBarProps } from '../types/navigation';
import { styles } from '../StyleSheets/TabBar.styles';

export const TabBar: React.FC<TabBarProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabChange(tab.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab.label}
                            {tab.count !== undefined && ` (${tab.count})`}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
