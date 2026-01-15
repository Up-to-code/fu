// File: src/screens/account/AddressesScreen.tsx
// Purpose: Screen for managing saved addresses with SQLite and Convex integration

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { EmptyState } from '../../components/shared';
import { Header } from '../shared';
import { SimpleModal } from '../shared';
import { useAddresses, Address } from './_hooks';

export default function AddressesScreen() {
    const router = useRouter();
    const { addresses, deleteAddress } = useAddresses();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

    const handleAddAddress = () => {
        router.push('/account/addresses/new' as any);
    };

    const handleEdit = (id: string) => {
        router.push(`/account/addresses/${id}` as any);
    };

    const handleDeletePress = (address: Address) => {
        setAddressToDelete(address);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!addressToDelete) {
            setDeleteModalVisible(false);
            return;
        }

        try {
            await deleteAddress(addressToDelete);
            setDeleteModalVisible(false);
            setAddressToDelete(null);
        } catch (error: any) {
            console.error('Error deleting address:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء حذف العنوان');
            setDeleteModalVisible(false);
            setAddressToDelete(null);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header
                    title="العناوين المحفوظة"
                    showBack
                    rightAction={
                        <TouchableOpacity onPress={handleAddAddress} style={styles.addButton}>
                            <Feather name="plus" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    }
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <View key={address.id} style={styles.addressCard}>
                                <View style={styles.addressHeader}>
                                    <View style={styles.labelContainer}>
                                        <Feather
                                            name={address.type === 'home' ? 'home' : address.type === 'work' ? 'briefcase' : 'map-pin'}
                                            size={18}
                                            color={COLORS.primary}
                                        />
                                        <Text style={styles.addressLabel}>{address.label}</Text>
                                        {address.isDefault && (
                                            <View style={styles.defaultBadge}>
                                                <Text style={styles.defaultText}>الافتراضي</Text>
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeletePress(address)}>
                                        <Feather name="trash-2" size={18} color="#94a3b8" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.addressText}>{address.street}</Text>
                                    <Text style={styles.addressSubText}>{address.city}</Text>
                                    {address.details && (
                                        <Text style={styles.addressSubText}>{address.details}</Text>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEdit(address.id)}
                                >
                                    <Text style={styles.editButtonText}>تعديل</Text>
                                    <Feather name="edit-2" size={14} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <EmptyState
                            icon="map-pin"
                            title="لا توجد عناوين"
                            description="لم تقم بإضافة أي عناوين بعد"
                        />
                    )}
                </ScrollView>

                {/* Delete Confirmation Modal */}
                <SimpleModal
                    visible={deleteModalVisible}
                    message="هل أنت متأكد من رغبتك في حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء."
                    confirmText="حذف"
                    cancelText="إلغاء"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => {
                        setDeleteModalVisible(false);
                        setAddressToDelete(null);
                    }}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    safeArea: { flex: 1 },
    addButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f0f9ff',
    },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
    addressCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        // No shadows - flat minimal design
    },
    addressHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    labelContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    addressLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: COLORS.text,
    },
    defaultBadge: {
        backgroundColor: '#f0f9ff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 8,
    },
    defaultText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 10,
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginBottom: 12,
    },
    detailsContainer: {
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    addressText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: COLORS.text,
        textAlign: 'right',
        marginBottom: 4,
    },
    addressSubText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: COLORS.textLight,
        textAlign: 'right',
        lineHeight: 20,
    },
    editButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        paddingVertical: 4,
    },
    editButtonText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: COLORS.primary,
    },
});
