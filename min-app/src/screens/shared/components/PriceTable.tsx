// File: src/screens/shared/components/PriceTable.tsx
// Purpose: Simple clean price table component

import React from 'react';
import { Text, View } from 'react-native';
import { PriceTableProps } from '../types/ui';
import { styles } from '../StyleSheets/PriceTable.styles';

const PriceTableComponent: React.FC<PriceTableProps> = ({
    items,
    total,
    currency = 'ر.س',
}) => {
    return (
        <View style={styles.container}>
            {items.map((item, idx) => (
                <View
                    key={idx}
                    style={[
                        styles.row,
                        idx < items.length - 1 && styles.rowWithBorder,
                    ]}
                >
                    <Text style={styles.label}>
                        {item.label}
                    </Text>
                    <Text
                        style={[
                            styles.value,
                            item.isDiscount
                                ? styles.valueDiscount
                                : item.isFree
                                    ? styles.valueFree
                                    : styles.valueNormal,
                        ]}
                    >
                        {item.isFree
                            ? 'مجاني'
                            : item.isDiscount
                                ? `-${item.value}`
                                : item.value}{' '}
                        {!item.isFree && currency}
                    </Text>
                </View>
            ))}

            {/* Total */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>الإجمالي</Text>
                <Text style={styles.totalValue}>
                    {total} {currency}
                </Text>
            </View>
        </View>
    );
};

// Memoize PriceTable to prevent unnecessary re-renders
export const PriceTable = React.memo(PriceTableComponent);

export default PriceTable;
