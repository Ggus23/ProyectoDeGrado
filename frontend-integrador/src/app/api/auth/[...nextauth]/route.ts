import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id: { label: "id", type: "number" },
                email: { label: "email", type: "email", placeholder: "" },
                contrasena: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // Agregar esta línea
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                contrasena: credentials?.contrasena, // Corregido aquí
                            }),
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.message || "Login failed");
                    }

                    const user = await res.json();

                    return {
                        id: String(user.id_usuario),
                         id_usuario: user.id_usuario,   
                        email: user.email,
                        name: user.nombre,
                        rol: user.rol,
                        access_token: user.access_token,
                    };

                } catch (error: any) {
                    console.error("Error during login:", error);
                    throw new Error(error.message || "Ocurrió un error durante el inicio de sesión");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
              token.id_usuario = user.id_usuario; // ✅ ahora sí lo va a encontrar
              token.rol = user.rol;
              token.accessToken = user.access_token;
            }
            return token;
          },
        async session({ session, token }: any) {
            session.user.id_usuario = token.id_usuario;
            session.user.rol = token.rol;
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST, handler as PUT };