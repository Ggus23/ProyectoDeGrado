"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { tokens } from "../../../lib/token-storage";

export default function AuthCallback() {
  const router = useRouter();
  const processedRef = useRef(false); // evita doble corrida en dev (StrictMode)

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const loc = new URL(window.location.href);
    // 1) ¿Hay tokens en el hash? (vuelta desde backend)
    if (loc.hash) {
      const hash = new URLSearchParams(loc.hash.slice(1));
      const at = hash.get("accessToken");
      const rt = hash.get("refreshToken") || undefined;

      if (at) {
        tokens.save(at, rt);
        // Limpia el hash y sal del callback directo al dashboard
        window.history.replaceState({}, "", loc.pathname);
        window.location.replace("/dashboard"); // hard redirect
        return;
      }
    }

    // 2) ¿Vienen code/state del IdP? (primera vuelta)
    const code = loc.searchParams.get("code");
    const state = loc.searchParams.get("state");
    if (code && state) {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const redirectBack = `${window.location.origin}/dashboard`;
      const backendUrl = `${apiBase}/auth/callback?code=${encodeURIComponent(
        code
      )}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(
        redirectBack
      )}`;
      window.location.replace(backendUrl);
      return;
    }

    // 3) Si no hay nada en la URL, pero ya tengo tokens guardados → dashboard
    const storedAccess = tokens.getAccess();
    if (storedAccess) {
      router.replace("/dashboard");
      return;
    }

    // 4) Último recurso → login
    router.replace("/login");
  }, [router]);

  return <div className="p-6 text-center">Procesando inicio de sesión…</div>;
}
