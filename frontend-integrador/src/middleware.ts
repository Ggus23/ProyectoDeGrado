export {default} from "next-auth/middleware"

export const config = {
  matcher: [
    "/UseProfile/:path*",
  ],
};