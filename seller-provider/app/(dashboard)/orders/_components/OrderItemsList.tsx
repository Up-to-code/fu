import Link from "next/link";
import Image from "next/image";
import { type OrderItem } from "@/data/orders";

interface OrderItemsListProps {
    items: OrderItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#242C5A]">المنتجات</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={`/products/${item.productId}`}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                    >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                                src={item.productImage}
                                alt={item.productName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-[#242C5A] truncate">
                                {item.productName}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span>الكمية: {item.quantity}</span>
                                <span>السعر: {item.unitPrice.toLocaleString()} ر.س</span>
                            </div>
                        </div>
                        <div className="text-left flex-shrink-0">
                            <p className="font-bold text-[#242C5A]">
                                {item.totalPrice.toLocaleString()} ر.س
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">المجموع الفرعي</span>
                    <span className="font-bold text-lg text-[#242C5A]">
                        {subtotal.toLocaleString()} ر.س
                    </span>
                </div>
            </div>
        </div>
    );
}
