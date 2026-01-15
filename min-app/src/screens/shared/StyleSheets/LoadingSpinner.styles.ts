// File: src/screens/shared/StyleSheets/LoadingSpinner.styles.ts
// Purpose: Styles for LoadingSpinner component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    message: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
    },
});
