import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProductActions } from "./useProducts";
import { type Product } from "./useProductStore";
import { productSchema } from "@/lib/validations";
import { z } from "zod";

type ProductFormData = {
    name: string;
    nameEn: string;
    description: string;
    price: string;
    comparePrice: string;
    stock: string;
    sku: string;
    categoryId: string;
    style: string;
    status: "active" | "draft";
    image: string;
    images: string[];
    video?: string;
    videos?: string[];
};

const defaultFormData: ProductFormData = {
    name: "",
    nameEn: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    sku: "",
    categoryId: "",
    style: "",
    status: "active",
    image: "",
    images: [],
    video: "",
    videos: [],
};

export function useProductForm(productId?: string, initialData?: Partial<Product>) {
    const router = useRouter();
    const { createSellerProduct, updateSellerProduct } = useProductActions();
    const [formData, setFormData] = useState<ProductFormData>(() => {
        if (initialData) {
            return {
                name: initialData.name || "",
                nameEn: initialData.nameEn || "",
                description: initialData.description || "",
                price: initialData.price?.toString() || "",
                comparePrice: initialData.comparePrice?.toString() || "",
                stock: initialData.stock?.toString() || "",
                sku: initialData.sku || "",
                categoryId: initialData.categoryId || "",
                style: initialData.style || "",
                status: (initialData.status === "active" || initialData.status === "draft" ? initialData.status : "active") as "active" | "draft",
                image: initialData.image || initialData.images?.[0] || "",
                images: initialData.images || [],
                video: initialData.video || initialData.videos?.[0] || "",
                videos: initialData.videos || [],
            };
        }
        return defaultFormData;
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updateField = useCallback((field: keyof ProductFormData, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field when user types
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);
    
    const validate = useCallback((): boolean => {
        try {
            const validationData = {
                name: formData.name,
                nameEn: formData.nameEn,
                description: formData.description,
                categoryId: formData.categoryId,
                price: parseFloat(formData.price) || 0,
                originalPrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
                stock: parseInt(formData.stock) || 0,
                sku: formData.sku,
                images: formData.image ? [formData.image, ...formData.images.filter(img => img !== formData.image)] : formData.images,
                video: formData.video || undefined,
                videos: formData.video ? [formData.video] : [],
            };
            
            productSchema.parse(validationData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    }, [formData]);
    
    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        
        if (!validate()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const images = formData.images.length > 0 ? formData.images : (formData.image ? [formData.image] : []);
            const mainImage = formData.image || images[0] || "";
            const videos = formData.videos && formData.videos.length > 0 ? formData.videos : (formData.video ? [formData.video] : []);
            const mainVideo = formData.video || videos[0] || undefined;

            if (productId) {
                await updateSellerProduct({
                    productId: productId as any,
                    name: formData.name,
                    nameEn: formData.nameEn,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
                    stock: parseInt(formData.stock) || 0,
                    sku: formData.sku || undefined,
                    categoryId: formData.categoryId ? (formData.categoryId as any) : undefined,
                    style: formData.style || undefined,
                    status: formData.status,
                    image: mainImage,
                    images,
                    video: mainVideo,
                    videos,
                });
                router.push(`/products/${productId}`);
            } else {
                const res = await createSellerProduct({
                    name: formData.name,
                    nameEn: formData.nameEn || undefined,
                    description: formData.description || undefined,
                    price: parseFloat(formData.price),
                    comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
                    stock: parseInt(formData.stock) || 0,
                    sku: formData.sku || undefined,
                    categoryId: formData.categoryId ? (formData.categoryId as any) : undefined,
                    style: formData.style || undefined,
                    status: formData.status,
                    image: mainImage,
                    images,
                    video: mainVideo,
                    videos,
                });
                router.push(`/products/${(res as any).productId}`);
            }
        } catch (error) {
            console.error("Error saving product:", error);
            setErrors({ submit: "حدث خطأ أثناء حفظ المنتج" });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, productId, validate, createSellerProduct, updateSellerProduct, router]);
    
    return {
        formData,
        updateField,
        errors,
        isSubmitting,
        handleSubmit,
        validate,
    };
}
