// File: src/screens/home/_components/StyleSheets/AIDesignBanner.styles.ts
// Purpose: Styles for AIDesignBanner component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (width: number, getSize: GetSizeFunction) => {
    const BANNER_WIDTH = width - getSize(32, 36, 40, 48, 64);
    
    return StyleSheet.create({
        container: {
            marginHorizontal: getSize(16, 18, 20, 24, 32),
            marginVertical: getSize(12, 14, 16, 20, 24),
        },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
        banner: {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: getSize(14, 15, 16, 18, 20),
            backgroundColor: '#f1f5f9',
            width: BANNER_WIDTH,
            height: getSize(140, 150, 160, 180, 200),
        },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }],
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transform: [{ scaleX: -1 }],
    },
        content: {
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            transform: [{ scaleX: -1 }],
        },
        contentInner: {
            alignItems: 'flex-end',
        },
        title: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(20, 21, 22, 24, 28),
            lineHeight: getSize(26, 27, 28, 32, 36),
            color: '#FFFFFF',
            marginBottom: getSize(6, 7, 8, 10, 12),
            textAlign: 'right',
        },
        subtitle: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(14, 15, 16, 18, 20),
            lineHeight: getSize(20, 21, 22, 24, 28),
            color: '#FFFFFF',
            textAlign: 'right',
        },
    });
};
