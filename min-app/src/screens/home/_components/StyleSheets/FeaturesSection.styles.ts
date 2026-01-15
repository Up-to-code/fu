// File: src/screens/home/_components/StyleSheets/FeaturesSection.styles.ts
// Purpose: Styles for FeaturesSection component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 32,
    },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 20,
    },
    featureCard: {
        alignItems: 'center',
        transform: [{ scaleX: -1 }],
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 8,
    },
    featureName: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: 12,
        textAlign: 'center',
        width: 80,
    },
});
