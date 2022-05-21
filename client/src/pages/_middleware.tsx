import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { pathname } = req.nextUrl;
    const { cookies } = req;
    const token = cookies["token"];

    if (pathname === "/") {
        if (token) {
            return NextResponse.redirect("/projects");
        } else {
            return NextResponse.redirect("/login");
        }
    } else if (pathname === "/login") {
        if (token) {
            return NextResponse.redirect("/projects");
        }
    } else if (pathname === "/projects") {
        if (!token) {
            return NextResponse.redirect("/login");
        }
    }
    return NextResponse.next();
}
