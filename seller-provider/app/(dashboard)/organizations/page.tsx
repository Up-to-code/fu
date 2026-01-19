"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Plus, Search, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";

const OrgSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب").max(100, "الاسم طويل جداً"),
  slug: z.string().max(80, "المعرف طويل جداً").optional().or(z.literal("")),
  commercialRegistration: z.string().max(50, "السجل التجاري طويل جداً").optional().or(z.literal("")),
  website: z.string().max(200, "الرابط طويل جداً").optional().or(z.literal("")),
  description: z.string().max(500, "الوصف طويل جداً").optional().or(z.literal("")),
});

type OrgFormValues = z.infer<typeof OrgSchema>;

type OrgRow = {
  _id: string;
  name: string;
  slug: string;
  commercialRegistration?: string;
  website?: string;
  description?: string;
  updatedAt: number;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.organizations.listOrganizations,
    { search: debouncedSearch || undefined },
    { initialNumItems: 30 }
  );

  const createOrganization = useMutation(api.organizations.createOrganization);
  const updateOrganization = useMutation(api.organizations.updateOrganization);
  const deleteOrganization = useMutation(api.organizations.deleteOrganization);

  const organizations = useMemo(() => results as unknown as OrgRow[], [results]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrgRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(OrgSchema),
    defaultValues: {
      name: "",
      slug: "",
      commercialRegistration: "",
      website: "",
      description: "",
    },
  });

  const openCreate = () => {
    setSelectedOrg(null);
    form.reset({
      name: "",
      slug: "",
      commercialRegistration: "",
      website: "",
      description: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (org: OrgRow) => {
    setSelectedOrg(org);
    form.reset({
      name: org.name || "",
      slug: org.slug || "",
      commercialRegistration: org.commercialRegistration || "",
      website: org.website || "",
      description: org.description || "",
    });
    setDialogOpen(true);
  };

  const openDelete = (org: OrgRow) => {
    setSelectedOrg(org);
    setDeleteDialogOpen(true);
  };

  const onSubmit = async (values: OrgFormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedOrg) {
        await updateOrganization({
          organizationId: selectedOrg._id as any,
          expectedUpdatedAt: selectedOrg.updatedAt,
          name: values.name,
          slug: values.slug || undefined,
          commercialRegistration: values.commercialRegistration || undefined,
          website: values.website || undefined,
          description: values.description || undefined,
        });
        toast.success("تم تحديث المنشأة");
      } else {
        await createOrganization({
          name: values.name,
          slug: values.slug || undefined,
          commercialRegistration: values.commercialRegistration || undefined,
          website: values.website || undefined,
          description: values.description || undefined,
        });
        toast.success("تم إنشاء المنشأة");
      }
      setDialogOpen(false);
      setSelectedOrg(null);
    } catch (e: any) {
      toast.error("فشل حفظ البيانات", { description: e?.message || "حدث خطأ غير متوقع" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedOrg) return;
    setIsSubmitting(true);
    try {
      await deleteOrganization({ organizationId: selectedOrg._id as any });
      toast.success("تم حذف المنشأة");
      setDeleteDialogOpen(false);
      setSelectedOrg(null);
    } catch (e: any) {
      toast.error("فشل الحذف", { description: e?.message || "حدث خطأ غير متوقع" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PermissionGuard
      permission={Permission.VIEW_ORGANIZATIONS}
      fallback={
        <div className="max-w-4xl mx-auto py-16 text-center" dir="rtl">
          <h1 className="text-2xl font-black text-[#242C5A]">غير مصرح</h1>
          <p className="text-gray-500 mt-2">لا تملك صلاحية الوصول إلى إدارة المنشآت.</p>
        </div>
      }
    >
      <div className="space-y-8 max-w-7xl mx-auto" dir="rtl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#242C5A]">إدارة المنشآت</h1>
            <p className="text-gray-500">إنشاء وتعديل وحذف المنشآت • {organizations.length} نتيجة</p>
          </div>
          <PermissionGuard permission={Permission.CREATE_ORGANIZATIONS}>
            <Button onClick={openCreate} className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
              <Plus className="h-4 w-4 ml-2" />
              إضافة منشأة
            </Button>
          </PermissionGuard>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث في المنشآت..."
              className="pr-10 rounded-xl bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">المعرف</TableHead>
                <TableHead className="text-right">السجل التجاري</TableHead>
                <TableHead className="text-right">الرابط</TableHead>
                <TableHead className="text-right w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              ) : (
                organizations.map((org) => (
                  <TableRow key={org._id}>
                    <TableCell className="text-right font-bold text-gray-900">{org.name}</TableCell>
                    <TableCell className="text-right text-gray-600">{org.slug}</TableCell>
                    <TableCell className="text-right text-gray-600">{org.commercialRegistration || "—"}</TableCell>
                    <TableCell className="text-right text-gray-600">{org.website || "—"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <PermissionGuard permission={Permission.EDIT_ORGANIZATIONS}>
                            <DropdownMenuItem onClick={() => openEdit(org)}>
                              <Edit className="h-4 w-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                          </PermissionGuard>
                          <PermissionGuard permission={Permission.DELETE_ORGANIZATIONS}>
                            <DropdownMenuItem className="text-red-600" onClick={() => openDelete(org)}>
                              <Trash2 className="h-4 w-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </PermissionGuard>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-6">
            {status === "CanLoadMore" ? (
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => loadMore(30)}
                disabled={isLoading}
              >
                {isLoading ? "جاري التحميل..." : "تحميل المزيد"}
              </Button>
            ) : (
              <div className="text-sm text-gray-400">{organizations.length > 0 ? "تم عرض كل النتائج" : ""}</div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {selectedOrg ? "تعديل منشأة" : "إضافة منشأة"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-right">الاسم</Label>
                <Input className="rounded-xl bg-white" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-red-600 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-right">المعرف</Label>
                <Input className="rounded-xl bg-white" {...form.register("slug")} />
                {form.formState.errors.slug && (
                  <p className="text-red-600 text-sm">{form.formState.errors.slug.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-right">السجل التجاري</Label>
                <Input className="rounded-xl bg-white" {...form.register("commercialRegistration")} />
                {form.formState.errors.commercialRegistration && (
                  <p className="text-red-600 text-sm">{form.formState.errors.commercialRegistration.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-right">الموقع الإلكتروني</Label>
                <Input className="rounded-xl bg-white" {...form.register("website")} />
                {form.formState.errors.website && (
                  <p className="text-red-600 text-sm">{form.formState.errors.website.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-right">الوصف</Label>
              <Textarea {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-red-600 text-sm">{form.formState.errors.description.message}</p>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => setDialogOpen(false)}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">حذف المنشأة</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              {selectedOrg ? (
                <>
                  هل أنت متأكد من حذف <strong>{selectedOrg.name}</strong>؟
                  <br />
                  لا يمكن التراجع عن هذا الإجراء.
                </>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel disabled={isSubmitting}>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "جاري الحذف..." : "تأكيد الحذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PermissionGuard>
  );
}

