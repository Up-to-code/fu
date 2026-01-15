// File: src/screens/account/AddressEditScreen.tsx
// Purpose: Screen for creating/editing addresses

import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FormInput, FormTextArea, FormToggle, PrimaryButton, TypeSelector, LoadingSpinner, TypeOption } from '../shared';
import { useAddressForm } from './_hooks';

const ADDRESS_TYPES: TypeOption[] = [
    { id: 'home', label: 'المنزل', icon: 'home' },
    { id: 'work', label: 'العمل', icon: 'briefcase' },
    { id: 'other', label: 'آخر', icon: 'map-pin' },
];

export default function AddressEditScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id && id !== 'new';

    const { formState, handleChange, handleSubmit, isLoading, isLoadingData, errors } = useAddressForm(id);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header
                    title={isEditing ? 'تعديل العنوان' : 'إضافة عنوان جديد'}
                    showBack
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    {isLoadingData ? (
                        <LoadingSpinner message="جاري التحميل..." />
                    ) : (
                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Address Type Selection */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>نوع العنوان</Text>
                                <TypeSelector
                                    options={ADDRESS_TYPES}
                                    selectedValue={formState.addressType}
                                    onSelect={handleChange('addressType')}
                                />
                            </View>

                            {/* Form Fields */}
                            <View style={styles.formSection}>
                                <FormInput
                                    label="اسم العنوان"
                                    value={formState.label}
                                    onChangeText={handleChange('label')}
                                    placeholder="مثال: منزل العائلة"
                                    required
                                    error={errors.label}
                                />

                                <FormInput
                                    label="المدينة"
                                    value={formState.city}
                                    onChangeText={handleChange('city')}
                                    placeholder="الرياض"
                                    required
                                    error={errors.city}
                                />

                                <FormInput
                                    label="الحي"
                                    value={formState.district}
                                    onChangeText={handleChange('district')}
                                    placeholder="حي النرجس"
                                />

                                <FormInput
                                    label="الشارع"
                                    value={formState.street}
                                    onChangeText={handleChange('street')}
                                    placeholder="شارع الأمير سلطان"
                                    required
                                    error={errors.street}
                                />

                                <FormTextArea
                                    label="تفاصيل إضافية"
                                    value={formState.details}
                                    onChangeText={handleChange('details')}
                                    placeholder="رقم المبنى، الدور، علامة مميزة..."
                                    rows={3}
                                />

                                <FormToggle
                                    label="العنوان الافتراضي"
                                    description="سيتم استخدام هذا العنوان تلقائياً للطلبات"
                                    value={formState.isDefault}
                                    onValueChange={handleChange('isDefault')}
                                />
                            </View>
                        </ScrollView>
                    )}

                    {/* Footer / Save Button */}
                    <View style={styles.footer}>
                        <PrimaryButton
                            label={isEditing ? 'حفظ التغييرات' : 'إضافة العنوان'}
                            onPress={handleSubmit}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: { padding: 20 },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    formSection: {
        gap: 16,
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
});
