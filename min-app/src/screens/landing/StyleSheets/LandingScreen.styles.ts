// File: src/screens/landing/StyleSheets/LandingScreen.styles.ts
// Purpose: Styles for LandingScreen component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => {
    return StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        maxWidth: getSize(400, 450, 500, 600, 700),
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: getSize(28, 30, 32, 48, 64),
        paddingBottom: getSize(40, 44, 48, 64, 80),
    },
    logo: {
        backgroundColor: '#1E3A5F',
        borderRadius: getSize(14, 15, 16, 18, 20),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getSize(28, 30, 32, 40, 48),
        alignSelf: 'flex-end',
        width: getSize(56, 60, 64, 80, 96),
        height: getSize(56, 60, 64, 80, 96),
    },
    headline: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        textAlign: 'right',
        marginBottom: getSize(12, 14, 16, 20, 24),
        lineHeight: getSize(42, 45, 48, 60, 72),
        fontSize: getSize(32, 34, 36, 48, 56),
    },
    headlineAccent: {
        color: '#1E3A5F',
    },
    description: {
        color: '#9CA3AF',
        fontFamily: 'Cairo_500Medium',
        textAlign: 'right',
        marginBottom: getSize(32, 36, 40, 48, 56),
        lineHeight: getSize(20, 22, 24, 28, 32),
        fontSize: getSize(14, 15, 16, 18, 20),
    },
    buttonsContainer: {
        gap: getSize(12, 14, 16, 20, 24),
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#1E3A5F',
        borderRadius: getSize(14, 15, 16, 18, 20),
        alignItems: 'center',
        paddingVertical: getSize(14, 15, 16, 20, 24),
    },
    primaryButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(16, 17, 18, 20, 22),
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: getSize(14, 15, 16, 18, 20),
        alignItems: 'center',
        paddingVertical: getSize(14, 15, 16, 20, 24),
    },
    secondaryButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(16, 17, 18, 20, 22),
    },
    guestButton: {
        width: '100%',
        paddingVertical: getSize(6, 7, 8, 10, 12),
        alignItems: 'center',
    },
    guestButtonText: {
        color: '#6B7280',
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'underline',
        fontSize: getSize(13, 13.5, 14, 16, 18),
    },
    });
};
