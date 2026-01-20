"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { useOrders, useOrderSearch, useOrderFilters } from "./_hooks";
import { orderStatuses } from "@/data";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic Imports for Heavy Components
const OrdersTable = dynamic(() => import("./_components").then(mod => mod.OrdersTable), {
  loading: () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  ),
  ssr: false // Table is client-side data heavy
});

const DropdownMenu = dynamic(() => import("@/components/ui/dropdown-menu").then(mod => mod.DropdownMenu));
const DropdownMenuContent = dynamic(() => import("@/components/ui/dropdown-menu").then(mod => mod.DropdownMenuContent));
const DropdownMenuItem = dynamic(() => import("@/components/ui/dropdown-menu").then(mod => mod.DropdownMenuItem));
const DropdownMenuTrigger = dynamic(() => import("@/components/ui/dropdown-menu").then(mod => mod.DropdownMenuTrigger));
const DropdownMenuSeparator = dynamic(() => import("@/components/ui/dropdown-menu").then(mod => mod.DropdownMenuSeparator));

export default function OrdersPage() {
    const orders = useOrders();
    const { searchQuery, setSearchQuery } = useOrderSearch();
    const { filters, setFilters, clearFilters } = useOrderFilters();
    const [filterOpen, setFilterOpen] = useState(false);

    const activeStatusFilter = filters.status;
    const hasActiveFilters = !!activeStatusFilter;

    const handleStatusFilter = (statusId: string | null) => {
        if (statusId) {
            setFilters({ status: statusId });
        } else {
            clearFilters();
        }
        setFilterOpen(false);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#242C5A]">الطلبات</h1>
                    <p className="text-gray-500">إدارة ومتابعة طلبات العملاء • {orders.length} طلب</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="ابحث برقم الطلب أو اسم العميل..."
                        className="pr-10 rounded-xl bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant={hasActiveFilters ? "default" : "outline"} 
                            className="rounded-xl"
                        >
                            <Filter className="h-4 w-4 ml-2" />
                            فلترة
                            {hasActiveFilters && (
                                <Badge className="mr-2 h-5 px-1.5 bg-white text-[#242C5A]">
                                    1
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="p-2">
                            <p className="text-sm font-bold text-[#242C5A] mb-2">حالة الطلب</p>
                            <div className="space-y-1">
                                {orderStatuses.map((status) => (
                                    <DropdownMenuItem
                                        key={status.id}
                                        onClick={() => handleStatusFilter(status.id)}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{status.name}</span>
                                            {activeStatusFilter === status.id && (
                                                <div className={`h-2 w-2 rounded-full ${status.color.split(' ')[0]}`} />
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                            {hasActiveFilters && (
                                <>
                                    <DropdownMenuSeparator className="my-2" />
                                    <DropdownMenuItem
                                        onClick={() => handleStatusFilter(null)}
                                        className="cursor-pointer text-red-600"
                                    >
                                        <X className="h-4 w-4 ml-2" />
                                        إزالة الفلتر
                                    </DropdownMenuItem>
                                </>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="rounded-xl"
                    >
                        <X className="h-4 w-4 ml-1" />
                        مسح الفلتر
                    </Button>
                )}
            </div>

            {/* Orders Table */}
            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <p className="text-gray-500">لا توجد طلبات</p>
                </div>
            ) : (
                <OrdersTable orders={orders} />
            )}
        </div>
    );
}
