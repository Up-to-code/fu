// File: src/components/shared/PriceTable.tsx
// Purpose: Simple clean price table component

import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isLarge = width >= 1024;

interface PriceTableProps {
    items: Array<{
        label: string;
        value: number;
        isDiscount?: boolean;
        isFree?: boolean;
    }>;
    total: number;
    currency?: string;
}

export const PriceTable: React.FC<PriceTableProps> = ({
    items,
    total,
    currency = 'ر.س',
}) => {
    const fontSize = isLarge ? 'text-lg' : isTablet ? 'text-base' : 'text-sm';
    const totalSize = isLarge ? 'text-2xl' : isTablet ? 'text-xl' : 'text-lg';

    return (
        <View className="bg-slate-50 rounded-2xl p-4">
            {items.map((item, idx) => (
                <View
                    key={idx}
                    className={`flex-row-reverse justify-between py-2 ${idx < items.length - 1 ? 'border-b border-slate-100' : ''
                        }`}
                >
                    <Text className={`font-cairo-medium text-slate-600 ${fontSize}`}>
                        {item.label}
                    </Text>
                    <Text
                        className={`font-cairo-bold ${fontSize} ${item.isDiscount ? 'text-red-500' : item.isFree ? 'text-green-600' : 'text-slate-700'
                            }`}
                    >
                        {item.isFree ? 'مجاني' : item.isDiscount ? `-${item.value}` : item.value} {!item.isFree && currency}
                    </Text>
                </View>
            ))}

            {/* Total */}
            <View className="flex-row-reverse justify-between pt-4 mt-2 border-t-2 border-slate-200">
                <Text className={`font-cairo-bold text-slate-800 ${totalSize}`}>
                    الإجمالي
                </Text>
                <Text className={`font-cairo-bold ${totalSize}`} style={{ color: COLORS.primary }}>
                    {total} {currency}
                </Text>
            </View>
        </View>
    );
};

export default PriceTable;
