// File: src/screens/shared/StyleSheets/FilterChip.styles.ts
// Purpose: Styles for FilterChip component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    primaryChip: {
        backgroundColor: '#f0f9ff',
        borderWidth: 1,
        borderColor: '#bae6fd',
    },
    chipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
    },
    primaryChipText: {
        color: COLORS.primary,
    },
});
