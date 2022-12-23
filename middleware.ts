import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { Admin, User } from "@prisma/client";
import { NextResponse } from "next/server";

type UserOrAdmin = User | Admin;
const isUser = (toBeDetermined: UserOrAdmin): toBeDetermined is User => {
  if ((toBeDetermined as User).role) return true;
  else return false;
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const user = request.nextauth.token.user;
    const pathname = request.nextUrl.pathname;
    const url = request.url;
    //Checking user role against the `/admin` route
    if (pathname.startsWith("/admin") && isUser(user)) {
      if (user.role == "MANAGER") {
        return NextResponse.redirect(new URL("/manager", url));
      } else {
        return NextResponse.redirect(new URL("/reception", url));
      }
    }

    //Checking user role against the `/manager` route
    else if (
      pathname.startsWith("/manager") &&
      (!isUser(user) || user.role != "MANAGER")
    ) {
      if (!isUser(user)) {
        return NextResponse.redirect(new URL("/admin/hotels", url));
      } else {
        return NextResponse.redirect(new URL("/reception", url));
      }
    }

    //Checking user role against the `/reception` route
    else if (
      pathname.startsWith("/reception") &&
      (!isUser(user) || user.role != "RECEPTION")
    ) {
      if (!isUser(user)) {
        return NextResponse.redirect(new URL("/admin/hotels", url));
      } else {
        return NextResponse.redirect(new URL("/manager", url));
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
