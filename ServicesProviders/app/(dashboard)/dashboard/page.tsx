"use client";

import { StatCard } from "@/components/shared/StatCard";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import { Button } from "@/components/ui/button";
import { DollarSign, Briefcase, MessageSquare, Star, CircleHelp } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useDashboardStats, useDateRange } from "./_hooks";
import { QuickActions, BookingGoals, ActiveOrders, ServiceCalendar } from "./_components";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DashboardPage() {
    const stats = useDashboardStats();
    const { dateRange, setDateRange } = useDateRange();
    
    // Format date range for DateRangePicker
    const dateRangePicker = dateRange.from && dateRange.to ? {
        from: dateRange.from,
        to: dateRange.to,
    } : undefined;

    const handleDateRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setDateRange(range.from, range.to);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto flex flex-col gap-6 min-h-0" dir="rtl">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-4">
                <div className="space-y-2 text-right w-full">
                    <h2 className="text-4xl font-black tracking-tight text-[#242C5A]">لوحة التحكم</h2>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-primary rounded-full" />
                        <p className="text-gray-400 text-lg font-bold">ملخص أدائك كمقدم خدمة.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <CalendarDateRangePicker date={dateRangePicker} setDate={handleDateRangeChange} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/docs/dashboard-tracking">
                                    <Button variant="outline" size="icon" className="rounded-2xl h-10 w-10" aria-label="فتح توثيق لوحة التحكم">
                                        <CircleHelp className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>دليل لوحة التحكم</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-2xl h-10 px-6 font-black text-white shadow-none transition-all">
                        تصدير
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="إجمالي الأرباح"
                    value={`${stats.revenue.toLocaleString()} ر.س`}
                    icon={DollarSign}
                    iconClassName="text-green-600"
                    iconContainerClassName="bg-green-100"
                    trend={{ value: stats.trends.revenue, isPositive: stats.trends.revenue >= 0 }}
                />
                <StatCard
                    title="المهام النشطة"
                    value={stats.bookings.toString()}
                    icon={Briefcase}
                    iconClassName="text-blue-600"
                    iconContainerClassName="bg-blue-100"
                    trend={{ value: stats.trends.bookings, isPositive: stats.trends.bookings >= 0 }}
                />
                <StatCard
                    title="خدمات نشطة"
                    value={stats.services.toString()}
                    icon={MessageSquare}
                    iconClassName="text-orange-600"
                    iconContainerClassName="bg-orange-100"
                    trend={{ value: stats.trends.services, isPositive: stats.trends.services >= 0 }}
                />
                <StatCard
                    title="عملاء جدد"
                    value={stats.customers.toString()}
                    icon={Star}
                    iconClassName="text-yellow-600"
                    iconContainerClassName="bg-yellow-100"
                    trend={{ value: stats.trends.customers, isPositive: stats.trends.customers >= 0 }}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 flex-1 min-h-0">
                {/* Right Column (Goals & Actions) */}
                <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
                    <div className="flex-1 min-h-0">
                        <BookingGoals />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-black text-[#242C5A] mb-6">إجراءات سريعة</h3>
                        <QuickActions />
                    </div>
                </div>

                {/* Left Column (Orders & Calendar) */}
                <div className="lg:col-span-8 min-h-0">
                    <div className="grid grid-rows-2 gap-6 h-full min-h-0">
                        <ActiveOrders />
                        <ServiceCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
}
