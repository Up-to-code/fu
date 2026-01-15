// File: src/screens/ai/_components/StyleSheets/SavePreferencesView.styles.ts
// Purpose: Styles for SavePreferencesView component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    headerButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 16,
    },
    headerLeft: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    contentCard: {
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
    },
    contentText: {
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
        color: '#475569',
        textAlign: 'right',
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    primaryButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    secondaryButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    secondaryButtonText: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
});
