// File: src/screens/shared/components/TypeSelector.tsx
// Purpose: Reusable type selection component

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { TypeOption, TypeSelectorProps } from '../types/navigation';
import { styles } from '../StyleSheets/TypeSelector.styles';

export const TypeSelector: React.FC<TypeSelectorProps> = ({
    options,
    selectedValue,
    onSelect,
    columns = 3,
}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.typesList, { gap: 12 }]}>
                {options.map((option) => {
                    const isSelected = selectedValue === option.id;
                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.typeItem,
                                { flex: columns > 0 ? 1 / columns : 1 },
                                isSelected && styles.typeItemSelected
                            ]}
                            onPress={() => onSelect(option.id)}
                            activeOpacity={0.7}
                        >
                            {option.icon && (
                                <Feather
                                    name={option.icon}
                                    size={20}
                                    color={isSelected ? COLORS.primary : '#94a3b8'}
                                />
                            )}
                            <Text style={[
                                styles.typeLabel,
                                isSelected && styles.typeLabelSelected
                            ]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
