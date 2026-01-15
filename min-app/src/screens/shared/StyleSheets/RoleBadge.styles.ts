// File: src/screens/shared/StyleSheets/RoleBadge.styles.ts
// Purpose: Styles for RoleBadge component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    badgeSmall: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    badgeMedium: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    badgeText: {
        fontFamily: 'Cairo_600SemiBold',
        color: COLORS.primary,
    },
    badgeTextSmall: {
        fontSize: 11,
    },
    badgeTextMedium: {
        fontSize: 12,
    },
});
