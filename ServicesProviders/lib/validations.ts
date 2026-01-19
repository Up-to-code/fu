import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'الاسم مطلوب'),
    businessName: z.string().min(2, 'اسم المتجر مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().regex(/^(05|5)([0-9]{8})$/, 'رقم الجوال غير صحيح'),
    password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
});

// Product Schemas (Kept for compatibility if needed, but we focus on Services)
export const productSchema = z.object({
    name: z.string().min(2, 'اسم المنتج مطلوب'),
    nameEn: z.string().min(2, 'Product name is required'),
    description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
    categoryId: z.string().min(1, 'الفئة مطلوبة'),
    price: z.number().positive('السعر يجب أن يكون أكبر من صفر'),
    originalPrice: z.number().positive().optional(),
    stock: z.number().min(0, 'المخزون لا يمكن أن يكون سالباً'),
    sku: z.string().min(1, 'رمز المنتج مطلوب'),
    images: z.array(z.string()).min(1, 'صورة واحدة على الأقل مطلوبة'),
    weight: z.number().positive().optional(),
    dimensions: z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
    }).optional(),
    tags: z.array(z.string()).optional(),
});

// Service Schema (New)
export const serviceSchema = z.object({
    name: z.string().min(2, 'اسم الخدمة مطلوب'),
    description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
    categoryId: z.string().optional(),
    minPrice: z.number().positive('الحد الأدنى للسعر يجب أن يكون أكبر من صفر'),
    maxPrice: z.number().positive('الحد الأعلى للسعر يجب أن يكون أكبر من صفر').optional(),
    options: z.array(
        z.object({
            label: z.string().min(1, 'اسم الخيار مطلوب'),
            price: z.number().positive('سعر الخيار يجب أن يكون أكبر من صفر'),
        })
    ).min(1, 'أضف خياراً واحداً على الأقل'),
    duration: z.number().positive('المدة يجب أن تكون أكبر من صفر').optional(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
}).refine((data) => (data.maxPrice === undefined ? true : data.maxPrice >= data.minPrice), {
    message: 'الحد الأعلى يجب أن يكون أكبر من أو يساوي الحد الأدنى',
    path: ['maxPrice'],
});

// Category Schema
export const categorySchema = z.object({
    name: z.string().min(2, 'اسم الفئة مطلوب'),
    nameEn: z.string().min(2, 'Category name is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().optional(),
    order: z.number().min(0).optional(),
});

// Order Status Update Schema
export const orderStatusSchema = z.object({
    orderId: z.string(),
    status: z.enum(['pending', 'processing', 'shipping', 'delivered', 'completed', 'cancelled', 'returning', 'returned']),
    note: z.string().optional(),
    notifyCustomer: z.boolean().optional(),
});

// Settings Schema
export const profileSettingsSchema = z.object({
    name: z.string().min(2, 'الاسم مطلوب'),
    businessName: z.string().min(2, 'اسم المتجر مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().regex(/^(05|5)([0-9]{8})$/, 'رقم الجوال غير صحيح'),
    address: z.string().min(5, 'العنوان مطلوب'),
    businessDescription: z.string().optional(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8, 'كلمة المرور الحالية مطلوبة'),
    newPassword: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
});

// Bank Account Schema
export const bankAccountSchema = z.object({
    accountHolder: z.string().min(3, 'اسم صاحب الحساب مطلوب'),
    bankName: z.string().min(2, 'اسم البنك مطلوب'),
    iban: z.string().regex(/^SA[0-9]{22}$/, 'رقم الآيبان غير صحيح (يجب أن يبدأ بـ SA ويتبعه 22 رقم)'),
    swiftCode: z.string().regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'رمز السويفت غير صحيح'),
});

export const individualVerificationSchema = z.object({
    type: z.literal('individual'),
    fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
    nationalId: z
        .string()
        .regex(/^[12][0-9]{9}$/, 'رقم الهوية/الإقامة غير صحيح (10 أرقام ويبدأ بـ 1 أو 2)'),
    dateOfBirth: z.string().min(4, 'تاريخ الميلاد مطلوب'),
    nationality: z.string().min(2, 'الجنسية مطلوبة'),
    address: z.string().min(5, 'العنوان مطلوب'),
    phone: z.string().regex(/^(05|5)([0-9]{8})$/, 'رقم الجوال غير صحيح'),
});

export const organizationVerificationSchema = z.object({
    type: z.literal('organization'),
    organizationName: z.string().min(2, 'اسم المنشأة مطلوب'),
    commercialRegistrationNumber: z
        .string()
        .regex(/^[0-9]{10}$/, 'رقم السجل التجاري غير صحيح (10 أرقام)'),
    vatNumber: z
        .string()
        .regex(/^3[0-9]{13}3$/, 'الرقم الضريبي غير صحيح (15 رقم ويبدأ بـ 3 وينتهي بـ 3)'),
    nationalAddress: z.string().min(5, 'العنوان الوطني مطلوب'),
    authorizedPersonName: z.string().min(2, 'اسم المفوض مطلوب'),
    authorizedPersonNationalId: z
        .string()
        .regex(/^[12][0-9]{9}$/, 'رقم هوية/إقامة المفوض غير صحيح'),
    phone: z.string().regex(/^(05|5)([0-9]{8})$/, 'رقم الجوال غير صحيح'),
});

// Type inference
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type OrderStatusInput = z.infer<typeof orderStatusSchema>;
export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type BankAccountInput = z.infer<typeof bankAccountSchema>;
export type IndividualVerificationInput = z.infer<typeof individualVerificationSchema>;
export type OrganizationVerificationInput = z.infer<typeof organizationVerificationSchema>;
