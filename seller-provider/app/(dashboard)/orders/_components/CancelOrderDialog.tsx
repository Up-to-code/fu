"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface CancelOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (reason: string) => void;
    isLoading?: boolean;
    orderId?: string;
}

export function CancelOrderDialog({ open, onOpenChange, onSubmit, isLoading, orderId }: CancelOrderDialogProps) {
    const [reason, setReason] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (reason.trim()) {
            onSubmit(reason.trim());
            setReason("");
        }
    };

    const handleClose = (open: boolean) => {
        if (!open && !isLoading) {
            setReason("");
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>إلغاء الطلب</DialogTitle>
                    <DialogDescription>
                        {orderId && `الطلب ${orderId}`}
                        <br />
                        يرجى تحديد سبب إلغاء الطلب. لا يمكن التراجع عن هذا الإجراء.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="cancelReason">سبب الإلغاء *</Label>
                            <Textarea
                                id="cancelReason"
                                placeholder="مثال: العميل طلب الإلغاء، عدم توفر المنتج، خطأ في الطلب..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                                className="rounded-xl min-h-[100px]"
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleClose(false)}
                            disabled={isLoading}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !reason.trim()}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoading ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
