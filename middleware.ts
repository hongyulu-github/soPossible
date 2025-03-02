import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:id*", "/create"],
};
