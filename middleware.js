import { NextResponse } from "next/server";
import { getUser } from "./src/utils/dal";
export async function middleware(request){
    const user = await getUser();
    if(!user)
        return NextResponse.redirect(new URL("/login", request.url))
    return NextResponse.next();
}
export const config = {
    matcher: '/my-chest/:path*',
}