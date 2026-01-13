// Orders Mock Data
import { products } from "./products";

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    id: string;
    customer: string;
    email: string;
    phone: string;
    items: OrderItem[];
    total: number;
    subtotal: number;
    shipping: number;
    status: string;
    date: string;
    address: {
        street: string;
        city: string;
        district: string;
        postalCode: string;
    };
    paymentMethod: string;
    shippingCompany?: string;
    trackingNumber?: string;
    shippingNotes?: string;
    cancellationReason?: string;
}

export const orders: Order[] = [
    {
        id: "ORD-2024-001",
        customer: "أحمد محمد علي",
        email: "ahmed@example.com",
        phone: "0501234567",
        items: [
            {
                productId: "1",
                productName: products[0].name,
                productImage: products[0].image,
                quantity: 2,
                unitPrice: products[0].price,
                totalPrice: products[0].price * 2,
            },
            {
                productId: "2",
                productName: products[1].name,
                productImage: products[1].image,
                quantity: 1,
                unitPrice: products[1].price,
                totalPrice: products[1].price,
            },
        ],
        total: 4900,
        subtotal: 4600,
        shipping: 300,
        status: "completed",
        date: "2024-01-15",
        address: {
            street: "شارع الملك فهد",
            city: "الرياض",
            district: "العليا",
            postalCode: "12345",
        },
        paymentMethod: "card",
    },
    {
        id: "ORD-2024-002",
        customer: "سارة عبدالله",
        email: "sara@example.com",
        phone: "0559876543",
        items: [
            {
                productId: "3",
                productName: products[2].name,
                productImage: products[2].image,
                quantity: 1,
                unitPrice: products[2].price,
                totalPrice: products[2].price,
            },
            {
                productId: "4",
                productName: products[3].name,
                productImage: products[3].image,
                quantity: 1,
                unitPrice: products[3].price,
                totalPrice: products[3].price,
            },
        ],
        total: 7300,
        subtotal: 7000,
        shipping: 300,
        status: "shipping",
        date: "2024-01-14",
        address: {
            street: "شارع التحلية",
            city: "جدة",
            district: "الروضة",
            postalCode: "23456",
        },
        paymentMethod: "card",
        shippingCompany: "أرامكس",
        trackingNumber: "ARX123456789",
    },
    {
        id: "ORD-2024-003",
        customer: "محمد سالم",
        email: "mohammad@example.com",
        phone: "0541112233",
        items: [
            {
                productId: "1",
                productName: products[0].name,
                productImage: products[0].image,
                quantity: 1,
                unitPrice: products[0].price,
                totalPrice: products[0].price,
            },
        ],
        total: 1500,
        subtotal: 1200,
        shipping: 300,
        status: "processing",
        date: "2024-01-14",
        address: {
            street: "شارع الأمير سلطان",
            city: "الدمام",
            district: "الفيصلية",
            postalCode: "34567",
        },
        paymentMethod: "cod",
    },
    {
        id: "ORD-2024-004",
        customer: "فاطمة أحمد",
        email: "fatima@example.com",
        phone: "0567778899",
        items: [
            {
                productId: "1",
                productName: products[0].name,
                productImage: products[0].image,
                quantity: 2,
                unitPrice: products[0].price,
                totalPrice: products[0].price * 2,
            },
            {
                productId: "3",
                productName: products[2].name,
                productImage: products[2].image,
                quantity: 1,
                unitPrice: products[2].price,
                totalPrice: products[2].price,
            },
            {
                productId: "4",
                productName: products[3].name,
                productImage: products[3].image,
                quantity: 1,
                unitPrice: products[3].price,
                totalPrice: products[3].price,
            },
            {
                productId: "5",
                productName: products[4].name,
                productImage: products[4].image,
                quantity: 1,
                unitPrice: products[4].price,
                totalPrice: products[4].price,
            },
        ],
        total: 12200,
        subtotal: 11900,
        shipping: 300,
        status: "pending",
        date: "2024-01-13",
        address: {
            street: "شارع العليا",
            city: "الرياض",
            district: "النخيل",
            postalCode: "12678",
        },
        paymentMethod: "card",
    },
    {
        id: "ORD-2024-005",
        customer: "خالد عمر",
        email: "khaled@example.com",
        phone: "0523334455",
        items: [
            {
                productId: "2",
                productName: products[1].name,
                productImage: products[1].image,
                quantity: 1,
                unitPrice: products[1].price,
                totalPrice: products[1].price,
            },
            {
                productId: "6",
                productName: products[5].name,
                productImage: products[5].image,
                quantity: 1,
                unitPrice: products[5].price,
                totalPrice: products[5].price,
            },
        ],
        total: 8000,
        subtotal: 7700,
        shipping: 300,
        status: "completed",
        date: "2024-01-12",
        address: {
            street: "شارع الملك عبدالعزيز",
            city: "مكة",
            district: "العزيزية",
            postalCode: "45678",
        },
        paymentMethod: "card",
    },
    {
        id: "ORD-2024-006",
        customer: "نورة سعد",
        email: "noura@example.com",
        phone: "0534445566",
        items: [
            {
                productId: "1",
                productName: products[0].name,
                productImage: products[0].image,
                quantity: 1,
                unitPrice: products[0].price,
                totalPrice: products[0].price,
            },
            {
                productId: "2",
                productName: products[1].name,
                productImage: products[1].image,
                quantity: 1,
                unitPrice: products[1].price,
                totalPrice: products[1].price,
            },
            {
                productId: "3",
                productName: products[2].name,
                productImage: products[2].image,
                quantity: 1,
                unitPrice: products[2].price,
                totalPrice: products[2].price,
            },
            {
                productId: "4",
                productName: products[3].name,
                productImage: products[3].image,
                quantity: 1,
                unitPrice: products[3].price,
                totalPrice: products[3].price,
            },
        ],
        total: 11200,
        subtotal: 10900,
        shipping: 300,
        status: "cancelled",
        date: "2024-01-11",
        address: {
            street: "شارع الثلاثين",
            city: "الرياض",
            district: "الملز",
            postalCode: "12890",
        },
        paymentMethod: "cod",
    },
];

export const orderStatuses = [
    { id: "pending", name: "قيد الانتظار", color: "bg-yellow-100 text-yellow-700" },
    { id: "processing", name: "جار التجهيز", color: "bg-blue-100 text-blue-700" },
    { id: "shipping", name: "جار الشحن", color: "bg-purple-100 text-purple-700" },
    { id: "completed", name: "مكتمل", color: "bg-green-100 text-green-700" },
    { id: "cancelled", name: "ملغي", color: "bg-red-100 text-red-700" },
];

export const getOrderStatusById = (id: string) => orderStatuses.find(s => s.id === id) || orderStatuses[0];
