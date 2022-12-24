import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { pathname } = req.nextUrl;
    const { cookies } = req;
    const token = cookies.get("token");
    const url = req.nextUrl.clone();
    if (pathname === "/") {
        if (token) {
            url.pathname = "/projects";
        } else {
            url.pathname = "/login";
        }
        return NextResponse.redirect(url);
    } else if (pathname === "/login") {
        if (token) {
            url.pathname = "/projects";
            return NextResponse.redirect(url);
        }
    } else if (pathname === "/projects") {
        if (!token) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}
