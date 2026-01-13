// File: src/screens/services/_components/FilterBottomSheet.tsx
// Purpose: Bottom sheet filter component using standard Modal (Safe fallback)

import { Feather } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FilterOption {
    id: string;
    label: string;
}

interface FilterSection {
    title: string;
    options: FilterOption[];
    selectedId: string;
    onSelect: (id: string) => void;
}

interface FilterBottomSheetProps {
    categories: FilterOption[];
    priceRanges: FilterOption[];
    locations: FilterOption[];
    activeCategory: string;
    activePriceRange: string;
    activeLocation: string;
    onCategoryChange: (id: string) => void;
    onPriceRangeChange: (id: string) => void;
    onLocationChange: (id: string) => void;
    onClearAll: () => void;
    resultsCount: number;
}

export interface FilterBottomSheetRef {
    expand: () => void;
    close: () => void;
}

const FilterChip = ({
    label,
    isActive,
    onPress,
}: {
    label: string;
    isActive: boolean;
    onPress: () => void;
}) => (
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

const FilterSection = ({
    title,
    options,
    selectedId,
    onSelect,
}: FilterSection) => (
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

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    sheetContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
        width: '100%',
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    chipsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
    },
    chipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#475569',
    },
    spacer: {
        height: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        backgroundColor: 'white',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    applyButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: 'white',
    },
});

export default FilterBottomSheet;
