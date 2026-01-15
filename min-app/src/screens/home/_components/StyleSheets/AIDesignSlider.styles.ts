// File: src/screens/home/_components/StyleSheets/AIDesignSlider.styles.ts
// Purpose: Styles for AIDesignSlider component

import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const SLIDE_WIDTH = SCREEN_WIDTH - 40;

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 16,
    },
    sliderContainer: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        position: 'relative',
    },
    slide: {
        width: SLIDE_WIDTH,
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
    },
    slideImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
    },
    slideOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    slideContent: {
        padding: 24,
        zIndex: 10,
        alignItems: 'flex-end',
    },
    slideTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Cairo_700Bold',
        marginBottom: 8,
        textAlign: 'right',
    },
    slideDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
        marginBottom: 16,
        textAlign: 'right',
    },
    ctaButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    ctaText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    dotActive: {
        width: 24,
        backgroundColor: 'white',
    },
    dotInactive: {
        width: 6,
    },
});
