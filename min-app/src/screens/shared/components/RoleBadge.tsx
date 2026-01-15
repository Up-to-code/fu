// File: src/screens/shared/components/RoleBadge.tsx
// Purpose: User role badge component

import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { RoleBadgeProps } from '../types/ui';
import { styles } from '../StyleSheets/RoleBadge.styles';

// Role type to Arabic label mapping
const ROLE_LABELS: Record<string, string> = {
    customer: 'عميل',
    freelancer: 'مستقل',
    vendor: 'بائع',
    admin: 'مدير',
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ 
    role = 'customer', 
    size = 'small' 
}) => {
    const roleLabel = ROLE_LABELS[role || 'customer'] || ROLE_LABELS.customer;
    const isSmall = size === 'small';

    return (
        <View style={[
            styles.badge,
            isSmall ? styles.badgeSmall : styles.badgeMedium
        ]}>
            <Text style={[
                styles.badgeText,
                isSmall ? styles.badgeTextSmall : styles.badgeTextMedium
            ]}>
                {roleLabel}
            </Text>
        </View>
    );
};
