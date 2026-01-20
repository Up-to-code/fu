import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { type Order } from "../_hooks";
import { OrderRow } from "./OrderRow";

interface OrdersTableProps {
    orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-right font-bold min-w-[140px]">رقم الطلب</TableHead>
                            <TableHead className="text-right font-bold min-w-[180px]">العميل</TableHead>
                            <TableHead className="text-right font-bold min-w-[200px]">المنتجات</TableHead>
                            <TableHead className="text-right font-bold min-w-[120px]">المجموع</TableHead>
                            <TableHead className="text-right font-bold min-w-[130px]">الحالة</TableHead>
                            <TableHead className="text-right font-bold min-w-[140px]">التاريخ</TableHead>
                            <TableHead className="text-right font-bold min-w-[100px]">إجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
