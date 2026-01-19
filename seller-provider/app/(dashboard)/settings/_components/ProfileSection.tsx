"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileSectionProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    initials: string;
    onFirstNameChange?: (value: string) => void;
    onLastNameChange?: (value: string) => void;
    onEmailChange?: (value: string) => void;
    onPhoneChange?: (value: string) => void;
}

export function ProfileSection({
    firstName,
    lastName,
    email,
    phone,
    initials,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPhoneChange,
}: ProfileSectionProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#242C5A] mb-6">الملف الشخصي</h2>
            <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-[#242C5A] text-white text-xl font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute -bottom-1 -left-1 h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
                        <Camera className="h-4 w-4 text-gray-600" />
                    </Button>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{firstName} {lastName}</h3>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>الاسم الأول</Label>
                    <Input
                        defaultValue={firstName}
                        className="rounded-xl"
                        onChange={(e) => onFirstNameChange?.(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>اسم العائلة</Label>
                    <Input
                        defaultValue={lastName}
                        className="rounded-xl"
                        onChange={(e) => onLastNameChange?.(e.target.value)}
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input
                        defaultValue={email}
                        className="rounded-xl"
                        onChange={(e) => onEmailChange?.(e.target.value)}
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>رقم الجوال</Label>
                    <Input
                        defaultValue={phone}
                        className="rounded-xl"
                        onChange={(e) => onPhoneChange?.(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
