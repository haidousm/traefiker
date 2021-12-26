import { NextResponse, NextRequest } from "next/server";
export async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl;
    if (pathname == "/") {
        return NextResponse.redirect("/dashboard");
    }
    return NextResponse.next();
}
