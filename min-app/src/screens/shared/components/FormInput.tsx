// File: src/screens/shared/components/FormInput.tsx
// Purpose: Standardized text input with label, error state, and validation

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useRTL } from '../../../hooks/useRTL';
import { FormInputProps } from '../types/form';
import { getStyles } from '../StyleSheets/FormInput.styles';

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    required,
    icon,
    disabled = false,
    style,
    ...textInputProps
}) => {
    const { isRTL, textAlign } = useRTL();
    const styles = getStyles(isRTL);

    return (
        <View style={styles.inputGroup}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
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
                    textAlign={textAlign}
                    {...textInputProps}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
