// Re-export all data from one place
export * from './blog';
export * from './styles';
export * from './categories';
export * from './products';
export * from './orders';

// Common emoji icons for categories
export const emojiIcons = ["🛏️", "🛋️", "🍽️", "💼", "🎨", "💡", "🪑", "🖼️", "🧺", "📦", "🧸", "🌳", "🚿", "🪴"];

// Dashboard Stats (for demo)
export const dashboardStats = {
    revenue: 125000,
    orders: 156,
    products: 48,
    customers: 234,
    trends: {
        revenue: 12.5,
        orders: 8.3,
        products: 2,
        customers: 15.2,
    }
};

// Chart data for dashboard
export const revenueChartData = [
    { name: "يناير", total: 45000, orders: 56 },
    { name: "فبراير", total: 52000, orders: 63 },
    { name: "مارس", total: 48000, orders: 59 },
    { name: "أبريل", total: 61000, orders: 72 },
    { name: "مايو", total: 55000, orders: 68 },
    { name: "يونيو", total: 67000, orders: 81 },
];

export const salesByCategory = [
    { name: "غرف نوم", sales: 35000 },
    { name: "غرف معيشة", sales: 28000 },
    { name: "مكتبي", sales: 22000 },
    { name: "غرف طعام", sales: 18000 },
    { name: "إكسسوارات", sales: 12000 },
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
    name: "معرض الأثاث الفاخر",
    slug: "furniture-store-123",
    commercialRegistration: "1234567890",
    description: "<p>نقدم لكم أفضل أنواع الأثاث الفاخر بأعلى جودة وأسعار منافسة. نحن متخصصون في تجهيز المنازل والمكاتب بأحدث التصاميم العصرية.</p>",
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
    { id: "3", name: "محمد خالد", email: "mohammad@example.com", role: "member", avatar: "مخ" },
];

// Notifications
export const notifications = [
    { id: "1", title: "طلب جديد", message: "لديك طلب جديد من العميل أحمد محمد بقيمة 2,500 ر.س", time: "منذ 5 دقائق", read: false },
    { id: "2", title: "منتج قارب على النفاد", message: "المنتج 'كرسي مكتب فاخر' متبقي منه 3 قطع فقط", time: "منذ ساعة", read: false },
    { id: "3", title: "تم شحن الطلب", message: "تم شحن الطلب رقم ORD-2024-001 بنجاح", time: "منذ 3 ساعات", read: true },
    { id: "4", title: "تحديث المبيعات", message: "المبيعات زادت بنسبة 15% هذا الأسبوع", time: "منذ يوم", read: true },
];
