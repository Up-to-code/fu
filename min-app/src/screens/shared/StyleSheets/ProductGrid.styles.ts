// File: src/screens/shared/StyleSheets/ProductGrid.styles.ts
// Purpose: Styles for ProductGrid component

import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardWrapper: {
        marginBottom: isTablet ? 20 : 16,
    },
    horizontalScrollContainer: {
        paddingHorizontal: isTablet ? 24 : 16,
    },
    horizontalCardWrapper: {
        marginLeft: 12,
    },
});
