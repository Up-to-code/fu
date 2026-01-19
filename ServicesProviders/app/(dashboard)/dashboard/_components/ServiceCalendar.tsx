"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useBookingsByMonth, useBookings } from "../_hooks";

const days = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-50 text-yellow-700 border-yellow-200";
        case "confirmed":
            return "bg-blue-50 text-blue-700 border-blue-200";
        case "in_progress":
            return "bg-purple-50 text-purple-700 border-purple-200";
        case "completed":
            return "bg-green-50 text-green-700 border-green-200";
        case "cancelled":
            return "bg-red-50 text-red-700 border-red-200";
        default:
            return "bg-gray-50 text-gray-700 border-gray-200";
    }
};

export function ServiceCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // Jan 2025
    const bookingsByDay = useBookingsByMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const bookings = useBookings();

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateCalendarDays = () => {
        const totalDays = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const calendarDays = [];

        // Empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(null);
        }

        // Days of month
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(i);
        }

        return calendarDays;
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const monthBookings = bookings
        .map((b) => ({ ...b, date: new Date(b.scheduledAt) }))
        .filter((b) => b.date.getFullYear() === currentMonth.getFullYear() && b.date.getMonth() === currentMonth.getMonth())
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <Card className="border-gray-100 shadow-sm rounded-2xl h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-black text-[#242C5A]">جدول الخدمات</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-gray-700 min-w-[100px] text-center">
                        {currentMonth.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="hidden md:grid grid-cols-7 gap-1 mb-2 text-center">
                    {days.map(day => (
                        <div key={day} className="text-xs font-bold text-gray-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="hidden md:grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => (
                        <div 
                            key={index} 
                            className={`min-h-[84px] border border-gray-50 rounded-xl p-2 relative ${
                                day ? 'bg-white hover:border-gray-200 transition-colors' : 'bg-gray-50/30'
                            }`}
                        >
                            {day && (
                                <>
                                    <span className={`text-xs font-medium block mb-1 ${
                                        new Date().getDate() === day && 
                                        new Date().getMonth() === currentMonth.getMonth() && 
                                        new Date().getFullYear() === currentMonth.getFullYear()
                                            ? 'text-[#242C5A] font-black' 
                                            : 'text-gray-500'
                                    }`}>
                                        {day}
                                    </span>
                                    <div className="space-y-1">
                                        {(bookingsByDay.get(day) ?? []).slice(0, 2).map((booking) => {
                                            const date = new Date(booking.scheduledAt);
                                            const time = date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
                                            return (
                                                <div
                                                    key={booking.id}
                                                    className={`text-[10px] px-2 py-1 rounded-lg border truncate ${getStatusColor(booking.status)}`}
                                                    title={`${booking.customerName} • ${booking.serviceName}`}
                                                >
                                                    <span className="font-bold">{time}</span> {booking.serviceName}
                                                </div>
                                            );
                                        })}
                                        {(bookingsByDay.get(day) ?? []).length > 2 && (
                                            <div className="text-[10px] text-gray-400 font-bold px-1">
                                                +{(bookingsByDay.get(day) ?? []).length - 2} مواعيد
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="md:hidden space-y-3">
                    {monthBookings.length === 0 ? (
                        <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-500 font-medium">لا توجد مواعيد هذا الشهر</p>
                        </div>
                    ) : (
                        monthBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                                <div className="min-w-0">
                                    <p className="font-bold text-[#242C5A] truncate">{booking.serviceName}</p>
                                    <p className="text-xs text-gray-500 truncate">{booking.customerName}</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-gray-500">
                                        {booking.date.toLocaleDateString("ar-EG", { day: "2-digit", month: "short" })}
                                    </p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                                        {booking.date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
