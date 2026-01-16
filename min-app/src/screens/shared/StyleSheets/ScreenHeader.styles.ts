// File: src/screens/shared/StyleSheets/ScreenHeader.styles.ts
// Purpose: Styles for ScreenHeader component

import { StyleSheet } from 'react-native';

export const getStyles = (isRTL: boolean = true) => StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    subtitleContainer: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: (isRTL ? 'right' : 'left') as const,
    },
});
