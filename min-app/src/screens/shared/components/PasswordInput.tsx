// File: src/screens/shared/components/PasswordInput.tsx
// Purpose: Password field with show/hide toggle

import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { PasswordInputProps } from '../types/form';
import { styles } from '../StyleSheets/PasswordInput.styles';

export const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    error,
    required,
    style,
    ...textInputProps
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                <TextInput
                    style={[styles.input, style]}
                    secureTextEntry={!showPassword}
                    placeholderTextColor={COLORS.textLight}
                    textAlign="right"
                    {...textInputProps}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                >
                    <Feather
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color={COLORS.textLight}
                    />
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
