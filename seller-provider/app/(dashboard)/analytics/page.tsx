"use client";

import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";

import { StatCard } from "@/components/shared/StatCard";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import { DashboardCharts } from "@/components/shared/DashboardCharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, ShoppingCart, Users, Download } from "lucide-react";
import { TopProductsList } from "./_components";

// Mock analytics data
const mockStats = [
    { title: "إجمالي المبيعات", value: "125,000 ر.س", icon: DollarSign, trend: { value: 12.5, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "عدد الطلبات", value: "156", icon: ShoppingCart, trend: { value: 8.3, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "متوسط قيمة الطلب", value: "801 ر.س", icon: TrendingUp, trend: { value: 3.2, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "العملاء الجدد", value: "48", icon: Users, trend: { value: 15.2, positive: true, label: "مقارنة بالشهر السابق" } },
];

const mockChartData = [
    { name: "يناير", total: 45000, orders: 56 },
    { name: "فبراير", total: 52000, orders: 63 },
    { name: "مارس", total: 48000, orders: 59 },
    { name: "أبريل", total: 61000, orders: 72 },
    { name: "مايو", total: 55000, orders: 68 },
    { name: "يونيو", total: 67000, orders: 81 },
];

const mockSalesData = [
    { name: "غرف نوم", sales: 35000 },
    { name: "غرف معيشة", sales: 28000 },
    { name: "مكتبي", sales: 22000 },
    { name: "غرف طعام", sales: 18000 },
    { name: "إكسسوارات", sales: 12000 },
];

const topProducts = [
    { name: "كرسي مكتب فاخر", sales: 45, revenue: 54000 },
    { name: "أريكة جلدية 3 مقاعد", sales: 32, revenue: 144000 },
    { name: "طاولة طعام خشبية", sales: 28, revenue: 70000 },
    { name: "سرير كينج مع خزانة", sales: 22, revenue: 132000 },
    { name: "مكتبة خشب زان", sales: 18, revenue: 32400 },
];

export default function AnalyticsPage() {
    // Permission check is handled by route protection
    // This page is wrapped in PermissionGuard at route level if needed
    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-right w-full">
                    <h1 className="text-4xl font-black tracking-tight text-[#242C5A]">التحليلات</h1>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-primary rounded-full" />
                        <p className="text-gray-400 text-lg font-bold">تحليلات مفصلة لأداء متجرك</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <CalendarDateRangePicker />
                    <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-2xl h-10 px-6 font-black text-white">
                        <Download className="h-4 w-4 ml-2" />
                        تصدير
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {mockStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Charts */}
            <DashboardCharts revenueData={mockChartData} salesData={mockSalesData} />

            {/* Top Products */}
            <TopProductsList products={topProducts} />
        </div>
    );
}
