"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SessionProvider, getSession } from "next-auth/react";
import { Header } from "@/components/Header";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, contrasena_hasheada: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const session = await getSession();
        setAuth(session);
      } catch (error) {
        console.error("Error fetching auth data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  const login = async (email: string, contrasena_hasheada: string) => {
    // Implementa la lógica de inicio de sesión aquí
    console.log("Login:", email, contrasena_hasheada);
  };

  const logout = async () => {
    // Implementa la lógica de cierre de sesión aquí
    console.log("Logout");
  };

  const register = async (userData: any) => {
    // Implementa la lógica de registro aquí
    console.log("Register:", userData);
  };

  if (loading) {
    return <div>Loading...</div>; // O un componente de carga personalizado
  }

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ user: auth, loading, login, logout, register }}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a SessionAuthProvider");
  }
  return context;
};

export default SessionAuthProvider;