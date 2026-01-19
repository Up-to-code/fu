"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

const restrictedPrefixes = ["/finance", "/services", "/team"];

function isRestrictedPath(pathname: string) {
  if (pathname === "/verification") return false;
  return restrictedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function VerificationGate({
  verificationStatus,
  children,
}: {
  verificationStatus: VerificationStatus;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (verificationStatus === "verified") return;
    if (!isRestrictedPath(pathname)) return;

    const qs = searchParams?.toString();
    const next = qs ? `${pathname}?${qs}` : pathname;
    router.replace(`/verification?next=${encodeURIComponent(next)}`);
  }, [pathname, router, searchParams, verificationStatus]);

  if (verificationStatus === "verified") return children;
  if (!isRestrictedPath(pathname)) return children;

  return null;
}

