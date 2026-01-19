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
import { ArrowRight, Edit, Clock, ShoppingCart, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useService, useServiceActions } from "../_hooks";
import { serviceStatuses } from "@/data";

const getStatusBadge = (status: string) => {
    const statusInfo = serviceStatuses.find(s => s.id === status);
    if (statusInfo) {
        return <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>{statusInfo.name}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
};

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const serviceId = params.serviceId as string;
    const service = useService(serviceId);
    const { deleteService } = useServiceActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        if (service) {
            deleteService(serviceId);
            setDeleteDialogOpen(false);
            router.push("/services");
        }
    };

    if (!service) {
        return (
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                <div className="text-center py-12">
                    <p className="text-gray-500">الخدمة غير موجودة</p>
                    <Link href="/services">
                        <Button variant="outline" className="mt-4">
                            العودة إلى الخدمات
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
                        <Link href="/services">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-[#242C5A]">{service.name}</h1>
                            <p className="text-gray-500">{service.category}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/services/${serviceId}/edit`}>
                            <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
                                <Edit className="h-4 w-4 ml-2" />
                                تعديل الخدمة
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
                        {/* Images */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {service.images.length > 0 ? (
                                    service.images.map((img, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                            <Image src={img} alt={service.name} fill className="object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-[#242C5A] mb-4">الوصف</h2>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Price */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الحالة</span>
                                {getStatusBadge(service.status)}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">التصنيف</span>
                                <span className="font-medium">{service.category}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الستايل</span>
                                <span className="font-medium">{service.style}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-[#242C5A]">{service.price.toLocaleString()} ر.س</span>
                                    {service.comparePrice && service.comparePrice > service.price && (
                                        <span className="text-lg text-gray-400 line-through">{service.comparePrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#242C5A]">{service.duration} أيام</p>
                                    <p className="text-sm text-gray-500">مدة التنفيذ</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        {(service.sales !== undefined || service.views !== undefined) && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                                <h3 className="font-bold text-[#242C5A]">الإحصائيات</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {service.sales !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <ShoppingCart className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-[#242C5A]">{service.sales}</p>
                                            <p className="text-xs text-gray-500">طلبات</p>
                                        </div>
                                    )}
                                    {service.views !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <Eye className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-[#242C5A]">{service.views}</p>
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
                        <AlertDialogTitle>حذف الخدمة</AlertDialogTitle>
                        <AlertDialogDescription>
                            هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
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
