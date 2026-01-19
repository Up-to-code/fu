"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ShippingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: {
        shippingCompany: string;
        trackingNumber: string;
        notes?: string;
    }) => void;
    isLoading?: boolean;
}

export function ShippingDialog({ open, onOpenChange, onSubmit, isLoading }: ShippingDialogProps) {
    const [shippingCompany, setShippingCompany] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            shippingCompany,
            trackingNumber,
            notes: notes.trim() || undefined,
        });
        // Reset form
        setShippingCompany("");
        setTrackingNumber("");
        setNotes("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>إرسال الطلب لشركة الشحن</DialogTitle>
                    <DialogDescription>
                        أدخل تفاصيل شركة الشحن لتحديث حالة الطلب
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="shippingCompany">اسم شركة الشحن</Label>
                            <Input
                                id="shippingCompany"
                                placeholder="مثال: أرامكس، DHL، سمسا"
                                value={shippingCompany}
                                onChange={(e) => setShippingCompany(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trackingNumber">رقم التتبع</Label>
                            <Input
                                id="trackingNumber"
                                placeholder="أدخل رقم التتبع"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                            <Textarea
                                id="notes"
                                placeholder="أضف أي ملاحظات إضافية..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="rounded-xl min-h-[100px]"
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#242C5A] hover:bg-[#1a2144]">
                            {isLoading ? "جاري الحفظ..." : "تأكيد الإرسال"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
