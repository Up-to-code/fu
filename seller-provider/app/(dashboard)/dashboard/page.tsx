"use client";

import { StatCard } from "@/components/shared/StatCard";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import { DashboardCharts } from "@/components/shared/DashboardCharts";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, Package, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDashboardStats, useChartData, useSalesByCategory, getDefaultDateRange } from "./_hooks";
import { useOrders } from "../orders/_hooks";
import { RecentOrdersTable, QuickActions } from "./_components";
import { useCurrentUser } from "../_hooks/useCurrentUser";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultDateRange());
    const stats = useDashboardStats(dateRange);
    const chartData = useChartData(dateRange);
    const orders = useOrders(); // Returns array directly based on current hook implementation
    const user = useCurrentUser(); // Returns user object or null
    const salesByCategoryData = useSalesByCategory(dateRange);

    const isLoading = !stats || !chartData || !orders || !user;

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-80px)] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#242C5A] border-t-transparent" />
                    <p className="text-gray-400 font-bold animate-pulse">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }
    
    // Map recent orders (take first 5)
    const recentOrders = orders.slice(0, 5).map((order: any) => ({
        id: order.id,
        customer: order.customer,
        amount: order.total,
        status: order.status,
        date: order.date,
    }));

    // Format chart data
    const formattedChartData = chartData;

    // Format date range for DateRangePicker
    const dateRangePicker = dateRange?.from && dateRange?.to ? {
        from: dateRange.from,
        to: dateRange.to,
    } : undefined;

    const handleDateRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setDateRange(range);
        }
    };

    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto" dir="rtl">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-4">
                <div className="space-y-2 text-right w-full">
                    <h2 className="text-4xl font-black tracking-tight text-[#242C5A]">لوحة التحكم</h2>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-primary rounded-full" />
                        <p className="text-gray-400 text-lg font-bold">ملخص أداء متجرك لهذا الفترة.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <CalendarDateRangePicker date={dateRangePicker} setDate={handleDateRangeChange} />
                    <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-2xl h-10 px-6 font-black text-white shadow-none transition-all">
                        تصدير
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="إجمالي المبيعات"
                    value={`${stats.revenue.toLocaleString()} ر.س`}
                    icon={DollarSign}
                    trend={{ value: stats.trends.revenue, positive: stats.trends.revenue >= 0, label: "مقارنة بالفترة السابقة" }}
                />
                <StatCard
                    title="الطلبـات"
                    value={stats.orders.toString()}
                    icon={CreditCard}
                    trend={{ value: stats.trends.orders, positive: stats.trends.orders >= 0, label: "مقارنة بالفترة السابقة" }}
                />
                <StatCard
                    title="المنتجات النشطة"
                    value={stats.products.toString()}
                    icon={Package}
                    trend={{ value: stats.trends.products, positive: stats.trends.products >= 0, label: "مقارنة بالفترة السابقة" }}
                />
                <StatCard
                    title="العملاء"
                    value={stats.customers.toString()}
                    icon={Users}
                    trend={{ value: stats.trends.customers, positive: stats.trends.customers >= 0, label: "مقارنة بالفترة السابقة" }}
                />
            </div>

            {/* Charts */}
            <DashboardCharts revenueData={formattedChartData} salesData={salesByCategoryData} />

            {/* Quick Actions & Recent Orders */}
            <div className="grid gap-8 md:grid-cols-7">
                <div className="col-span-4 bg-white border border-gray-100 rounded-3xl p-10 overflow-hidden shadow-none h-full transition-all hover:border-[#242C5A]/10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1 text-right">
                            <h3 className="text-2xl font-black text-[#242C5A]">أحدث الطلبات</h3>
                            <p className="text-base text-gray-400 font-bold">آخر 5 طلبات في الفترة المحددة</p>
                        </div>
                        <Link href="/orders">
                            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 gap-2 rounded-xl font-black transition-all pr-4 pl-3">
                                <ArrowLeft className="h-5 w-5" />
                                <span>عرض الكل</span>
                            </Button>
                        </Link>
                    </div>
                    <RecentOrdersTable orders={recentOrders} />
                </div>
                <div className="col-span-3 space-y-8 h-full">
                    <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-none h-full transition-all hover:border-[#242C5A]/10">
                        <div className="space-y-1 mb-8 text-right">
                            <h3 className="text-2xl font-black text-[#242C5A]">إجراءات سريعة</h3>
                            <p className="text-base text-gray-400 font-bold">الوصول السريع للمهام المتكررة</p>
                        </div>
                        <QuickActions />
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-none transition-all hover:border-[#242C5A]/10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="space-y-1 text-right">
                            <h3 className="text-2xl font-black text-[#242C5A]">الملف الشخصي</h3>
                            <p className="text-base text-gray-400 font-bold">معلوماتك وتفضيلاتك</p>
                        </div>
                        <Link href="/account/update">
                            <Button variant="outline" className="rounded-xl font-black">
                                تعديل
                            </Button>
                        </Link>
                    </div>
                    <div className="space-y-3 text-right">
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-gray-500 font-bold">الاسم</span>
                            <span className="text-gray-900 font-black">{user?.name || "—"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-gray-500 font-bold">البريد الإلكتروني</span>
                            <span className="text-gray-900 font-black">{user?.email || "—"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-gray-500 font-bold">الدور</span>
                            <span className="text-gray-900 font-black">{user?.role || "—"}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-none transition-all hover:border-[#242C5A]/10">
                    <div className="space-y-1 mb-6 text-right">
                        <h3 className="text-2xl font-black text-[#242C5A]">المنشآت</h3>
                        <p className="text-base text-gray-400 font-bold">إدارة المنشأة أو الوصول لإدارة المنشآت</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/organization" className="w-full sm:w-auto">
                            <Button variant="outline" className="rounded-xl font-black w-full sm:w-auto">
                                منشأتي
                            </Button>
                        </Link>
                        <PermissionGuard permission={Permission.VIEW_ORGANIZATIONS}>
                            <Link href="/organizations" className="w-full sm:w-auto">
                                <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl font-black w-full sm:w-auto">
                                    إدارة المنشآت
                                </Button>
                            </Link>
                        </PermissionGuard>
                    </div>
                </div>
            </div>
        </div>
    );
}
