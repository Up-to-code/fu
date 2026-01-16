// File: src/screens/shared/StyleSheets/SearchBar.styles.ts
// Purpose: Styles for SearchBar component

import { StyleSheet } from 'react-native';

export const getStyles = (isRTL: boolean = true) => StyleSheet.create({
    container: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        gap: 12,
    },
    inputContainer: {
        flex: 1,
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    input: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 15,
        color: '#1e293b',
        textAlign: (isRTL ? 'right' : 'left') as const,
    },
    clearButton: {
        padding: 4,
    },
    cameraButton: {
        padding: 4,
    },
});
