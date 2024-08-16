import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};
