"use client";

import { create } from "zustand";

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export type Booking = {
    id: string;
    customerName: string;
    serviceName: string;
    scheduledAt: string;
    status: BookingStatus;
};

type BookingStore = {
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
    addBooking: (booking: Booking) => void;
    updateBooking: (id: string, updates: Partial<Booking>) => void;
    deleteBooking: (id: string) => void;
};

const initialBookings: Booking[] = [
    {
        id: "BKG-001",
        customerName: "أحمد محمد",
        serviceName: "تصميم شعار احترافي",
        scheduledAt: "2025-01-20T10:00:00",
        status: "in_progress",
    },
    {
        id: "BKG-002",
        customerName: "شركة الأفق",
        serviceName: "تطوير موقع تعريفي",
        scheduledAt: "2025-01-22T14:30:00",
        status: "confirmed",
    },
    {
        id: "BKG-003",
        customerName: "سارة علي",
        serviceName: "كتابة محتوى إبداعي",
        scheduledAt: "2025-01-25T09:00:00",
        status: "pending",
    },
];

export const useBookingStore = create<BookingStore>((set) => ({
    bookings: initialBookings,
    setBookings: (bookings) => set({ bookings }),
    addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
    updateBooking: (id, updates) =>
        set((state) => ({
            bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
    deleteBooking: (id) => set((state) => ({ bookings: state.bookings.filter((b) => b.id !== id) })),
}));

