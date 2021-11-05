import { NextResponse, NextRequest } from 'next/server';
import cookie from 'js-cookie';

export async function middleware(req, ev) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/user/')) {
        console.log(cookie.get("auth"));
    }

    return NextResponse.next();
}