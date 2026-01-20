'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

// Mock Data
const data = [
    { name: 'يناير', total: 4500 },
    { name: 'فبراير', total: 3200 },
    { name: 'مارس', total: 6000 },
    { name: 'أبريل', total: 4800 },
    { name: 'مايو', total: 7500 },
    { name: 'يونيو', total: 9000 },
];

const recentBookings = [
    { id: 1, customer: "أحمد محمد", service: "تنجيد كنب", date: "2024-03-15", amount: "450 ر.س", status: "مكتمل" },
    { id: 2, customer: "سارة علي", service: "تصميم داخلي", date: "2024-03-14", amount: "1200 ر.س", status: "قيد التنفيذ" },
    { id: 3, customer: "خالد عبدالله", service: "صيانة أثاث", date: "2024-03-13", amount: "300 ر.س", status: "مكتمل" },
    { id: 4, customer: "نورة سعد", service: "تفصيل ستائر", date: "2024-03-12", amount: "850 ر.س", status: "جديد" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
                <p className="text-slate-500">نظرة عامة على أداء خدماتك ومبيعاتك</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-slate-100 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">إجمالي الإيرادات</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">15,231.89 ر.س</div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 ml-1" />
                            +20.1% من الشهر الماضي
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-100 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">الحجوزات</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+573</div>
                        <p className="text-xs text-slate-500 mt-1">
                            +201 منذ آخر ساعة
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-100 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">العملاء النشطون</CardTitle>
                        <Users className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+2350</div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 ml-1" />
                            +180.1% من الشهر الماضي
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-100 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">الخدمات النشطة</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+12</div>
                        <p className="text-xs text-slate-500 mt-1">
                            +2 تم إضافتها هذا الأسبوع
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4 bg-white border-slate-100 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-slate-900">نظرة عامة</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value} ر.س`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#1E3A5F"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Sales/Bookings */}
                <Card className="col-span-3 bg-white border-slate-100 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-slate-900">آخر الحجوزات</CardTitle>
                        <p className="text-sm text-slate-500">تم إنجاز 25 طلب هذا الشهر</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <span className="font-bold text-slate-700 text-sm">
                                                {booking.customer.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-slate-900">{booking.customer}</p>
                                            <p className="text-xs text-slate-500">{booking.service}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">{booking.amount}</p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${booking.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700' :
                                                booking.status === 'قيد التنفيذ' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
