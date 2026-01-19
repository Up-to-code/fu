import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Link from "next/link";
import { getOrderStatusById, type Order } from "@/data";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";

interface OrderRowProps {
    order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
    const statusInfo = getOrderStatusById(order.status);
    
    // Format product names for display
    const getProductNamesDisplay = () => {
        const items = Array.isArray(order.items) ? order.items : [];
        if (items.length === 0) {
            return "لا توجد منتجات";
        }
        
        if (items.length === 1) {
            return items[0].productName;
        }
        
        if (items.length === 2) {
            return `${items[0].productName}، ${items[1].productName}`;
        }
        
        if (items.length === 3) {
            return `${items[0].productName}، ${items[1].productName}، ${items[2].productName}`;
        }
        
        // More than 3 items
        return `${items[0].productName}، ${items[1].productName}، +${items.length - 2} أكثر`;
    };
    
    const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
    
    return (
        <TableRow className="hover:bg-gray-50/50">
            <TableCell className="font-mono font-bold text-[#242C5A] whitespace-nowrap">{order.id}</TableCell>
            <TableCell>
                <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                </div>
            </TableCell>
            <TableCell>
                <div className="max-w-xs">
                    <p className="font-medium text-sm text-[#242C5A] line-clamp-2">
                        {getProductNamesDisplay()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{itemsCount} منتج</p>
                </div>
            </TableCell>
            <TableCell className="font-bold whitespace-nowrap">{order.total.toLocaleString()} ر.س</TableCell>
            <TableCell>
                <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>
                    {statusInfo.name}
                </Badge>
            </TableCell>
            <TableCell className="text-gray-500 whitespace-nowrap">{new Date(order.date).toLocaleDateString('ar-SA')}</TableCell>
            <TableCell>
                <Link href={`/orders/${order.id}`}>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    );
}
