import DashboardLayout from "@/components/layout/DashboardLayout";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { AuthGuard } from "./_components/AuthGuard";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ErrorBoundary>
            <AuthGuard>
                <DashboardLayout>{children}</DashboardLayout>
            </AuthGuard>
        </ErrorBoundary>
    );
}
