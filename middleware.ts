import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const user = request.nextauth.token.user;
    const pathname = request.nextUrl.pathname;
    const url = request.url;
    //Checking user role against the `/admin` route
    if (pathname.startsWith("/admin") && user.role != "ADMIN") {
      if (user.role == "MANAGER") {
        return NextResponse.redirect(new URL("/manager", url));
      } else {
        return NextResponse.redirect(new URL("/reception", url));
      }
    }

    //Checking user role against the `/manager` route
    else if (pathname.startsWith("/manager") && user.role != "MANAGER") {
      if (user.role == "ADMIN") {
        return NextResponse.redirect(new URL("/admin    ", url));
      } else {
        return NextResponse.redirect(new URL("/reception", url));
      }
    }

    //Checking user role against the `/reception` route
    else if (pathname.startsWith("/reception") && user.role != "RECEPTION") {
      if (user.role == "ADMIN") {
        return NextResponse.redirect(new URL("/admin", url));
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
