"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Package } from "lucide-react";
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
import { useCategories, useCategorySearch, useCategoryViewMode, useCategoryActions } from "./_hooks";
import { CategoryCard, CategoryListItem, CategoryFormDialog, ViewModeToggle } from "./_components";
import { toast } from "sonner";

export default function CategoriesPage() {
    const categories = useCategories();
    const { searchQuery, setSearchQuery } = useCategorySearch();
    const { viewMode, setViewMode } = useCategoryViewMode();
    const { createSellerCategory, deleteSellerCategory } = useCategoryActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setCategoryToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (categoryToDelete) {
            await deleteSellerCategory({ categoryId: categoryToDelete as any });
            setDeleteDialogOpen(false);
            setCategoryToDelete(null);
        }
    };

    const handleAddCategory = async (categoryData: Omit<import("./_hooks").Category, "id">) => {
        try {
            await createSellerCategory({
                name: categoryData.name,
                nameEn: categoryData.nameEn,
                description: categoryData.description,
                image: categoryData.image,
                icon: categoryData.icon,
                style: categoryData.style,
            });
            toast.success("تم إضافة التصنيف");
        } catch (e: any) {
            toast.error("فشل إضافة التصنيف", { description: e?.message });
        }
    };

    return (
        <>
            <div className="space-y-8 max-w-6xl mx-auto" dir="rtl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-[#242C5A]">التصنيفات</h1>
                        <p className="text-gray-500">تنظيم منتجاتك في تصنيفات • {categories.length} تصنيف</p>
                    </div>
                    <CategoryFormDialog onAdd={handleAddCategory} />
                </div>

                {/* Search & View Toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ابحث في التصنيفات..."
                            className="pr-10 rounded-xl bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                </div>

                {/* Categories - Cards View */}
                {viewMode === "cards" && (
                    <>
                        {categories.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-1">لا توجد تصنيفات</h3>
                                <p className="text-sm text-gray-500">أضف تصنيفات لتنظيم منتجاتك</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {categories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Categories - List View */}
                {viewMode === "list" && (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        {categories.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-1">لا توجد تصنيفات</h3>
                                <p className="text-sm text-gray-500">أضف تصنيفات لتنظيم منتجاتك</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {categories.map((category) => (
                                    <CategoryListItem
                                        key={category.id}
                                        category={category}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>حذف التصنيف</AlertDialogTitle>
                        <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا التصنيف؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            حذف
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
