"use client";

interface Product {
    name: string;
    sales: number;
    revenue: number;
}

interface TopProductsListProps {
    products: Product[];
}

export function TopProductsList({ products }: TopProductsListProps) {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-10">
            <h3 className="text-2xl font-black text-[#242C5A] mb-6">أفضل المنتجات مبيعاً</h3>
            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-gray-300 w-6">{index + 1}</span>
                            <span className="font-bold text-gray-900">{product.name}</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <span className="text-gray-500">{product.sales} مبيعة</span>
                            <span className="font-bold text-[#242C5A]">{product.revenue.toLocaleString()} ر.س</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
