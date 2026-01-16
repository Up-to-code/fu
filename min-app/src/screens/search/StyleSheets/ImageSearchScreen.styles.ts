// File: src/screens/search/StyleSheets/ImageSearchScreen.styles.ts
// Purpose: Styles for ImageSearchScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
    },
    iconContainer: {
        width: getSize(88, 92, 96, 112, 128),
        height: getSize(88, 92, 96, 112, 128),
        borderRadius: getSize(14, 15, 16, 18, 20),
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getSize(24, 28, 32, 40, 48),
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(20, 22, 24, 28, 32),
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        textAlign: 'center',
        marginBottom: getSize(32, 36, 40, 48, 56),
        fontSize: getSize(14, 15, 16, 18, 20),
        lineHeight: getSize(20, 22, 24, 28, 32),
    },
    buttonsContainer: {
        width: '100%',
        gap: getSize(12, 14, 16, 20, 24),
        maxWidth: getSize(300, 320, 340, 400, 480),
    },
    cameraButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: getSize(14, 15, 16, 18, 20),
        borderRadius: getSize(10, 11, 12, 14, 16),
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    cameraButtonText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: getSize(16, 17, 18, 20, 22),
    },
    });
};
