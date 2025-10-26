# Plataforma UNIFRANZ - Sistema de Gestión del Plan General de Formación (PGF)

Plataforma web integral para ayudar a docentes a operacionalizar el Plan General de Formación (PGF) con asistencia de Inteligencia Artificial.

## 🎯 Descripción

La Plataforma UNIFRANZ es una herramienta educativa que permite a los docentes gestionar, alinear y optimizar sus planes de formación académica. Incluye funcionalidades avanzadas de IA para sugerencias automáticas, análisis de alineación de competencias, generación de rúbricas y seguimiento de progreso.

## ✨ Características Principales

- **Dashboard Interactivo**: Visualización de métricas y progreso del PGF
- **Visor PGF**: Navegación y edición de secciones del plan de formación
- **Alineación de Competencias**: Mapeo automático entre contenidos y competencias
- **Secuenciador de Actividades**: Organización temporal de actividades de aprendizaje
- **Generador de Rúbricas**: Creación asistida por IA de criterios de evaluación
- **Estrategias Pedagógicas**: Biblioteca de metodologías activas de enseñanza
- **Checklist de Completitud**: Seguimiento del progreso de implementación
- **Historial de Versiones**: Control de cambios con proveniencia IA/humana
- **Modo Oscuro**: Interfaz adaptable con tema claro y oscuro

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Iconos**: Lucide React
- **Gestión de Estado**: React Hooks + Context API
- **Tema**: next-themes

## 📋 Requisitos Previos

Antes de instalar, asegúrate de tener instalado:

- **Node.js**: versión 18.17 o superior
- **npm**: versión 9 o superior (incluido con Node.js)
- **Git**: para clonar el repositorio

Verifica las versiones instaladas:

\`\`\`bash
node --version
npm --version
git --version
\`\`\`

## 🚀 Instalación

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/unifranz-platform.git
cd unifranz-platform
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

Este comando instalará todas las dependencias necesarias definidas en `package.json`, incluyendo:
- Next.js y React
- Tailwind CSS
- shadcn/ui components
- TypeScript
- Lucide icons

### 3. Configurar Variables de Entorno (Opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`bash
# .env.local
NEXT_PUBLIC_APP_NAME="Plataforma UNIFRANZ"
NEXT_PUBLIC_APP_VERSION="1.0.0"
\`\`\`

### 4. Iniciar el Servidor de Desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Utilidades
npm run lint         # Ejecuta el linter de código
\`\`\`

## 🏗️ Estructura del Proyecto

\`\`\`
unifranz-platform/
├── app/                          # Rutas de la aplicación (App Router)
│   ├── page.tsx                  # Dashboard principal
│   ├── pgf/                      # Visor PGF
│   ├── alignment/                # Alineación de competencias
│   ├── sequencer/                # Secuenciador de actividades
│   ├── rubrics/                  # Generador de rúbricas
│   ├── strategies/               # Estrategias pedagógicas
│   ├── checklist/                # Checklist de completitud
│   ├── history/                  # Historial de versiones
│   ├── settings/                 # Configuración
│   ├── layout.tsx                # Layout principal
│   └── globals.css               # Estilos globales
│
├── components/                   # Componentes React
│   ├── ai/                       # Componentes de IA
│   │   ├── ai-status-chip.tsx
│   │   ├── ai-progress-banner.tsx
│   │   ├── ai-overlay.tsx
│   │   ├── ai-suggestion-card.tsx
│   │   ├── ai-diff-dialog.tsx
│   │   ├── ai-provenance-tag.tsx
│   │   ├── ai-empty-state.tsx
│   │   ├── ai-error-state.tsx
│   │   └── ai-confidence-meter.tsx
│   │
│   ├── ui/                       # Componentes UI base (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── spinner.tsx
│   │   ├── empty.tsx
│   │   └── ...
│   │
│   ├── dashboard-layout.tsx      # Layout del dashboard
│   ├── sidebar.tsx               # Barra lateral de navegación
│   ├── top-bar.tsx               # Barra superior
│   ├── theme-provider.tsx        # Proveedor de tema
│   └── [page]-content.tsx        # Contenido de cada página
│
├── lib/                          # Utilidades y datos
│   ├── utils.ts                  # Funciones auxiliares
│   └── mock.ts                   # Datos de prueba
│
├── public/                       # Archivos estáticos
├── package.json                  # Dependencias del proyecto
├── tsconfig.json                 # Configuración de TypeScript
├── next.config.mjs               # Configuración de Next.js
└── README.md                     # Este archivo
\`\`\`

## 🎨 Paleta de Colores

La plataforma utiliza una paleta de colores cálida y profesional:

- **Primario**: `#F2790F` - Botones principales, estados completados
- **Secundario**: `#D98841` - Hover, estados en revisión
- **Fondo Cálido**: `#F2C48D` - Headers, secciones destacadas
- **Fondo Neutro**: `#F2F2F2` - Cards, paneles, formularios
- **Texto**: `#0D0D0D` - Texto principal, íconos

## 🌙 Modo Oscuro

La plataforma incluye soporte completo para modo oscuro. Los usuarios pueden alternar entre temas usando el botón en la barra superior o desde la página de configuración.

## 📱 Responsive Design

La interfaz está optimizada para diferentes tamaños de pantalla:
- **Desktop**: Experiencia completa con sidebar expandido
- **Tablet**: Sidebar colapsable
- **Mobile**: Navegación adaptada para pantallas pequeñas

## 🔧 Personalización

### Modificar Colores

Edita el archivo `app/globals.css` para cambiar la paleta de colores:

\`\`\`css
@theme inline {
  --color-primary: #F2790F;
  --color-secondary: #D98841;
  /* ... más colores */
}
\`\`\`

### Agregar Nuevas Páginas

1. Crea una nueva carpeta en `app/` con el nombre de la ruta
2. Agrega un archivo `page.tsx` con el componente de la página
3. Crea el componente de contenido en `components/`
4. Actualiza `components/sidebar.tsx` para agregar el enlace de navegación

## 📊 Datos de Prueba

El proyecto incluye datos de prueba en `lib/mock.ts` que simulan:
- Secciones del PGF
- Competencias y materiales
- Rúbricas de evaluación
- Estrategias pedagógicas
- Historial de versiones
- Checklist de tareas

## 🤝 Contribuir

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, abre un issue en el repositorio de GitHub.

## 🙏 Agradecimientos

- shadcn/ui por los componentes base
- Vercel por Next.js
- Lucide por los iconos
- La comunidad de código abierto

---

**Desarrollado con ❤️ para UNIFRANZ**
