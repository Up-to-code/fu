// File: src/screens/shared/components/SocialButton.tsx
// Purpose: Social login button (Google, Apple)

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SocialButtonProps } from '../types/button';
import { styles } from '../StyleSheets/SocialButton.styles';

export const SocialButton: React.FC<SocialButtonProps> = ({
    provider,
    label,
    style,
    ...touchableProps
}) => {
    const getProviderConfig = () => {
        switch (provider) {
            case 'google':
                return {
                    backgroundColor: '#4285F4',
                    icon: 'chrome' as const,
                    iconColor: '#FFFFFF',
                };
            case 'apple':
                return {
                    backgroundColor: '#000000',
                    icon: 'smartphone' as const,
                    iconColor: '#FFFFFF',
                };
        }
    };

    const config = getProviderConfig();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: config.backgroundColor },
                style
            ]}
            activeOpacity={0.8}
            {...touchableProps}
        >
            <Feather name={config.icon} size={20} color={config.iconColor} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};
