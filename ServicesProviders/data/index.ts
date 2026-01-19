// Re-export all data from one place
export * from './blog';
export * from './styles';
export * from './categories';
export * from './services';

// Common emoji icons for categories
export const emojiIcons = ["🛏️", "🛋️", "🍽️", "💼", "🎨", "💡", "🪑", "🖼️", "🧺", "📦", "🧸", "🌳", "🚿", "🪴"];

// Dashboard Stats (for demo)
export const dashboardStats = {
    revenue: 125000,
    bookings: 156,
    services: 48,
    customers: 234,
    trends: {
        revenue: 12.5,
        bookings: 8.3,
        services: 2,
        customers: 15.2,
    }
};

// Chart data for dashboard
export const revenueChartData = [
    { name: "يناير", total: 45000, bookings: 56 },
    { name: "فبراير", total: 52000, bookings: 63 },
    { name: "مارس", total: 48000, bookings: 59 },
    { name: "أبريل", total: 61000, bookings: 72 },
    { name: "مايو", total: 55000, bookings: 68 },
    { name: "يونيو", total: 67000, bookings: 81 },
];

export const salesByCategory = [
    { name: "تصميم", sales: 35000 },
    { name: "برمجة", sales: 28000 },
    { name: "كتابة", sales: 22000 },
    { name: "تسويق", sales: 18000 },
    { name: "استشارات", sales: 12000 },
];

// Mock user for demo
export const mockUser = {
    id: "1",
    name: "أحمد محمد",
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "0501234567",
    initials: "أم",
    avatar: "",
};

// Mock organization
export const mockOrganization = {
    id: "1",
    name: "خدماتي المتميزة",
    slug: "my-services-123",
    commercialRegistration: "1234567890",
    description: "<p>نقدم لكم أفضل الخدمات الاحترافية بأعلى جودة وأسعار منافسة.</p>",
    logo: "",
    links: {
        website: "https://example.com",
        facebook: "https://facebook.com/example",
        twitter: "",
        instagram: "https://instagram.com/example",
        linkedin: "",
    },
};

// Mock team members
export const teamMembers = [
    { id: "1", name: "أحمد محمد", email: "ahmed@example.com", role: "owner", avatar: "أم" },
    { id: "2", name: "سارة علي", email: "sara@example.com", role: "admin", avatar: "سع" },
];

// Notifications
export const notifications = [
    { id: "1", title: "حجز جديد", message: "لديك حجز جديد من العميل أحمد محمد بقيمة 500 ر.س", time: "منذ 5 دقائق", read: false },
    { id: "2", title: "رسالة جديدة", message: "لديك رسالة جديدة من العميل سارة", time: "منذ ساعة", read: false },
    { id: "3", title: "تم الدفع", message: "تم استلام دفعة بقيمة 1500 ر.س", time: "منذ 3 ساعات", read: true },
];
