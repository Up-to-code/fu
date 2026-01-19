import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const status = req.cookies.get("sp_verification_status")?.value;

  if (status === "verified") return NextResponse.next();

  const next = pathname + (req.nextUrl.search || "");
  const url = req.nextUrl.clone();
  url.pathname = "/verification";
  url.searchParams.set("next", next);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/finance/:path*", "/services/:path*", "/team/:path*"],
};

