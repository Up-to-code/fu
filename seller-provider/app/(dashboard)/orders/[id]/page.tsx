"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, CheckCircle, Package, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useOrder, useOrderActions } from "../_hooks";
import { getOrderStatusById } from "@/data";
import { OrderItemsList, ShippingDialog, CancelOrderDialog } from "../_components";
import { toast } from "sonner";

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;
    const order = useOrder(orderId);
    const { updateSellerOrder } = useOrderActions();
    const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!order) {
        return (
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                <div className="text-center py-12">
                    <p className="text-gray-500">الطلب غير موجود</p>
                    <Link href="/orders">
                        <Button variant="outline" className="mt-4">
                            العودة إلى الطلبات
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const statusInfo = getOrderStatusById(order.status);
    const canAccept = order.status === "pending";
    const canShip = order.status === "processing";
    const canComplete = order.status === "shipping";
    const canCancel = order.status === "pending" || order.status === "processing";

    const handleAcceptOrder = async () => {
        setIsSubmitting(true);
        try {
            await updateSellerOrder({ orderNumber: orderId, status: "processing" });
            toast.success("تم قبول الطلب");
        } catch (error) {
            console.error("Error accepting order:", error);
            toast.error("فشل قبول الطلب");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShippingSubmit = async (data: {
        shippingCompany: string;
        trackingNumber: string;
        notes?: string;
    }) => {
        setIsSubmitting(true);
        try {
            await updateSellerOrder({
                orderNumber: orderId,
                status: "shipping",
                shippingCompany: data.shippingCompany,
                trackingNumber: data.trackingNumber,
                shippingNotes: data.notes,
            });
            setShippingDialogOpen(false);
            toast.success("تم تحديث الشحن");
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("فشل تحديث الشحن");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteOrder = async () => {
        setIsSubmitting(true);
        try {
            await updateSellerOrder({ orderNumber: orderId, status: "completed" });
            toast.success("تم إكمال الطلب");
        } catch (error) {
            console.error("Error completing order:", error);
            toast.error("فشل إكمال الطلب");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelOrder = async (reason: string) => {
        setIsSubmitting(true);
        try {
            await updateSellerOrder({
                orderNumber: orderId,
                status: "cancelled",
                cancellationReason: reason,
            });
            setCancelDialogOpen(false);
            router.push("/orders");
            toast.success("تم إلغاء الطلب");
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error("فشل إلغاء الطلب");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/orders">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-[#242C5A]">الطلب {order.id}</h1>
                            <p className="text-gray-500">{order.customer}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>
                            {statusInfo.name}
                        </Badge>
                        {canAccept && (
                            <Button
                                onClick={handleAcceptOrder}
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                            >
                                <CheckCircle className="h-4 w-4 ml-2" />
                                قبول الطلب
                            </Button>
                        )}
                        {canShip && (
                            <Button
                                onClick={() => setShippingDialogOpen(true)}
                                className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl"
                            >
                                <Truck className="h-4 w-4 ml-2" />
                                إرسال للشحن
                            </Button>
                        )}
                        {canComplete && (
                            <Button
                                onClick={handleCompleteOrder}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 rounded-xl"
                            >
                                <Package className="h-4 w-4 ml-2" />
                                تم الاستلام
                            </Button>
                        )}
                        {canCancel && (
                            <Button
                                onClick={() => setCancelDialogOpen(true)}
                                disabled={isSubmitting}
                                variant="destructive"
                                className="rounded-xl"
                            >
                                <XCircle className="h-4 w-4 ml-2" />
                                إلغاء الطلب
                            </Button>
                        )}
                    </div>
                </div>

                {/* Order Details */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-[#242C5A] mb-4">معلومات العميل</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">الاسم</p>
                                <p className="font-medium">{order.customer}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                                <p className="font-medium">{order.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">الهاتف</p>
                                <p className="font-medium">{order.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">العنوان</p>
                                <p className="font-medium">
                                    {order.address.street}, {order.address.district}, {order.address.city} {order.address.postalCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-[#242C5A] mb-4">ملخص الطلب</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">عدد المنتجات</span>
                                <span className="font-medium">{order.items.length} منتج</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">المجموع الفرعي</span>
                                <span className="font-medium">{order.subtotal.toLocaleString()} ر.س</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">الشحن</span>
                                <span className="font-medium">{order.shipping.toLocaleString()} ر.س</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between">
                                <span className="font-bold text-[#242C5A]">المجموع الكلي</span>
                                <span className="font-bold text-lg text-[#242C5A]">{order.total.toLocaleString()} ر.س</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-gray-500">طريقة الدفع</span>
                                <span className="font-medium">{order.paymentMethod === "card" ? "بطاقة" : "نقدي"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">التاريخ</span>
                                <span className="font-medium">{new Date(order.date).toLocaleDateString('ar-SA')}</span>
                            </div>
                            {/* Shipping Info */}
                            {order.shippingCompany && (
                                <div className="border-t border-gray-100 pt-3 mt-3">
                                    <p className="text-sm font-bold text-[#242C5A] mb-2">معلومات الشحن</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">شركة الشحن</span>
                                            <span className="font-medium">{order.shippingCompany}</span>
                                        </div>
                                        {order.trackingNumber && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">رقم التتبع</span>
                                                <span className="font-medium font-mono">{order.trackingNumber}</span>
                                            </div>
                                        )}
                                        {order.shippingNotes && (
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">ملاحظات</p>
                                                <p className="text-sm font-medium">{order.shippingNotes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Cancellation Reason */}
                            {order.cancellationReason && (
                                <div className="border-t border-gray-100 pt-3 mt-3">
                                    <p className="text-sm font-bold text-red-600 mb-2">سبب الإلغاء</p>
                                    <p className="text-sm text-gray-600">{order.cancellationReason}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <OrderItemsList items={order.items} />
                </div>
            </div>

            <ShippingDialog
                open={shippingDialogOpen}
                onOpenChange={setShippingDialogOpen}
                onSubmit={handleShippingSubmit}
                isLoading={isSubmitting}
            />

            <CancelOrderDialog
                open={cancelDialogOpen}
                onOpenChange={setCancelDialogOpen}
                onSubmit={handleCancelOrder}
                isLoading={isSubmitting}
                orderId={order.id}
            />
        </>
    );
}
