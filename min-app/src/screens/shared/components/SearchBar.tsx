// File: src/screens/shared/components/SearchBar.tsx
// Purpose: Reusable search input with icon and clear button

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { SearchBarProps } from '../types/ui';
import { styles } from '../StyleSheets/SearchBar.styles';

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onClear,
    onCameraPress,
    showCamera = false,
    style,
    ...textInputProps
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Feather name="search" size={20} color="#94a3b8" />
                <TextInput
                    style={[styles.input, style]}
                    value={value}
                    placeholderTextColor="#94a3b8"
                    textAlign="right"
                    {...textInputProps}
                />
                {value && value.length > 0 && onClear && (
                    <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                        <Feather name="x" size={18} color="#94a3b8" />
                    </TouchableOpacity>
                )}
            </View>
            {showCamera && onCameraPress && (
                <TouchableOpacity onPress={onCameraPress} style={styles.cameraButton}>
                    <Feather name="camera" size={22} color={COLORS.primary} />
                </TouchableOpacity>
            )}
        </View>
    );
};
