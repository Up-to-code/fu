import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { cookies } from "next/headers";
import { VerificationGate, type VerificationStatus } from "@/components/verification/VerificationGate";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const rawStatus = cookieStore.get("sp_verification_status")?.value;
    const verificationStatus: VerificationStatus =
        rawStatus === "pending" || rawStatus === "verified" || rawStatus === "rejected" ? rawStatus : "unverified";

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#0F172A] border-l border-white/5">
                <DashboardSidebar verificationStatus={verificationStatus} />
            </div>
            <main className="md:pr-72 h-full">
                <DashboardHeader verificationStatus={verificationStatus} />
                <div className="p-8 h-full bg-slate-50/50">
                    <VerificationGate verificationStatus={verificationStatus}>{children}</VerificationGate>
                </div>
            </main>
        </div>
    );
}
