// File: src/screens/shared/components/FilterBottomSheet.tsx
// Purpose: Reusable bottom sheet filter component

import { Feather } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Animated, Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import { FilterBottomSheetProps, FilterBottomSheetRef, FilterOption } from '../types/ui';
import { styles } from '../StyleSheets/FilterBottomSheet.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FilterChipProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isActive, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.chip,
            isActive && { backgroundColor: COLORS.primary },
        ]}
        activeOpacity={0.8}
    >
        <Text
            style={[
                styles.chipText,
                isActive && { color: 'white' },
            ]}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

interface FilterSectionProps {
    title: string;
    options: FilterOption[];
    selectedId: string;
    onSelect: (id: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    options,
    selectedId,
    onSelect,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.chipsContainer}>
            {options.map((option) => (
                <FilterChip
                    key={option.id}
                    label={option.label}
                    isActive={selectedId === option.id}
                    onPress={() => onSelect(option.id)}
                />
            ))}
        </View>
    </View>
);

export const FilterBottomSheet = forwardRef<FilterBottomSheetRef, FilterBottomSheetProps>(
    (
        {
            categories,
            priceRanges,
            locations,
            activeCategory,
            activePriceRange,
            activeLocation,
            onCategoryChange,
            onPriceRangeChange,
            onLocationChange,
            onClearAll,
            resultsCount,
        },
        ref
    ) => {
        const [visible, setVisible] = useState(false);
        const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

        const open = () => {
            setVisible(true);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 20,
                stiffness: 90,
            }).start();
        };

        const close = () => {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        };

        useImperativeHandle(ref, () => ({
            expand: open,
            close: close,
        }));

        if (!visible) return null;

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={close}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backdrop} onPress={close} activeOpacity={1} />

                    <Animated.View
                        style={[
                            styles.sheetContainer,
                            { transform: [{ translateY: slideAnim }] }
                        ]}
                    >
                        <View style={styles.handle} />

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>الفلاتر</Text>
                            <TouchableOpacity onPress={close} style={styles.closeButton}>
                                <Feather name="x" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <FilterSection
                                title="التصنيف"
                                options={categories}
                                selectedId={activeCategory}
                                onSelect={onCategoryChange}
                            />

                            <FilterSection
                                title="نطاق السعر"
                                options={priceRanges}
                                selectedId={activePriceRange}
                                onSelect={onPriceRangeChange}
                            />

                            <FilterSection
                                title="المدينة"
                                options={locations}
                                selectedId={activeLocation}
                                onSelect={onLocationChange}
                            />

                            <View style={styles.spacer} />
                        </ScrollView>

                        {/* Footer */}
                        <SafeAreaView edges={['bottom']} style={styles.footer}>
                            <TouchableOpacity
                                onPress={close}
                                style={styles.applyButton}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.applyButtonText}>
                                    تطبيق الفلاتر ({resultsCount} نتيجة)
                                </Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>
        );
    }
);

FilterBottomSheet.displayName = 'FilterBottomSheet';
