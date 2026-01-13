"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, Save, Globe, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { usePermissions } from "@/app/(dashboard)/_hooks/usePermissions";
import { useCurrentUser } from "@/app/(dashboard)/_hooks/useCurrentUser";
import { Permission } from "@/lib/permissions";
import { RichTextEditor } from "@/app/(dashboard)/products/_components/RichTextEditor";
import { LogoUpload } from "./LogoUpload";

interface OrganizationInfoFormProps {
    name: string;
    slug: string;
    commercialRegistration: string;
    description?: string;
    logo?: string;
    links?: {
        website?: string;
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
    onSave?: (data: {
        name: string;
        commercialRegistration: string;
        description?: string;
        logo?: string;
        links?: {
            website?: string;
            facebook?: string;
            twitter?: string;
            instagram?: string;
            linkedin?: string;
        };
    }) => void;
    isLoading?: boolean;
}

export function OrganizationInfoForm({
    name,
    slug,
    commercialRegistration,
    description = "",
    logo = "",
    links = {},
    onSave,
    isLoading,
}: OrganizationInfoFormProps) {
    const user = useCurrentUser();
    const isOwner = user.role === "owner";
    
    const [formName, setFormName] = useState(name);
    const [formCommercialRegistration, setFormCommercialRegistration] = useState(commercialRegistration);
    const [formDescription, setFormDescription] = useState(description);
    const [formLogo, setFormLogo] = useState(logo);
    const [formLinks, setFormLinks] = useState(links);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setFormName(name);
        setFormCommercialRegistration(commercialRegistration);
        setFormDescription(description);
        setFormLogo(logo);
        setFormLinks(links);
        setHasChanges(false);
    }, [name, commercialRegistration, description, logo, links]);

    const handleNameChange = (value: string) => {
        setFormName(value);
        checkForChanges(value, formCommercialRegistration, formDescription, formLogo, formLinks);
    };

    const handleCommercialRegistrationChange = (value: string) => {
        setFormCommercialRegistration(value);
        checkForChanges(formName, value, formDescription, formLogo, formLinks);
    };

    const handleDescriptionChange = (value: string) => {
        setFormDescription(value);
        checkForChanges(formName, formCommercialRegistration, value, formLogo, formLinks);
    };

    const handleLogoChange = (value: string) => {
        setFormLogo(value);
        checkForChanges(formName, formCommercialRegistration, formDescription, value, formLinks);
    };

    const handleLinkChange = (key: keyof typeof formLinks, value: string) => {
        const newLinks = { ...formLinks, [key]: value };
        setFormLinks(newLinks);
        checkForChanges(formName, formCommercialRegistration, formDescription, formLogo, newLinks);
    };

    const checkForChanges = (
        newName: string,
        newCommercialRegistration: string,
        newDescription: string,
        newLogo: string,
        newLinks: typeof links
    ) => {
        const changed =
            newName !== name ||
            newCommercialRegistration !== commercialRegistration ||
            newDescription !== description ||
            newLogo !== logo ||
            JSON.stringify(newLinks) !== JSON.stringify(links);
        setHasChanges(changed);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (hasChanges && onSave && isOwner) {
            onSave({
                name: formName,
                commercialRegistration: formCommercialRegistration,
                description: formDescription,
                logo: formLogo,
                links: formLinks,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 rounded-xl bg-[#242C5A] flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">{formName}</h2>
                        <p className="text-gray-500">{slug}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Logo Upload */}
                    <LogoUpload
                        logo={formLogo}
                        onLogoChange={handleLogoChange}
                        disabled={!isOwner}
                    />

                    {/* Basic Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">اسم المنشأة *</Label>
                            <Input
                                id="name"
                                value={formName}
                                className="rounded-xl"
                                onChange={(e) => handleNameChange(e.target.value)}
                                required
                                disabled={!isOwner}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="commercialRegistration">رقم السجل التجاري *</Label>
                            <Input
                                id="commercialRegistration"
                                value={formCommercialRegistration}
                                className="rounded-xl"
                                onChange={(e) => handleCommercialRegistrationChange(e.target.value)}
                                required
                                disabled={!isOwner}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>الوصف</Label>
                        <RichTextEditor
                            value={formDescription}
                            onChange={handleDescriptionChange}
                            placeholder="وصف المنشأة..."
                        />
                        <p className="text-xs text-gray-500">
                            {isOwner ? "يمكنك إضافة وصف مفصل عن منشأتك" : "الوصف الحالي"}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <Label>روابط التواصل</Label>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="website" className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    الموقع الإلكتروني
                                </Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={formLinks.website || ""}
                                    className="rounded-xl"
                                    onChange={(e) => handleLinkChange("website", e.target.value)}
                                    placeholder="https://example.com"
                                    disabled={!isOwner}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook" className="flex items-center gap-2">
                                    <Facebook className="h-4 w-4 text-blue-600" />
                                    فيسبوك
                                </Label>
                                <Input
                                    id="facebook"
                                    type="url"
                                    value={formLinks.facebook || ""}
                                    className="rounded-xl"
                                    onChange={(e) => handleLinkChange("facebook", e.target.value)}
                                    placeholder="https://facebook.com/..."
                                    disabled={!isOwner}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram" className="flex items-center gap-2">
                                    <Instagram className="h-4 w-4 text-pink-600" />
                                    إنستغرام
                                </Label>
                                <Input
                                    id="instagram"
                                    type="url"
                                    value={formLinks.instagram || ""}
                                    className="rounded-xl"
                                    onChange={(e) => handleLinkChange("instagram", e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    disabled={!isOwner}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter" className="flex items-center gap-2">
                                    <Twitter className="h-4 w-4 text-blue-400" />
                                    تويتر
                                </Label>
                                <Input
                                    id="twitter"
                                    type="url"
                                    value={formLinks.twitter || ""}
                                    className="rounded-xl"
                                    onChange={(e) => handleLinkChange("twitter", e.target.value)}
                                    placeholder="https://twitter.com/..."
                                    disabled={!isOwner}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin" className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-blue-700" />
                                    لينكد إن
                                </Label>
                                <Input
                                    id="linkedin"
                                    type="url"
                                    value={formLinks.linkedin || ""}
                                    className="rounded-xl"
                                    onChange={(e) => handleLinkChange("linkedin", e.target.value)}
                                    placeholder="https://linkedin.com/..."
                                    disabled={!isOwner}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {hasChanges && isOwner && (
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl"
                        >
                            <Save className="h-4 w-4 ml-2" />
                            {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
}
