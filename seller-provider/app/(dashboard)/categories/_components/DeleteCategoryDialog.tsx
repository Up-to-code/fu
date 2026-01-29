"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface DeleteCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (deleteProducts: boolean) => void;
    categoryName: string;
    productCount: number;
}

export function DeleteCategoryDialog({
    open,
    onOpenChange,
    onConfirm,
    categoryName,
    productCount,
}: DeleteCategoryDialogProps) {
    const [deleteProducts, setDeleteProducts] = useState(false);

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md rounded-2xl" dir="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-[#242C5A] flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        حذف التصنيف
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        هل أنت متأكد من حذف تصنيف <span className="font-bold text-gray-900">"{categoryName}"</span>؟
                        لا يمكن التراجع عن هذا الإجراء.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="py-4 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <Checkbox 
                            id="delete-products" 
                            checked={deleteProducts}
                            onCheckedChange={(checked) => setDeleteProducts(checked === true)}
                            className="mt-1"
                        />
                        <div className="space-y-1">
                            <Label htmlFor="delete-products" className="font-medium cursor-pointer">
                                حذف جميع المنتجات ({productCount}) المرتبطة بهذا التصنيف
                            </Label>
                            <p className="text-xs text-gray-500">
                                عند التحديد، سيتم حذف {productCount} منتج وجميع الوسائط المرتبطة بها نهائياً.
                                عند عدم التحديد، ستبقى المنتجات ولكن بدون تصنيف.
                            </p>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onConfirm(deleteProducts)}
                        className="bg-red-600 hover:bg-red-700 rounded-xl"
                    >
                        حذف التصنيف {deleteProducts ? "والمنتجات" : ""}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
