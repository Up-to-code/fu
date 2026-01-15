// File: src/screens/home/_components/StyleSheets/QuickActionsSection.styles.ts
// Purpose: Styles for QuickActionsSection component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        marginBottom: 24,
    },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 20,
    },
    actionCard: {
        alignItems: 'center',
        transform: [{ scaleX: -1 }],
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontFamily: 'Cairo_500Medium',
        color: '#374151',
        fontSize: 12,
        textAlign: 'center',
        width: 70,
    },
});
