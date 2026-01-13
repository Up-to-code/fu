"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Trash2 } from "lucide-react";

export type OptionValue = { value: string; media?: { id: string; url: string; type: string }[] };
export type Option = { id: string; name: string; values: OptionValue[] };

interface ProductOptionsProps {
    options: Option[];
    onOptionsChange: (options: Option[]) => void;
}

export function ProductOptions({ options, onOptionsChange }: ProductOptionsProps) {
    const [newOptionName, setNewOptionName] = useState("");
    const [newOptionValue, setNewOptionValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const addOption = () => {
        if (newOptionName.trim()) {
            onOptionsChange([...options, { id: Date.now().toString(), name: newOptionName.trim(), values: [] }]);
            setNewOptionName("");
        }
    };

    const addOptionValue = (optionId: string) => {
        if (newOptionValue.trim()) {
            onOptionsChange(options.map(opt =>
                opt.id === optionId
                    ? { ...opt, values: [...opt.values, { value: newOptionValue.trim(), media: [] }] }
                    : opt
            ));
            setNewOptionValue("");
            setSelectedOption("");
        }
    };

    const removeOptionValue = (optionId: string, value: string) => {
        onOptionsChange(options.map(opt =>
            opt.id === optionId
                ? { ...opt, values: opt.values.filter(v => v.value !== value) }
                : opt
        ));
    };

    const removeOption = (optionId: string) => {
        onOptionsChange(options.filter(opt => opt.id !== optionId));
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-lg font-bold text-[#242C5A]">الخيارات</h2>
            <div className="space-y-4">
                {options.map((option) => (
                    <div key={option.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-gray-900">{option.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-400 hover:text-red-500"
                                onClick={() => removeOption(option.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {option.values.map((val) => (
                                <Badge
                                    key={val.value}
                                    variant="secondary"
                                    className="pl-2 pr-1 py-1 bg-white border border-gray-200 text-gray-700 font-normal rounded-lg"
                                >
                                    {val.value}
                                    <button
                                        onClick={() => removeOptionValue(option.id, val.value)}
                                        className="ml-1.5 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {selectedOption === option.id ? (
                                <div className="flex items-center gap-1">
                                    <Input
                                        placeholder="قيمة جديدة"
                                        className="h-7 w-24 text-sm rounded-lg"
                                        value={newOptionValue}
                                        onChange={(e) => setNewOptionValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addOptionValue(option.id)}
                                        autoFocus
                                    />
                                    <Button size="sm" className="h-7 px-2 rounded-lg" onClick={() => addOptionValue(option.id)}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSelectedOption(option.id)}
                                    className="h-7 px-3 text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg hover:border-[#242C5A]"
                                >
                                    + إضافة
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <Input
                    placeholder="خيار جديد (مثال: الخامة)"
                    className="rounded-xl"
                    value={newOptionName}
                    onChange={(e) => setNewOptionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addOption()}
                />
                <Button onClick={addOption} variant="outline" className="rounded-xl shrink-0">
                    <Plus className="h-4 w-4 ml-2" />إضافة
                </Button>
            </div>
        </div>
    );
}
