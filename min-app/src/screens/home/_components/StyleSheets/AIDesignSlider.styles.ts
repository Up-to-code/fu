// File: src/screens/home/_components/StyleSheets/AIDesignSlider.styles.ts
// Purpose: Styles for AIDesignSlider component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction, width: number) => {
    const SLIDE_WIDTH = width - 40;
    return StyleSheet.create({
    container: {
        marginHorizontal: getSize(16, 18, 20, 24, 32),
        marginVertical: getSize(12, 14, 16, 20, 24),
    },
    sliderContainer: {
        height: getSize(180, 190, 200, 240, 280),
        borderRadius: getSize(14, 15, 16, 18, 20),
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
        padding: getSize(20, 22, 24, 32, 40),
        zIndex: 10,
        alignItems: 'flex-end',
    },
    slideTitle: {
        color: 'white',
        fontSize: getSize(18, 19, 20, 22, 24),
        fontFamily: 'Cairo_700Bold',
        marginBottom: getSize(6, 7, 8, 10, 12),
        textAlign: 'right',
    },
    slideDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        fontFamily: 'Cairo_500Medium',
        marginBottom: getSize(12, 14, 16, 20, 24),
        textAlign: 'right',
    },
    ctaButton: {
        backgroundColor: 'white',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(8, 9, 10, 12, 14),
        borderRadius: getSize(18, 19, 20, 22, 24),
        alignSelf: 'flex-start',
    },
    ctaText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 15, 16),
    },
    dotsContainer: {
        position: 'absolute',
        bottom: getSize(12, 14, 16, 20, 24),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        height: getSize(5, 5.5, 6, 7, 8),
        borderRadius: getSize(2.5, 2.75, 3, 3.5, 4),
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    dotActive: {
        width: getSize(20, 22, 24, 28, 32),
        backgroundColor: 'white',
    },
    dotInactive: {
        width: getSize(5, 5.5, 6, 7, 8),
    },
    });
};
