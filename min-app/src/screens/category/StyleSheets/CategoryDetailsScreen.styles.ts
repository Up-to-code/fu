// File: src/screens/category/StyleSheets/CategoryDetailsScreen.styles.ts
// Purpose: Styles for CategoryDetailsScreen component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        scrollContent: {
            paddingBottom: getSize(16, 18, 20, 24, 32),
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingTop: getSize(12, 14, 16, 20, 24),
            flexGrow: 1,
        },
        favoriteButton: {
            padding: getSize(8, 9, 10, 12, 14),
        },
    });
};
