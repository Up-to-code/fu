// File: src/screens/shared/components/FormInput.tsx
// Purpose: Standardized text input with label, error state, and validation

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { FormInputProps } from '../types/form';
import { styles } from '../StyleSheets/FormInput.styles';

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    required,
    icon,
    disabled = false,
    style,
    ...textInputProps
}) => {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>
                {label}
                {required && <Text style={styles.required}> *</Text>}
            </Text>
            <View style={[styles.inputContainer, disabled && styles.inputDisabled, error && styles.inputError]}>
                {icon && (
                    <View style={styles.inputIcon}>
                        <Feather name={icon} size={20} color="#94a3b8" />
                    </View>
                )}
                <TextInput
                    style={[styles.input, disabled && styles.inputDisabledText, style]}
                    editable={!disabled}
                    placeholderTextColor="#94a3b8"
                    textAlign="right"
                    {...textInputProps}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
