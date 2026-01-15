// File: src/screens/shared/components/FormTextArea.tsx
// Purpose: Multi-line text input with label

import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { FormTextAreaProps } from '../types/form';
import { styles } from '../StyleSheets/FormTextArea.styles';

export const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    required,
    error,
    rows = 3,
    style,
    ...textInputProps
}) => {
    const minHeight = rows * 20 + 28; // Approximate height based on rows

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>
                {label}
                {required && <Text style={styles.required}> *</Text>}
            </Text>
            <TextInput
                style={[
                    styles.textArea,
                    { minHeight },
                    error && styles.inputError,
                    style
                ]}
                placeholderTextColor="#94a3b8"
                textAlign="right"
                textAlignVertical="top"
                multiline
                {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
