"use client";

import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";

import { StatCard } from "@/components/shared/StatCard";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import { DashboardCharts } from "@/components/shared/DashboardCharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, ShoppingCart, Users, Download } from "lucide-react";
import { TopServicesList } from "./_components";

// Mock analytics data
const mockStats = [
    { title: "إجمالي المبيعات", value: "125,000 ر.س", icon: DollarSign, trend: { value: 12.5, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "عدد الحجوزات", value: "156", icon: ShoppingCart, trend: { value: 8.3, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "متوسط قيمة الحجز", value: "801 ر.س", icon: TrendingUp, trend: { value: 3.2, positive: true, label: "مقارنة بالشهر السابق" } },
    { title: "العملاء الجدد", value: "48", icon: Users, trend: { value: 15.2, positive: true, label: "مقارنة بالشهر السابق" } },
];

const mockChartData = [
    { name: "يناير", total: 45000, bookings: 56 },
    { name: "فبراير", total: 52000, bookings: 63 },
    { name: "مارس", total: 48000, bookings: 59 },
    { name: "أبريل", total: 61000, bookings: 72 },
    { name: "مايو", total: 55000, bookings: 68 },
    { name: "يونيو", total: 67000, bookings: 81 },
];

const mockSalesData = [
    { name: "تصميم", sales: 35000 },
    { name: "برمجة", sales: 28000 },
    { name: "كتابة", sales: 22000 },
    { name: "تسويق", sales: 18000 },
    { name: "استشارات", sales: 12000 },
];

const topServices = [
    { name: "تصميم شعار احترافي", sales: 45, revenue: 22500 },
    { name: "تطوير موقع تعريفي", sales: 32, revenue: 48000 },
    { name: "كتابة محتوى إبداعي", sales: 28, revenue: 5600 },
    { name: "إدارة حسابات تواصل", sales: 22, revenue: 33000 },
    { name: "استشارة تسويقية", sales: 18, revenue: 9000 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-right w-full">
                    <h1 className="text-4xl font-black tracking-tight text-[#242C5A]">التحليلات</h1>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-primary rounded-full" />
                        <p className="text-gray-400 text-lg font-bold">تحليلات مفصلة لأداء خدماتك</p>
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

            {/* Top Services */}
            <TopServicesList services={topServices} />
        </div>
    );
}
