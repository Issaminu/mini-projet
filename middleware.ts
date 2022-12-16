import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { Admin, User } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type UserOrAdmin = User | Admin;
const isUser = (toBeDetermined: UserOrAdmin): toBeDetermined is User => {
  if ((toBeDetermined as User).role) return true;
  else return false;
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    //Checking user role against the `/admin` route
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      isUser(request.nextauth.token.user)
    ) {
      if (request.nextauth.token.user.role == "MANAGER") {
        return NextResponse.redirect(new URL("/manager", request.url));
      } else {
        return NextResponse.redirect(new URL("/reception", request.url));
      }
    }

    //Checking user role against the `/manager` route
    else if (
      request.nextUrl.pathname.startsWith("/manager") &&
      (!isUser(request.nextauth.token.user) ||
        request.nextauth.token.user.role != "MANAGER")
    ) {
      if (!isUser(request.nextauth.token.user)) {
        return NextResponse.redirect(new URL("/admin/hotels", request.url));
      } else {
        return NextResponse.redirect(new URL("/reception", request.url));
      }
    }

    //Checking user role against the `/reception` route
    else if (
      request.nextUrl.pathname.startsWith("/reception") &&
      (!isUser(request.nextauth.token.user) ||
        request.nextauth.token.user.role != "RECEPTION")
    ) {
      if (!isUser(request.nextauth.token.user)) {
        return NextResponse.redirect(new URL("/admin/hotels", request.url));
      } else {
        return NextResponse.redirect(new URL("/manager", request.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token?.user) return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/reception/:path*"],
};
