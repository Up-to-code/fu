// File: src/screens/shared/StyleSheets/EmptyCartState.styles.ts
// Purpose: Styles for EmptyCartState component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: 'white',
    },
});
