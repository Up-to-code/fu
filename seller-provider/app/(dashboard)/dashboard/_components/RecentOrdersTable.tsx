"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'pending': return 'secondary';
        case 'processing': return 'default';
        case 'shipping': return 'default';
        case 'completed': return 'outline';
        case 'cancelled': return 'destructive';
        default: return 'outline';
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'pending': return 'قيد الانتظار';
        case 'processing': return 'جار التجهيز';
        case 'shipping': return 'جار الشحن';
        case 'completed': return 'مكتمل';
        case 'cancelled': return 'ملغي';
        default: return status;
    }
};

interface Order {
    id?: string;
    _id?: string;
    orderNumber?: string;
    customer?: string;
    customerName?: string;
    amount?: number;
    total?: number;
    status: string;
    date?: string;
    createdAt?: string | number;
}

interface RecentOrdersTableProps {
    orders?: Order[];
}

export function RecentOrdersTable({ orders = [] }: RecentOrdersTableProps) {
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-2xl mx-6 mb-6">
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <p className="text-xl">🛍️</p>
                </div>
                <h3 className="text-sm font-bold text-gray-900">لا توجد طلبات حديثة</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[250px]">
                    لم يتم تسجيل أي طلبات في الفترة المحددة.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="pt-0">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-gray-100 hover:bg-transparent h-12">
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-gray-500">رقم الطلب</TableHead>
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-gray-500">العميل</TableHead>
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-gray-500">الحالة</TableHead>
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-gray-500">المجموع</TableHead>
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-gray-500">التاريخ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, index) => {
                            const orderId = order.id || order._id || `order-${index}`;
                            const orderNumber = order.orderNumber || order.id || `#${index + 1}`;
                            const customerName = order.customer || order.customerName || 'عميل';
                            const amount = order.amount ?? order.total ?? 0;
                            const dateValue = order.date || order.createdAt;

                            return (
                                <TableRow key={orderId} className="border-gray-50 hover:bg-gray-50/30 transition-colors h-14">
                                    <TableCell className="font-bold text-gray-700 font-mono text-xs">{orderNumber}</TableCell>
                                    <TableCell className="font-medium">{customerName}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(order.status) as any} className="font-bold rounded-lg px-2 py-0.5 text-[10px]">
                                            {getStatusLabel(order.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-bold">{amount.toLocaleString()} ر.س</TableCell>
                                    <TableCell className="text-muted-foreground text-xs font-medium">
                                        {dateValue ? new Date(dateValue).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }) : '-'}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
