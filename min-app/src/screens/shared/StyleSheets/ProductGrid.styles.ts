// File: src/screens/shared/StyleSheets/ProductGrid.styles.ts
// Purpose: Styles for ProductGrid component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => {
    return StyleSheet.create({
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        cardWrapper: {
            marginBottom: getSize(14, 15, 16, 20, 24),
        },
        horizontalScrollContainer: {
            paddingHorizontal: getSize(14, 15, 16, 24, 32),
        },
        horizontalCardWrapper: {
            marginLeft: getSize(10, 11, 12, 16, 20),
        },
    });
};
