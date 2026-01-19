import { cookies } from "next/headers";
import VerificationClient from "./verification-client";

export default async function VerificationPage() {
  const cookieStore = await cookies();
  const rawStatus = cookieStore.get("sp_verification_status")?.value;
  const status: "unverified" | "pending" | "verified" | "rejected" =
    rawStatus === "pending" || rawStatus === "verified" || rawStatus === "rejected" ? rawStatus : "unverified";

  const rawType = cookieStore.get("sp_verification_type")?.value;
  const type: "individual" | "organization" | undefined =
    rawType === "individual" || rawType === "organization" ? rawType : undefined;

  return <VerificationClient initialStatus={status} initialType={type} />;
}
