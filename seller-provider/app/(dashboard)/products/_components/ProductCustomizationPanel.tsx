"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type GroupType = "size" | "color" | "material" | "custom";

export function ProductCustomizationPanel(props: {
    productId?: string;
    defaultTab?: "options" | "pricing" | "templates" | "preview" | "overrides";
}) {
    if (!props.productId) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-2" dir="rtl">
                <h2 className="text-lg font-bold text-primary">التخصيص المتقدم</h2>
                <p className="text-sm text-gray-500">احفظ المنتج أولاً لتفعيل خيارات التخصيص والتسعير والمتغيرات المتقدمة.</p>
            </div>
        );
    }

    return <ProductCustomizationPanelInner productId={props.productId} defaultTab={props.defaultTab} />;
}

function ProductCustomizationPanelInner(props: { productId: string; defaultTab?: string }) {
    const customization = useQuery(api.sellerCustomization.getProductCustomization, {
        productId: props.productId as Id<"sellerProducts">,
    });

    const createOptionGroup = useMutation(api.sellerCustomization.createOptionGroup);
    const updateOptionGroup = useMutation(api.sellerCustomization.updateOptionGroup);
    const createOptionValue = useMutation(api.sellerCustomization.createOptionValue);
    const updateOptionValue = useMutation(api.sellerCustomization.updateOptionValue);
    const createPriceRule = useMutation(api.sellerCustomization.createPriceRule);
    const updatePriceRule = useMutation(api.sellerCustomization.updatePriceRule);
    const listTemplates = useQuery(api.sellerCustomization.listCustomizationTemplates);
    const applyTemplate = useMutation(api.sellerCustomization.applyCustomizationTemplateToProduct);
    const upsertVariant = useMutation(api.sellerCustomization.upsertSellerProductVariant);

    const [newGroup, setNewGroup] = useState({
        key: "",
        name: "",
        type: "size" as GroupType,
        isRequired: false,
    });
    const [valueDrafts, setValueDrafts] = useState<Record<string, { valueKey: string; label: string; hex: string }>>({});
    const [newRule, setNewRule] = useState({
        ruleType: "valueAdjustment" as "valueAdjustment" | "valueMultiplier" | "pairOverride" | "comboOverride",
        priority: 0,
        amount: "",
        multiplier: "",
        appliesToJson: "{}",
    });
    const [templateToApply, setTemplateToApply] = useState<string>("");
    const [variantDrafts, setVariantDrafts] = useState<Record<string, { price: string; stock: string; sku: string }>>({});

    const optionGroups = customization?.optionGroups ?? [];
    const optionValues = customization?.optionValues ?? [];
    const priceRules = customization?.priceRules ?? [];
    const variants = customization?.variants ?? [];

    const valuesByGroupId = useMemo(() => {
        const map = new Map<string, typeof optionValues>();
        for (const v of optionValues) {
            const k = v.groupId;
            const list = map.get(k) ?? [];
            list.push(v);
            map.set(k, list);
        }
        return map;
    }, [optionValues]);

    const handleCreateGroup = async () => {
        try {
            if (!newGroup.key.trim() || !newGroup.name.trim()) {
                toast.error("أدخل اسم وخانة المفتاح");
                return;
            }
            await createOptionGroup({
                productId: props.productId as Id<"sellerProducts">,
                key: newGroup.key.trim(),
                name: newGroup.name.trim(),
                type: newGroup.type,
                position: optionGroups.length,
                isRequired: newGroup.isRequired,
            });
            setNewGroup({ key: "", name: "", type: "size", isRequired: false });
            toast.success("تمت إضافة الخيار");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل إضافة الخيار");
        }
    };

    const handleAddValue = async (groupId: string) => {
        const draft = valueDrafts[groupId] ?? { valueKey: "", label: "", hex: "" };
        try {
            if (!draft.valueKey.trim() || !draft.label.trim()) {
                toast.error("أدخل قيمة واسم");
                return;
            }
            await createOptionValue({
                groupId: groupId as Id<"sellerProductOptionGroups">,
                valueKey: draft.valueKey.trim(),
                label: draft.label.trim(),
                position: (valuesByGroupId.get(groupId) ?? []).length,
                hex: draft.hex.trim() || undefined,
            });
            setValueDrafts((p) => ({ ...p, [groupId]: { valueKey: "", label: "", hex: "" } }));
            toast.success("تمت إضافة القيمة");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل إضافة القيمة");
        }
    };

    const handleCreateRule = async () => {
        try {
            const appliesTo = JSON.parse(newRule.appliesToJson || "{}");
            await createPriceRule({
                productId: props.productId as Id<"sellerProducts">,
                ruleType: newRule.ruleType,
                priority: Number(newRule.priority) || 0,
                amount: newRule.amount !== "" ? Number(newRule.amount) : undefined,
                multiplier: newRule.multiplier !== "" ? Number(newRule.multiplier) : undefined,
                appliesTo,
            });
            setNewRule({ ruleType: "valueAdjustment", priority: 0, amount: "", multiplier: "", appliesToJson: "{}" });
            toast.success("تمت إضافة قاعدة التسعير");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل إضافة القاعدة");
        }
    };

    const handleApplyTemplate = async () => {
        try {
            if (!templateToApply) return;
            await applyTemplate({
                productId: props.productId as Id<"sellerProducts">,
                templateId: templateToApply as Id<"sellerCustomizationTemplates">,
            });
            setTemplateToApply("");
            toast.success("تم تطبيق القالب");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل تطبيق القالب");
        }
    };

    const handleSaveOverride = async (variant: any) => {
        const draft = variantDrafts[variant._id] ?? {
            price: String(variant.price ?? 0),
            stock: String(variant.stock ?? 0),
            sku: variant.sku ?? "",
        };
        try {
            await upsertVariant({
                productId: props.productId as Id<"sellerProducts">,
                combination: variant.combination,
                price: Number(draft.price) || 0,
                stock: Number(draft.stock) || 0,
                sku: draft.sku || undefined,
                image: variant.image,
                images: variant.images,
                isActive: variant.isActive ?? true,
                parentVariantId: variant.parentVariantId,
                isDefault: variant.isDefault,
            });
            toast.success("تم حفظ المتغير");
        } catch (e: any) {
            toast.error(e?.message ?? "فشل حفظ المتغير");
        }
    };

    if (customization === undefined) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" dir="rtl">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                </div>
                <Skeleton className="h-56 rounded-2xl" />
                <div className="hidden">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" dir="rtl">
            <div className="space-y-1">
                <h2 className="text-lg font-bold text-primary">التخصيص المتقدم</h2>
                <p className="text-sm text-gray-500">الخيارات، التسعير، القوالب، والمعاينة والمتغيرات المتقدمة</p>
            </div>

            <Tabs defaultValue={props.defaultTab ?? "options"} className="gap-6">
                <TabsList className="w-full justify-between">
                    <TabsTrigger value="options">الخيارات</TabsTrigger>
                    <TabsTrigger value="pricing">التسعير</TabsTrigger>
                    <TabsTrigger value="templates">القوالب</TabsTrigger>
                    <TabsTrigger value="preview">المعاينة</TabsTrigger>
                    <TabsTrigger value="overrides">متغيرات متقدمة</TabsTrigger>
                </TabsList>

                <TabsContent value="options" className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="md:col-span-1">
                                <Label>مفتاح</Label>
                                <Input value={newGroup.key} onChange={(e) => setNewGroup((p) => ({ ...p, key: e.target.value }))} />
                            </div>
                            <div className="md:col-span-1">
                                <Label>الاسم</Label>
                                <Input value={newGroup.name} onChange={(e) => setNewGroup((p) => ({ ...p, name: e.target.value }))} />
                            </div>
                            <div className="md:col-span-1">
                                <Label>النوع</Label>
                                <Select value={newGroup.type} onValueChange={(val) => setNewGroup((p) => ({ ...p, type: val as GroupType }))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="size">مقاس</SelectItem>
                                        <SelectItem value="color">لون</SelectItem>
                                        <SelectItem value="material">خامة</SelectItem>
                                        <SelectItem value="custom">مخصص</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <Button type="button" onClick={handleCreateGroup} className="rounded-xl w-full">
                                    <Plus className="h-4 w-4 ml-2" />
                                    إضافة
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {optionGroups.map((g) => {
                                const draft = valueDrafts[g._id] ?? { valueKey: "", label: "", hex: "" };
                                const values = valuesByGroupId.get(g._id) ?? [];
                                return (
                                    <div key={g._id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant={g.isActive ? "default" : "outline"}>{g.key}</Badge>
                                                <span className="font-semibold text-primary">{g.name}</span>
                                                <span className="text-xs text-gray-400">{g.type}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() => updateOptionGroup({ groupId: g._id, isActive: !g.isActive })}
                                            >
                                                {g.isActive ? "تعطيل" : "تفعيل"}
                                            </Button>
                                        </div>

                                        <div className="grid gap-3 md:grid-cols-4">
                                            <div>
                                                <Label>valueKey</Label>
                                                <Input
                                                    value={draft.valueKey}
                                                    onChange={(e) =>
                                                        setValueDrafts((p) => ({ ...p, [g._id]: { ...draft, valueKey: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>الاسم</Label>
                                                <Input
                                                    value={draft.label}
                                                    onChange={(e) =>
                                                        setValueDrafts((p) => ({ ...p, [g._id]: { ...draft, label: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>HEX (للألوان)</Label>
                                                <Input
                                                    value={draft.hex}
                                                    onChange={(e) =>
                                                        setValueDrafts((p) => ({ ...p, [g._id]: { ...draft, hex: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button type="button" onClick={() => handleAddValue(g._id)} className="rounded-xl w-full">
                                                    إضافة قيمة
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {values.map((v) => (
                                                <button
                                                    key={v._id}
                                                    onClick={() => updateOptionValue({ valueId: v._id, isActive: !v.isActive })}
                                                    className="text-right"
                                                    type="button"
                                                >
                                                    <Badge variant={v.isActive ? "outline" : "secondary"} className="cursor-pointer">
                                                        {v.label}
                                                        {v.hex ? <span className="mr-2 text-xs text-gray-400">{v.hex}</span> : null}
                                                    </Badge>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <Label>النوع</Label>
                                <Select value={newRule.ruleType} onValueChange={(val) => setNewRule((p) => ({ ...p, ruleType: val as any }))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="valueAdjustment">زيادة/نقصان</SelectItem>
                                        <SelectItem value="valueMultiplier">مضاعف</SelectItem>
                                        <SelectItem value="pairOverride">سعر ثابت (زوج)</SelectItem>
                                        <SelectItem value="comboOverride">سعر ثابت (تركيبة)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>الأولوية</Label>
                                <Input
                                    type="number"
                                    value={newRule.priority}
                                    onChange={(e) => setNewRule((p) => ({ ...p, priority: Number(e.target.value) }))}
                                />
                            </div>
                            <div>
                                <Label>Amount</Label>
                                <Input value={newRule.amount} onChange={(e) => setNewRule((p) => ({ ...p, amount: e.target.value }))} />
                            </div>
                            <div>
                                <Label>Multiplier</Label>
                                <Input
                                    value={newRule.multiplier}
                                    onChange={(e) => setNewRule((p) => ({ ...p, multiplier: e.target.value }))}
                                />
                            </div>
                            <div className="md:col-span-4">
                                <Label>appliesTo (JSON)</Label>
                                <Textarea
                                    value={newRule.appliesToJson}
                                    onChange={(e) => setNewRule((p) => ({ ...p, appliesToJson: e.target.value }))}
                                    className="font-mono text-xs"
                                />
                            </div>
                            <div className="md:col-span-4">
                                <Button type="button" onClick={handleCreateRule} className="rounded-xl">
                                    <Plus className="h-4 w-4 ml-2" />
                                    إضافة قاعدة
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {priceRules.map((r) => (
                                <div key={r._id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex gap-2 flex-wrap items-center">
                                            <Badge variant="outline">{r.ruleType}</Badge>
                                            <span className="text-xs text-gray-400">priority: {r.priority}</span>
                                            {typeof r.amount === "number" ? <span className="text-xs text-gray-400">amount: {r.amount}</span> : null}
                                            {typeof r.multiplier === "number" ? (
                                                <span className="text-xs text-gray-400">multiplier: {r.multiplier}</span>
                                            ) : null}
                                        </div>
                                        <pre className="text-xs text-gray-500 whitespace-pre-wrap break-words">{JSON.stringify(r.appliesTo)}</pre>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-xl"
                                        onClick={() => updatePriceRule({ ruleId: r._id, isActive: !r.isActive })}
                                    >
                                        {r.isActive ? "تعطيل" : "تفعيل"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="templates" className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>تطبيق قالب</Label>
                            <Select value={templateToApply} onValueChange={(val) => setTemplateToApply(val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر قالب" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(listTemplates ?? []).map((t) => (
                                        <SelectItem key={t._id} value={t._id}>
                                            {t.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="button" onClick={handleApplyTemplate} disabled={!templateToApply} className="rounded-xl w-full">
                            تطبيق
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                    <PreviewResolver productId={props.productId as Id<"sellerProducts">} optionGroups={optionGroups} optionValues={optionValues} />
                </TabsContent>

                <TabsContent value="overrides" className="space-y-6">
                    {variants.length === 0 ? (
                        <p className="text-sm text-gray-500">لا توجد متغيرات محفوظة (يمكن الاعتماد على قواعد التسعير فقط)</p>
                    ) : (
                        <div className="space-y-4">
                            {variants.map((v: any) => {
                                const draft = variantDrafts[v._id] ?? {
                                    price: String(v.price ?? 0),
                                    stock: String(v.stock ?? 0),
                                    sku: v.sku ?? "",
                                };
                                return (
                                    <div key={v._id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {Object.entries(v.combination ?? {}).map(([k, val]) => (
                                                    <Badge key={k} variant="outline" className="text-xs">
                                                        <span className="text-gray-400 ml-1">{k}:</span>
                                                        {String(val)}
                                                    </Badge>
                                                ))}
                                                {!v.isActive ? <Badge variant="secondary">غير نشط</Badge> : null}
                                            </div>
                                            <Button type="button" onClick={() => handleSaveOverride(v)} className="rounded-xl">
                                                <Save className="h-4 w-4 ml-2" />
                                                حفظ
                                            </Button>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label>السعر</Label>
                                                <Input
                                                    value={draft.price}
                                                    onChange={(e) =>
                                                        setVariantDrafts((p) => ({ ...p, [v._id]: { ...draft, price: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>المخزون</Label>
                                                <Input
                                                    value={draft.stock}
                                                    onChange={(e) =>
                                                        setVariantDrafts((p) => ({ ...p, [v._id]: { ...draft, stock: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>SKU</Label>
                                                <Input
                                                    value={draft.sku}
                                                    onChange={(e) =>
                                                        setVariantDrafts((p) => ({ ...p, [v._id]: { ...draft, sku: e.target.value } }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function PreviewResolver(props: {
    productId: Id<"sellerProducts">;
    optionGroups: any[];
    optionValues: any[];
}) {
    const [selection, setSelection] = useState<Record<string, string>>({});
    const activeGroups = props.optionGroups.filter((g) => g.isActive);

    const valuesByGroupKey = useMemo(() => {
        const map = new Map<string, Array<{ valueKey: string; label: string }>>();
        for (const g of activeGroups) map.set(g.key, []);
        for (const v of props.optionValues) {
            if (!v.isActive) continue;
            const g = props.optionGroups.find((gg) => gg._id === v.groupId);
            if (!g || !g.isActive) continue;
            const list = map.get(g.key) ?? [];
            list.push({ valueKey: v.valueKey, label: v.label });
            map.set(g.key, list);
        }
        return map;
    }, [props.optionGroups, props.optionValues, activeGroups]);

    const resolved = useQuery(api.sellerCustomization.resolveSellerVariantCached, {
        productId: props.productId,
        selectedOptions: selection,
    });

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {activeGroups.map((g) => (
                    <div key={g._id} className="space-y-2">
                        <Label>{g.name}</Label>
                        <Select value={selection[g.key] ?? ""} onValueChange={(val) => setSelection((p) => ({ ...p, [g.key]: val }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="اختر" />
                            </SelectTrigger>
                            <SelectContent>
                                {(valuesByGroupKey.get(g.key) ?? []).map((v) => (
                                    <SelectItem key={v.valueKey} value={v.valueKey}>
                                        {v.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>

            {resolved === undefined ? (
                <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    تحميل...
                </div>
            ) : (
                <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">السعر النهائي</span>
                        <span className="font-bold text-primary">{resolved.price?.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">السعر المحسوب</span>
                        <span className="text-sm">{resolved.computedPrice?.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">المخزون</span>
                        <span className="text-sm">{resolved.stock}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {(resolved.priceBreakdown ?? []).map((b: any, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                                {b.type}:{b.label}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
