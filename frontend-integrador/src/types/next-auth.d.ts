// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id_usuario?: number; // Cambiado a id
      nombre?: string;
      rol?: string;
      recursos?: string;
      participaciones?: string;
      mensajes?: string;
    } & DefaultSession["user"];
    accessToken?: string; // Añadido para el token de acceso
  }

  interface User {
    id_usuario?:number;
    nombre?: string;
    rol?: string;
    recursos?: string;
    participaciones?: string;
    mensajes?: string;
  }
  interface JWT {
    id_usuario: string;
    nombre: string;
    email: string;
    image?: string;
    rol: string; // Asegúrate de incluir 'role' en el token JWT
}
}