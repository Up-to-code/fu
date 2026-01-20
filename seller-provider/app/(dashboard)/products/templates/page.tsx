"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CustomizationTemplatesPage() {
    const templates = useQuery(api.sellerCustomization.listCustomizationTemplates);
    const createTemplate = useMutation(api.sellerCustomization.createCustomizationTemplate);

    const [name, setName] = useState("");
    const [definitionJson, setDefinitionJson] = useState("{\"groups\":[],\"priceRules\":[]}");

    const handleCreate = async () => {
        try {
            if (!name.trim()) {
                toast.error("أدخل اسم القالب");
                return;
            }
            const definition = JSON.parse(definitionJson || "{}");
            await createTemplate({ name: name.trim(), definition });
            setName("");
            setDefinitionJson("{\"groups\":[],\"priceRules\":[]}");
            toast.success("تم إنشاء القالب");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل إنشاء القالب");
        }
    };

    if (templates === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/products">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-primary">قوالب التخصيص</h1>
                        <p className="text-gray-500">مجموعات خيارات وقواعد تسعير قابلة لإعادة الاستخدام</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h2 className="text-lg font-bold text-primary">إنشاء قالب</h2>
                <div className="space-y-2">
                    <Label>الاسم</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>التعريف (JSON)</Label>
                    <Textarea
                        value={definitionJson}
                        onChange={(e) => setDefinitionJson(e.target.value)}
                        className="font-mono text-xs"
                    />
                </div>
                <Button onClick={handleCreate} className="rounded-xl">
                    <Plus className="h-4 w-4 ml-2" />
                    إنشاء
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h2 className="text-lg font-bold text-primary">القوالب</h2>
                {templates.length === 0 ? (
                    <p className="text-sm text-gray-500">لا توجد قوالب بعد</p>
                ) : (
                    <div className="space-y-3">
                        {templates.map((t) => (
                            <div key={t._id} className="border border-gray-100 rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">{t.name}</Badge>
                                        <span className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <pre className="text-xs text-gray-500 whitespace-pre-wrap break-words">{JSON.stringify(t.definition)}</pre>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
