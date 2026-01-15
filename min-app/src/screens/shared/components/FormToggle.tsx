// File: src/screens/shared/components/FormToggle.tsx
// Purpose: Toggle switch with label and description

import React from 'react';
import { Switch, Text, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { FormToggleProps } from '../types/form';
import { styles } from '../StyleSheets/FormToggle.styles';

export const FormToggle: React.FC<FormToggleProps> = ({
    label,
    description,
    value,
    onValueChange,
}) => {
    return (
        <View style={styles.toggleRow}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#e2e8f0', true: COLORS.primary }}
                thumbColor="white"
                ios_backgroundColor="#e2e8f0"
            />
            <View style={styles.toggleContent}>
                <Text style={styles.toggleLabel}>{label}</Text>
                {description && <Text style={styles.toggleSubLabel}>{description}</Text>}
            </View>
        </View>
    );
};
