/**
 * Error Handling Utilities
 * Functions for formatting and handling errors
 */

/**
 * Get user-friendly error message from an error
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    
    if (typeof error === 'string') {
        return error;
    }
    
    return 'حدث خطأ غير متوقع';
}

/**
 * Handle Convex errors
 */
export function handleConvexError(error: unknown): string {
    const dataCode = (error as any)?.data?.code as string | undefined;
    const dataMessage = (error as any)?.data?.message as string | undefined;
    if (dataCode) {
        const msg = dataMessage || getErrorMessage(error);
        const codeMap: Record<string, string> = {
            AUTH_REQUIRED: 'يرجى تسجيل الدخول للمتابعة',
            FORBIDDEN: 'غير مصرح لك بتنفيذ هذا الإجراء',
            NOT_FOUND: 'العنصر غير موجود',
            VALIDATION_FAILED: 'البيانات المدخلة غير صحيحة',
            CONFLICT: 'تعذر إكمال العملية بسبب تعارض في البيانات',
            INTEGRITY_BLOCKED: 'تعذر الحذف بسبب بيانات مرتبطة',
        };
        return codeMap[dataCode] || msg;
    }

    const message = getErrorMessage(error);
    
    // Map common Convex error messages to user-friendly Arabic messages
    const errorMap: Record<string, string> = {
        'Service not found': 'الخدمة غير موجودة',
        'Provider not found or deleted': 'مقدم الخدمة غير موجود أو محذوف',
        'Service category not found': 'تصنيف الخدمة غير موجود',
        'Unauthorized: You can only update your own services': 'غير مصرح: يمكنك فقط تحديث خدماتك الخاصة',
        'Unauthorized: You can only delete your own services': 'غير مصرح: يمكنك فقط حذف خدماتك الخاصة',
        'Unauthorized: You can only toggle your own services': 'غير مصرح: يمكنك فقط تغيير حالة خدماتك الخاصة',
        'Booking not found': 'الحجز غير موجود',
        'Unauthorized: You can only update bookings for your services': 'غير مصرح: يمكنك فقط تحديث حجوزات خدماتك',
        'Invalid status transition': 'انتقال حالة غير صالح',
        'Cannot cancel booking': 'لا يمكن إلغاء الحجز',
        'Cannot complete booking': 'لا يمكن إكمال الحجز',
    };
    
    // Check if we have a mapped message
    for (const [key, value] of Object.entries(errorMap)) {
        if (message.includes(key)) {
            return value;
        }
    }
    
    return message;
}

/**
 * Error result type for server actions
 */
export interface ErrorResult {
    success: false;
    error: string;
}

/**
 * Success result type for server actions
 */
export interface SuccessResult<T = any> {
    success: true;
    data: T;
}

/**
 * Action result type
 */
export type ActionResult<T = any> = SuccessResult<T> | ErrorResult;

/**
 * Create error result
 */
export function createErrorResult(error: unknown): ErrorResult {
    return {
        success: false,
        error: handleConvexError(error),
    };
}

/**
 * Create success result
 */
export function createSuccessResult<T>(data: T): SuccessResult<T> {
    return {
        success: true,
        data,
    };
}
