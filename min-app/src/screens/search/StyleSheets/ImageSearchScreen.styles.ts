// File: src/screens/search/StyleSheets/ImageSearchScreen.styles.ts
// Purpose: Styles for ImageSearchScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 96,
        height: 96,
        borderRadius: 16,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 24,
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 16,
        lineHeight: 24,
    },
    buttonsContainer: {
        width: '100%',
        gap: 16,
        maxWidth: 340,
    },
    cameraButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    cameraButtonText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: 18,
    },
});
