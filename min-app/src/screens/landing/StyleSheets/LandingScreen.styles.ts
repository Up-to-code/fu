// File: src/screens/landing/StyleSheets/LandingScreen.styles.ts
// Purpose: Styles for LandingScreen component

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        maxWidth: isTablet ? 500 : '100%',
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: isTablet ? 48 : 32,
        paddingBottom: isTablet ? 64 : 48,
    },
    logo: {
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        alignSelf: 'flex-end',
        width: isTablet ? 80 : 64,
        height: isTablet ? 80 : 64,
    },
    headline: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        textAlign: 'right',
        marginBottom: 16,
        lineHeight: isTablet ? 60 : 48,
        fontSize: isTablet ? 48 : 36,
    },
    headlineAccent: {
        color: '#1E3A5F',
    },
    description: {
        color: '#9CA3AF',
        fontFamily: 'Cairo_500Medium',
        textAlign: 'right',
        marginBottom: 40,
        lineHeight: isTablet ? 28 : 24,
        fontSize: isTablet ? 18 : 16,
    },
    buttonsContainer: {
        gap: 16,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: isTablet ? 20 : 16,
    },
    primaryButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 20 : 18,
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: isTablet ? 20 : 16,
    },
    secondaryButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 20 : 18,
    },
    guestButton: {
        width: '100%',
        paddingVertical: 8,
        alignItems: 'center',
    },
    guestButtonText: {
        color: '#6B7280',
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'underline',
        fontSize: isTablet ? 16 : 14,
    },
});
