import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
        const auth = basicAuth.split(" ")[1];
        const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

        if (user === "admin" && pwd === "admin") {
            const { pathname } = req.nextUrl;
            if (pathname == "/") {
                return NextResponse.redirect("/dashboard");
            }
            return NextResponse.next();
        }
    }

    return new Response("Auth required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}
