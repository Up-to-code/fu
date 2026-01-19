export type ServiceOption = {
    label: string;
    price: number;
};

export type ServiceStatus = "active" | "draft" | "paused";

export type Service = {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    minPrice: number;
    maxPrice?: number;
    options: ServiceOption[];
    price: number;
    comparePrice?: number;
    duration: number;
    status: ServiceStatus;
    category: string;
    categoryId: string;
    style: string;
    image: string;
    images: string[];
    sales: number;
    views: number;
};

// Services Mock Data
export const services: Service[] = [
    {
        id: "1",
        name: "تصميم شعار احترافي",
        nameEn: "Professional Logo Design",
        description: "تصميم شعار فريد يعكس هوية علامتك التجارية مع تسليم ملفات المصدر.",
        minPrice: 500,
        maxPrice: 750,
        options: [
            { label: "تصميم شعار أساسي", price: 500 },
            { label: "تصميم شعار + دليل استخدام", price: 750 },
        ],
        price: 500,
        comparePrice: 750,
        duration: 3, // days
        status: "active",
        category: "تصميم جرافيك",
        categoryId: "4",
        style: "modern",
        image: "https://images.unsplash.com/photo-1626785774573-4b7993143a26?w=400",
        images: [
            "https://images.unsplash.com/photo-1626785774573-4b7993143a26?w=600",
        ],
        sales: 45,
        views: 234,
    },
    {
        id: "2",
        name: "تطوير موقع تعريفي",
        nameEn: "Landing Page Development",
        description: "تطوير موقع صفحة واحدة متجاوب وسريع باستخدام أحدث التقنيات.",
        minPrice: 1500,
        maxPrice: 3000,
        options: [
            { label: "صفحة واحدة", price: 1500 },
            { label: "صفحتين + تحسين SEO", price: 2200 },
            { label: "حزمة كاملة + نشر", price: 3000 },
        ],
        price: 1500,
        comparePrice: 2000,
        duration: 7,
        status: "active",
        category: "برمجة وتطوير",
        categoryId: "3",
        style: "tech",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
        images: [],
        sales: 28,
        views: 156,
    },
    {
        id: "3",
        name: "كتابة محتوى إبداعي",
        nameEn: "Creative Content Writing",
        description: "كتابة مقالات ومحتوى سوشيال ميديا جذاب ومتوافق مع SEO.",
        minPrice: 200,
        maxPrice: 800,
        options: [
            { label: "مقال واحد", price: 200 },
            { label: "4 مقالات", price: 650 },
            { label: "8 مقالات", price: 800 },
        ],
        price: 200,
        comparePrice: undefined,
        duration: 2,
        status: "active",
        category: "كتابة وترجمة",
        categoryId: "2",
        style: "creative",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        images: [],
        sales: 32,
        views: 445,
    },
];

export const serviceStatuses = [
    { id: "active", name: "نشط", color: "bg-green-100 text-green-700" },
    { id: "draft", name: "مسودة", color: "bg-gray-100 text-gray-700" },
    { id: "paused", name: "متوقف مؤقتاً", color: "bg-yellow-100 text-yellow-700" },
];
