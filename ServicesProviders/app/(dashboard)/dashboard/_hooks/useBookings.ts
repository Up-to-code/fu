"use client";

import { useMemo } from "react";
import { useBookingStore } from "./useBookingStore";

export function useBookings() {
    return useBookingStore((s) => s.bookings);
}

export function useBookingsByMonth(year: number, monthIndex: number) {
    const bookings = useBookings();

    return useMemo(() => {
        const grouped = new Map<number, typeof bookings>();
        for (const booking of bookings) {
            const date = new Date(booking.scheduledAt);
            if (date.getFullYear() !== year || date.getMonth() !== monthIndex) continue;
            const day = date.getDate();
            const existing = grouped.get(day);
            if (existing) existing.push(booking);
            else grouped.set(day, [booking]);
        }
        return grouped;
    }, [bookings, year, monthIndex]);
}

