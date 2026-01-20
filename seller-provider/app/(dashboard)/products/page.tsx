"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Package, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productStatuses } from "@/data";
import { useProducts, useProductSearch, useProductActions } from "./_hooks";

const getStatusBadge = (status: string) => {
    const statusInfo = productStatuses.find(s => s.id === status);
    if (statusInfo) {
        return <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>{statusInfo.name}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
};

export default function ProductsPage() {
    const router = useRouter();
    const products = useProducts();
    const { searchQuery, setSearchQuery } = useProductSearch();
    const { deleteSellerProduct } = useProductActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setProductToDelete(productId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (productToDelete) {
            await deleteSellerProduct({ productId: productToDelete as any });
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    const handleEditClick = (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/products/${productId}/edit`);
    };

    return (
        <>
            <div className="space-y-8 max-w-7xl mx-auto" dir="rtl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-primary">المنتجات</h1>
                        <p className="text-gray-500">إدارة منتجات متجرك • {products.length} منتج</p>
                    </div>
                    <Link href="/products/new">
                        <Button className="rounded-xl">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة منتج
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ابحث في المنتجات..."
                            className="pr-10 rounded-xl bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">لا توجد منتجات</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="relative group">
                                <Link href={`/products/${product.id}`}>
                                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary/20 transition-all cursor-pointer">
                                        <div className="relative h-48 bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                                                    <p className="text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-lg"
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={(e) => handleEditClick(e, product.id)}>
                                                            <Edit className="h-4 w-4 ml-2" />
                                                            تعديل
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={(e) => handleDeleteClick(e, product.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 ml-2" />
                                                            حذف
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-lg text-primary">{product.price.toLocaleString()} ر.س</span>
                                                {getStatusBadge(product.status)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Package className="h-4 w-4" />
                                                <span>{product.stock} في المخزون</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>حذف المنتج</AlertDialogTitle>
                        <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
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
