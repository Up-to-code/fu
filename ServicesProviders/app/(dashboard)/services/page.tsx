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
import { Plus, Search, MoreHorizontal, Trash2, Edit, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { serviceStatuses } from "@/data/services";
import { useServices, useServiceSearch, useServiceActions } from "./_hooks";

const getStatusBadge = (status: string) => {
    const statusInfo = serviceStatuses.find(s => s.id === status);
    if (statusInfo) {
        return <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>{statusInfo.name}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
};

export default function ServicesPage() {
    const router = useRouter();
    const services = useServices();
    const { searchQuery, setSearchQuery } = useServiceSearch();
    const { deleteService } = useServiceActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, serviceId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setServiceToDelete(serviceId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (serviceToDelete) {
            deleteService(serviceToDelete);
            setDeleteDialogOpen(false);
            setServiceToDelete(null);
        }
    };

    const handleEditClick = (e: React.MouseEvent, serviceId: string) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/services/${serviceId}/edit`);
    };

    return (
        <>
            <div className="space-y-8 max-w-7xl mx-auto" dir="rtl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-[#242C5A]">خدماتي</h1>
                        <p className="text-gray-500">إدارة الخدمات التي تقدمها للعملاء • {services.length} خدمة</p>
                    </div>
                    <Link href="/services/new">
                        <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة خدمة
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ابحث في الخدمات..."
                            className="pr-10 rounded-xl bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Services Grid */}
                {services.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">لا توجد خدمات</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.id} className="relative group">
                                <Link href={`/services/${service.id}`}>
                                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#242C5A]/20 transition-all cursor-pointer">
                                        <div className="relative h-48 bg-gray-100">
                                            <Image
                                                src={service.image}
                                                alt={service.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                                                    <p className="text-sm text-gray-500">{service.category}</p>
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
                                                        <DropdownMenuItem onClick={(e) => handleEditClick(e, service.id)}>
                                                            <Edit className="h-4 w-4 ml-2" />
                                                            تعديل
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={(e) => handleDeleteClick(e, service.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 ml-2" />
                                                            حذف
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-lg text-[#242C5A]">{service.price.toLocaleString()} ر.س</span>
                                                {getStatusBadge(service.status)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span>{service.duration} أيام تنفيذ</span>
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
                        <AlertDialogTitle>حذف الخدمة</AlertDialogTitle>
                        <AlertDialogDescription>
                            هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
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
