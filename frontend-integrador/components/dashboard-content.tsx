"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Upload,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AIProgressBanner } from "@/components/ai/ai-progress-banner";
import { AIProvenanceTag } from "@/components/ai/ai-provenance-tag";
import { cn } from "@/lib/utils";
import { fetchMe, fetchSummary, type Summary } from "@/lib/api";

// TEMP: mientras montas endpoint real de historial
const mockHistory = [
  {
    id: "1",
    version: "1.3",
    source: "ai",
    changes: "Mejoras en rúbricas",
    author: "Sistema",
    date: "2025-10-20",
    status: "approved",
  },
  {
    id: "2",
    version: "1.2",
    source: "ai",
    changes: "Alineación de competencias",
    author: "Sistema",
    date: "2025-10-19",
    status: "reviewing",
  },
  {
    id: "3",
    version: "1.1",
    source: "manual",
    changes: "Ajustes en cronograma",
    author: "A. Pacar",
    date: "2025-10-18",
    status: "draft",
  },
];

type Stat = {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  color: string;
};

export function DashboardContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<{ email: string; role: string } | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 1) primero /me
        const m = await fetchMe();
        if (!alive) return;
        setMe(m);
        setError(null);

        // 2) luego summary (si falla, no bloquees)
        try {
          const s = await fetchSummary();
          if (!alive) return;
          setSummary(s);
        } catch (e: any) {
          console.warn("[summary] error:", e?.message ?? e);
          setSummary(null); // o mocks
        }
      } catch (e: any) {
        const msg = String(e?.message ?? e);
        console.error("[dashboard] error:", msg);

        // Solo restringe si /me fue 401/403
        if (msg.startsWith("api_me:401") || msg.startsWith("api_me:403")) {
          setError("restricted");
        } else {
          setError("generic");
        }
      } finally {
        if (alive) setLoading(false); // <- quita el setLoading(true)
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const progress = useMemo(() => {
    return typeof summary?.progress === "number"
      ? Math.max(0, Math.min(100, Math.round(summary.progress)))
      : 0;
  }, [summary]);

  const stats: Stat[] = useMemo(() => {
    const cards = summary?.cards ?? [];
    // Map titles to icons/colors; default fallback
    const iconByTitle: Record<string, any> = {
      "Cursos a cargo": CheckCircle,
      "Tareas por revisar": Clock,
      "Matrículas activas": TrendingUp,
      Notificaciones: Sparkles,
    };
    const colorByTitle: Record<string, string> = {
      "Cursos a cargo": "text-primary",
      "Tareas por revisar": "text-foreground",
      "Matrículas activas": "text-primary",
      Notificaciones: "text-foreground",
    };
    return cards.map((c) => ({
      title: c.title,
      value: c.value,
      change: undefined,
      icon: iconByTitle[c.title] ?? TrendingUp,
      color: colorByTitle[c.title] ?? "text-foreground",
    }));
  }, [summary]);

  if (loading) {
    return <div className="p-6">Cargando…</div>;
  }

  if (error === "restricted") {
    return (
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Acceso restringido</h2>
        <p className="text-muted-foreground mt-2">
          Esta plataforma es de uso exclusivo para <strong>docentes</strong> de
          UNIFRANZ. Inicia sesión con tu correo institucional que empiece con{" "}
          <code>doc.</code>
          (ej. <code>doc.nombre.apellido@unifranz.edu.bo</code>). Si estás en
          fase temporal, asegúrate de estar en la lista de excepciones.
        </p>
      </main>
    );
  }

  if (error) {
    return <div className="p-6">Ocurrió un error al cargar el dashboard.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Bienvenido de nuevo
        </h2>
        <p className="text-muted-foreground">
          Sesión: {me?.email} ({me?.role})
        </p>
      </div>

      <AIProgressBanner
        message={`Análisis del PGF en progreso: ${progress}% completado`}
        progress={progress}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change ? (
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/pgf">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <FileText className="mr-2 h-4 w-4 text-foreground" />
                Ver PGF completo
              </Button>
            </Link>
            <Link href="/upload">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4 text-foreground" />
                Cargar nuevo PGF
              </Button>
            </Link>
            <Link href="/generator">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Sparkles className="mr-2 h-4 w-4 text-foreground" />
                Generar recursos pedagógicos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Validaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHistory.slice(0, 3).map((version) => (
                <div
                  key={version.id}
                  className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        Versión {version.version}
                      </p>
                      <AIProvenanceTag source={version.source as any} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {version.changes}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {version.author} • {version.date}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ml-2",
                      version.status === "approved"
                        ? "bg-primary text-white"
                        : version.status === "reviewing"
                        ? "bg-secondary text-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {version.status === "approved"
                      ? "Aprobado"
                      : version.status === "reviewing"
                      ? "En revisión"
                      : "Borrador"}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/history">
              <Button variant="ghost" className="w-full mt-4 text-primary">
                Ver historial completo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
