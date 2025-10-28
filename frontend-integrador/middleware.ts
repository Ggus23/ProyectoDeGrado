import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Si quieres proteger TODO por defecto, puedes pasar publicRoutes, pero
// es más simple proteger solo las rutas privadas con el matcher.
export default function middleware(request: NextRequest) {
  return auth0.middleware(request);
}

// Protege SOLO las rutas privadas (ajusta a tus paths reales)
export const config = {
  matcher: [
    "/auth/:path*",
    "/dashboard/:path*",
    "/pgf/:path*",
    "/upload/:path*",
    "/generator/:path*",
    "/history/:path*",
    "/api/:path*", // si quieres que tus APIs requieran sesión
  ],
};