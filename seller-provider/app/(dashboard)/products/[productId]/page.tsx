"use client";

import { Button } from "@/components/ui/button";
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
import { ArrowRight, Edit, Package, ShoppingCart, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useProduct, useProductActions } from "../_hooks";
import { productStatuses } from "@/data";

const getStatusBadge = (status: string) => {
    const statusInfo = productStatuses.find(s => s.id === status);
    if (statusInfo) {
        return <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>{statusInfo.name}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const product = useProduct(productId);
    const { deleteSellerProduct } = useProductActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        if (product) {
            await deleteSellerProduct({ productId: productId as any });
            setDeleteDialogOpen(false);
            router.push("/products");
        }
    };

    if (!product) {
        return (
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                <div className="text-center py-12">
                    <p className="text-gray-500">المنتج غير موجود</p>
                    <Link href="/products">
                        <Button variant="outline" className="mt-4">
                            العودة إلى المنتجات
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/products">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-[#242C5A]">{product.name}</h1>
                            <p className="text-gray-500">SKU: {product.sku}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/products/${productId}/edit`}>
                            <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
                                <Edit className="h-4 w-4 ml-2" />
                                تعديل المنتج
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images & Videos */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {product.images.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <div key={`img-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                            <Image src={img} alt={product.name} fill className="object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                )}
                                
                                {/* Videos */}
                                {product.video && (
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <video src={product.video} controls className="w-full h-full object-cover" />
                                        <Badge className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70">فيديو رئيسي</Badge>
                                    </div>
                                )}
                                {product.videos?.map((vid, index) => (
                                    <div key={`vid-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <video src={vid} controls className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-[#242C5A] mb-4">الوصف</h2>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Price */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الحالة</span>
                                {getStatusBadge(product.status)}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">التصنيف</span>
                                <span className="font-medium">{product.category}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الستايل</span>
                                <span className="font-medium">{product.style}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-[#242C5A]">{product.price.toLocaleString()} ر.س</span>
                                    {product.comparePrice && product.comparePrice > product.price && (
                                        <span className="text-lg text-gray-400 line-through">{product.comparePrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Package className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#242C5A]">{product.stock}</p>
                                    <p className="text-sm text-gray-500">في المخزون</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        {(product.sales !== undefined || product.views !== undefined) && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                                <h3 className="font-bold text-[#242C5A]">الإحصائيات</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.sales !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <ShoppingCart className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-[#242C5A]">{product.sales}</p>
                                            <p className="text-xs text-gray-500">مبيعات</p>
                                        </div>
                                    )}
                                    {product.views !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <Eye className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-[#242C5A]">{product.views}</p>
                                            <p className="text-xs text-gray-500">مشاهدة</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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
                            onClick={handleDelete}
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
