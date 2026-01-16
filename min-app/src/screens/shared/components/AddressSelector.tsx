// File: src/screens/shared/components/AddressSelector.tsx
// Purpose: Shared component for address selection in checkout and booking screens

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { Address } from '../../account/_hooks';
import { getStyles } from '../StyleSheets/AddressSelector.styles';

interface AddressSelectorProps {
    addresses: Address[];
    selectedAddressId: string | null;
    onSelectAddress: (address: Address) => void;
    useManualAddress?: boolean;
    onToggleManualAddress?: () => void;
    manualAddress?: string;
    onManualAddressChange?: (address: string) => void;
    isLoading?: boolean;
    showManualToggle?: boolean; // Show manual input toggle (for booking screen)
    title?: string; // Section title (e.g., "عنوان التوصيل")
    showChangeButton?: boolean; // Show "Change" button (for checkout screen)
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
    addresses,
    selectedAddressId,
    onSelectAddress,
    useManualAddress = false,
    onToggleManualAddress,
    manualAddress = '',
    onManualAddressChange,
    isLoading = false,
    showManualToggle = false,
    title,
    showChangeButton = true,
}) => {
    const router = useRouter();
    const { isRTL } = useRTL();
    const { getSize, fontSize, iconSize } = useResponsive();
    const styles = getStyles(isRTL, getSize, fontSize, iconSize);
    const [showAddressMenu, setShowAddressMenu] = useState(false);
    const addressMenuAnim = useRef(new Animated.Value(0)).current;

    // Auto-select logic: no addresses → manual, one address → auto-select, multiple → default
    useEffect(() => {
        if (addresses.length === 0 && onToggleManualAddress) {
            // No addresses: use manual input
            if (!useManualAddress) {
                onToggleManualAddress();
            }
        } else if (addresses.length === 1 && !selectedAddressId && !useManualAddress) {
            // One address: auto-select it
            onSelectAddress(addresses[0]);
        } else if (addresses.length > 1 && !selectedAddressId && !useManualAddress) {
            // Multiple addresses: auto-select default or first
            const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
            if (defaultAddress) {
                onSelectAddress(defaultAddress);
            }
        }
    }, [addresses, selectedAddressId, useManualAddress]);

    // Toggle address menu animation
    useEffect(() => {
        Animated.timing(addressMenuAnim, {
            toValue: showAddressMenu ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [showAddressMenu]);

    const handleAddNew = () => {
        setShowAddressMenu(false);
        router.push('/account/addresses/new' as any);
    };

    const currentAddress = addresses.find(addr => addr.id === selectedAddressId);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>جاري تحميل العناوين...</Text>
            </View>
        );
    }

    // If no addresses, show message and manual input
    if (addresses.length === 0 && !isLoading) {
        return (
            <View style={styles.container}>
                {title && (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                
                {/* No Addresses Message */}
                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyStateIcon}>
                        <Feather name="map-pin" size={24} color="#94a3b8" />
                    </View>
                    <Text style={styles.emptyStateText}>
                        لا يوجد لديك عناوين محفوظة
                    </Text>
                    <Text style={styles.emptyStateSubtext}>
                        يرجى إضافة عنوان جديد أو إدخال العنوان يدوياً
                    </Text>
                </View>

                {/* Add New Address Button */}
                <TouchableOpacity
                    onPress={handleAddNew}
                    style={styles.addNewButton}
                >
                    <Feather name="plus" size={iconSize.sm} color={COLORS.primary} />
                    <Text style={styles.addNewButtonText}>إضافة عنوان جديد</Text>
                </TouchableOpacity>

                {/* Manual Input */}
                {onManualAddressChange && (
                    <View style={styles.manualInputContainer}>
                        <TextInput
                            style={styles.manualInput}
                            placeholder="أدخل العنوان الكامل"
                            value={manualAddress}
                            onChangeText={onManualAddressChange}
                            multiline
                            textAlign={isRTL ? 'right' : 'left'}
                        />
                    </View>
                )}
            </View>
        );
    }

    // If one address and it's selected, show as read-only (no menu toggle needed)
    const isSingleAddress = addresses.length === 1;
    // Show menu when: multiple addresses, showChangeButton is true, and not using manual address
    const shouldShowMenu = showChangeButton && !isSingleAddress && addresses.length > 1 && !useManualAddress;
    // Show manual toggle when: showManualToggle is true OR when multiple addresses exist (for booking screen)
    const shouldShowManualToggle = showManualToggle || (addresses.length > 1 && !showChangeButton);

    return (
        <View style={styles.container}>
            {title && (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    {shouldShowMenu && (
                        <TouchableOpacity
                            onPress={() => setShowAddressMenu(!showAddressMenu)}
                            style={styles.changeButton}
                        >
                            <Text style={styles.changeText}>تغيير</Text>
                            <Feather name="chevron-down" size={16} color={COLORS.primary} />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Address Selection Cards (for booking screen with multiple addresses) */}
            {!showChangeButton && addresses.length > 1 && !useManualAddress && (
                <View style={styles.addressesList}>
                    {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                            <TouchableOpacity
                                key={addr.id}
                                style={[
                                    styles.addressCardSelectable,
                                    isSelected && styles.addressCardSelectableSelected,
                                ]}
                                onPress={() => onSelectAddress(addr)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.addressCardContent}>
                                    <View style={[
                                        styles.addressIcon,
                                        isSelected && styles.addressIconSelected,
                                    ]}>
                                        <Feather
                                            name={
                                                addr.type === 'home'
                                                    ? 'home'
                                                    : addr.type === 'work'
                                                    ? 'briefcase'
                                                    : 'map-pin'
                                            }
                                            size={20}
                                            color={isSelected ? COLORS.primary : '#64748b'}
                                        />
                                    </View>
                                    <View style={styles.addressDetails}>
                                        <View style={styles.addressNameRow}>
                                            <Text style={[
                                                styles.addressName,
                                                isSelected && styles.addressNameSelected,
                                            ]}>
                                                {addr.label}
                                            </Text>
                                            {addr.isDefault && (
                                                <View style={styles.defaultBadge}>
                                                    <Text style={styles.defaultBadgeText}>افتراضي</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={[
                                            styles.addressText,
                                            isSelected && styles.addressTextSelected,
                                        ]}>
                                            {addr.street}
                                        </Text>
                                        <Text style={[
                                            styles.addressCity,
                                            isSelected && styles.addressCitySelected,
                                        ]}>
                                            {addr.city}
                                        </Text>
                                        {addr.details && (
                                            <Text style={[
                                                styles.addressDetailsText,
                                                isSelected && styles.addressDetailsTextSelected,
                                            ]}>
                                                {addr.details}
                                            </Text>
                                        )}
                                    </View>
                                    {isSelected && (
                                        <View style={styles.selectedCheck}>
                                            <Feather name="check-circle" size={iconSize.sm} color={COLORS.primary} />
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            {/* Current Address Card (for checkout screen or single address) */}
            {currentAddress && !useManualAddress && (showChangeButton || addresses.length === 1) && (
                <View style={styles.addressCard}>
                    <View style={styles.addressCardContent}>
                        <View style={styles.addressIcon}>
                            <Feather
                                name={
                                    currentAddress.type === 'home'
                                        ? 'home'
                                        : currentAddress.type === 'work'
                                        ? 'briefcase'
                                        : 'map-pin'
                                }
                                size={20}
                                color={COLORS.primary}
                            />
                        </View>
                        <View style={styles.addressDetails}>
                            <View style={styles.addressNameRow}>
                                <Text style={styles.addressName}>{currentAddress.label}</Text>
                                {currentAddress.isDefault && (
                                    <View style={styles.defaultBadge}>
                                        <Text style={styles.defaultBadgeText}>افتراضي</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.addressText}>{currentAddress.street}</Text>
                            <Text style={styles.addressCity}>{currentAddress.city}</Text>
                            {currentAddress.details && (
                                <Text style={styles.addressDetailsText}>{currentAddress.details}</Text>
                            )}
                        </View>
                    </View>
                </View>
            )}

            {/* Address Selection Menu (for multiple addresses) */}
            {shouldShowMenu && showAddressMenu && (
                <Animated.View
                    style={[
                        styles.addressMenu,
                        {
                            opacity: addressMenuAnim,
                            transform: [{
                                translateY: addressMenuAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-10, 0],
                                })
                            }]
                        }
                    ]}
                >
                    {addresses.map((addr, index) => (
                        <TouchableOpacity
                            key={addr.id}
                            onPress={() => {
                                onSelectAddress(addr);
                                setShowAddressMenu(false);
                            }}
                            style={[
                                styles.addressMenuItem,
                                index < addresses.length - 1 && styles.addressMenuItemBorder
                            ]}
                        >
                            <View style={[
                                styles.addressRadio,
                                selectedAddressId === addr.id ? styles.addressRadioSelected : styles.addressRadioUnselected
                            ]}>
                                {selectedAddressId === addr.id && (
                                    <View style={styles.addressRadioDot} />
                                )}
                            </View>
                            <View style={styles.addressMenuItemDetails}>
                                <View style={styles.addressMenuItemNameRow}>
                                    <Text style={styles.addressMenuItemName}>{addr.label}</Text>
                                    {addr.isDefault && (
                                        <View style={styles.defaultBadgeSmall}>
                                            <Text style={styles.defaultBadgeTextSmall}>افتراضي</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.addressMenuItemText}>{addr.street}</Text>
                                <Text style={styles.addressMenuItemCity}>{addr.city}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* Add New Address */}
                    <TouchableOpacity
                        onPress={handleAddNew}
                        style={styles.addAddressButton}
                    >
                        <View style={styles.addAddressIcon}>
                            <Feather name="plus" size={14} color={COLORS.primary} />
                        </View>
                        <Text style={styles.addAddressText}>إضافة عنوان جديد</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Manual Toggle and Add Button - Show when multiple addresses or when manual toggle is enabled */}
            {shouldShowManualToggle && addresses.length > 0 && onToggleManualAddress && (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        onPress={onToggleManualAddress}
                        style={styles.toggleButton}
                    >
                        <Feather
                            name={useManualAddress ? 'check-square' : 'square'}
                            size={iconSize.sm}
                            color={COLORS.primary}
                            fill={useManualAddress ? undefined : COLORS.primary}
                        />
                        <Text style={styles.toggleButtonText}>
                            {useManualAddress ? 'استخدام عنوان محفوظ' : 'إدخال عنوان يدوياً'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleAddNew}
                        style={styles.addNewButton}
                    >
                        <Feather name="plus" size={iconSize.sm} color={COLORS.primary} />
                        <Text style={styles.addNewButtonText}>إضافة عنوان جديد</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Show add button when multiple addresses but manual toggle is not available */}
            {addresses.length > 1 && !shouldShowManualToggle && (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        onPress={handleAddNew}
                        style={styles.addNewButton}
                    >
                        <Feather name="plus" size={iconSize.sm} color={COLORS.primary} />
                        <Text style={styles.addNewButtonText}>إضافة عنوان جديد</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Manual Input */}
            {useManualAddress && onManualAddressChange && (
                <View style={styles.manualInputContainer}>
                    <TextInput
                        style={styles.manualInput}
                        placeholder="أدخل العنوان الكامل"
                        value={manualAddress}
                        onChangeText={onManualAddressChange}
                        multiline
                        textAlign={isRTL ? 'right' : 'left'}
                    />
                </View>
            )}
        </View>
    );
};
