// File: src/screens/shared/StyleSheets/SectionHeader.styles.ts
// Purpose: Styles for SectionHeader component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const getStyles = (isRTL: boolean = true) => StyleSheet.create({
    container: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
    },
    viewAllButton: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewAllText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.primary,
    },
});
