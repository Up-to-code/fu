// File: src/screens/shared/components/SocialButton.tsx
// Purpose: Reusable Social Login Button (Google/Apple)

import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SocialButtonProps } from '../types/button';
import { styles } from '../StyleSheets/SocialButton.styles';

export const SocialButton: React.FC<SocialButtonProps> = ({
    provider,
    label,
    onPress,
    style,
    ...touchableProps
}) => {
    const isGoogle = provider === 'google';

    // Default labels if not provided
    const buttonLabel = label || (isGoogle ? 'المتابعة باستخدام Google' : 'المتابعة باستخدام Apple');

    // Styles configuration
    const buttonStyle = [
        styles.button,
        isGoogle ? styles.googleButton : styles.appleButton,
        style
    ];

    const textStyle = [
        styles.text,
        isGoogle ? styles.googleText : styles.appleText
    ];

    // Icon configuration
    const iconName = isGoogle ? 'google' : 'apple';
    const iconColor = isGoogle ? '#DB4437' : '#FFFFFF'; // Google standard red or just keep it colored, usually multicolor logotype but single color red is acceptable fallback. 
    // Wait, google logo is usually multi-colored. For simpler icon we can use colored text or just standard dark grey icon for google if monochrome.
    // Let's stick to a safe color. For Google, often the "G" is multi-colored or just grey/black.
    // AntDesign 'google' is outline. simpler might be better. 
    // Let's use generic color for now or specific brand color. 

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            activeOpacity={0.8}
            {...touchableProps}
        >
            <AntDesign name={iconName} size={24} color={isGoogle ? '#DB4437' : '#000000'} />
            <Text style={textStyle}>{buttonLabel}</Text>
        </TouchableOpacity>
    );
};
