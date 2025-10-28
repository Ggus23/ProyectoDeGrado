import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,               // <- requerido
  clientId: process.env.AUTH0_CLIENT_ID!,          // <- requerido
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,  // <- requerido (server-side)
  secret: process.env.AUTH0_SECRET!,               // <- requerido (cookies/sesión)
  appBaseUrl: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN!,           // <- requerido

  authorizationParameters: {
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, // <- TU API Identifier
    scope: "openid profile email",
  },
});