// File: src/screens/shared/components/LoadingSpinner.tsx
// Purpose: Consistent loading indicator

import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { LoadingSpinnerProps } from '../types/ui';
import { styles } from '../StyleSheets/LoadingSpinner.styles';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message,
    size = 'large',
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={COLORS.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};
