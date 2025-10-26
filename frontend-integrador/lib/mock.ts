// Mock data for UNIFRANZ PGF Platform

export interface PGFSection {
  id: string
  title: string
  content: string
  order: number
  aiStatus?: "analyzing" | "ready" | "reviewing" | "no-match" | "completed"
}

export interface Competency {
  id: string
  code: string
  name: string
  description: string
  level: "basic" | "intermediate" | "advanced"
}

export interface Material {
  id: string
  title: string
  type: "document" | "video" | "presentation" | "activity"
  competencyIds: string[]
  aiGenerated: boolean
  aiConfidence?: number
  url?: string
}

export interface TraceabilityItem {
  id: string
  competencyId: string
  materialId: string
  alignment: number
  aiSuggested: boolean
  status: "completed" | "reviewing" | "pending"
}

export interface Rubric {
  id: string
  name: string
  criteria: RubricCriterion[]
  aiGenerated: boolean
  originalVersion?: string
}

export interface RubricCriterion {
  id: string
  name: string
  description: string
  levels: RubricLevel[]
}

export interface RubricLevel {
  id: string
  name: string
  description: string
  points: number
}

export interface Session {
  id: string
  week: number
  day: string
  title: string
  duration: number
  topics: string[]
  materials: string[]
  aiSuggestions?: string[]
}

export interface Strategy {
  id: string
  name: string
  category: "collaborative" | "experiential" | "problem-based" | "project-based"
  description: string
  steps: string[]
  aiRecommended: boolean
  applicableTo: string[]
}

export interface HistoryVersion {
  id: string
  version: string
  date: string
  author: string
  changes: string
  source: "pgf" | "ai" | "manual"
  status: "draft" | "reviewing" | "approved"
}

export interface ChecklistItem {
  id: string
  category: string
  task: string
  status: "completed" | "reviewing" | "pending"
  aiAssisted: boolean
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
}

// Mock PGF Sections
export const mockPGFSections: PGFSection[] = [
  {
    id: "pgf-1",
    title: "Identificación de la Asignatura",
    content: "Nombre: Programación Avanzada\nCódigo: CS-301\nCréditos: 4\nHoras: 80",
    order: 1,
    aiStatus: "completed",
  },
  {
    id: "pgf-2",
    title: "Justificación",
    content:
      "Esta asignatura proporciona las bases teóricas y prácticas necesarias para el desarrollo de software complejo...",
    order: 2,
    aiStatus: "completed",
  },
  {
    id: "pgf-3",
    title: "Competencias",
    content:
      "El estudiante será capaz de diseñar, implementar y evaluar soluciones de software utilizando paradigmas avanzados...",
    order: 3,
    aiStatus: "reviewing",
  },
  {
    id: "pgf-4",
    title: "Contenidos Mínimos",
    content: "Programación orientada a objetos avanzada, patrones de diseño, estructuras de datos complejas...",
    order: 4,
    aiStatus: "analyzing",
  },
  {
    id: "pgf-5",
    title: "Metodología",
    content: "Se utilizará una metodología activa basada en proyectos, con énfasis en el aprendizaje colaborativo...",
    order: 5,
    aiStatus: "ready",
  },
]

// Mock Competencies
export const mockCompetencies: Competency[] = [
  {
    id: "comp-1",
    code: "CE-01",
    name: "Diseño de Software",
    description: "Capacidad para diseñar soluciones de software aplicando principios de ingeniería",
    level: "advanced",
  },
  {
    id: "comp-2",
    code: "CE-02",
    name: "Programación Orientada a Objetos",
    description: "Dominio de los conceptos y técnicas de POO para desarrollo de aplicaciones",
    level: "advanced",
  },
  {
    id: "comp-3",
    code: "CE-03",
    name: "Patrones de Diseño",
    description: "Aplicación de patrones de diseño para resolver problemas recurrentes",
    level: "intermediate",
  },
  {
    id: "comp-4",
    code: "CG-01",
    name: "Trabajo en Equipo",
    description: "Capacidad para trabajar efectivamente en equipos multidisciplinarios",
    level: "intermediate",
  },
  {
    id: "comp-5",
    code: "CG-02",
    name: "Pensamiento Crítico",
    description: "Análisis y evaluación crítica de problemas y soluciones",
    level: "advanced",
  },
]

// Mock Materials
export const mockMaterials: Material[] = [
  {
    id: "mat-1",
    title: "Introducción a Patrones de Diseño",
    type: "presentation",
    competencyIds: ["comp-3"],
    aiGenerated: false,
    url: "/materials/patterns-intro.pdf",
  },
  {
    id: "mat-2",
    title: "Ejercicios de POO Avanzada",
    type: "activity",
    competencyIds: ["comp-2", "comp-3"],
    aiGenerated: true,
    aiConfidence: 0.92,
    url: "/materials/oop-exercises.pdf",
  },
  {
    id: "mat-3",
    title: "Video: Arquitectura de Software",
    type: "video",
    competencyIds: ["comp-1"],
    aiGenerated: false,
    url: "https://example.com/video",
  },
  {
    id: "mat-4",
    title: "Proyecto Final: Sistema de Gestión",
    type: "activity",
    competencyIds: ["comp-1", "comp-2", "comp-4"],
    aiGenerated: true,
    aiConfidence: 0.88,
  },
  {
    id: "mat-5",
    title: "Guía de Refactorización",
    type: "document",
    competencyIds: ["comp-2", "comp-5"],
    aiGenerated: true,
    aiConfidence: 0.95,
  },
]

// Mock Traceability
export const mockTraceability: TraceabilityItem[] = [
  {
    id: "trace-1",
    competencyId: "comp-1",
    materialId: "mat-3",
    alignment: 95,
    aiSuggested: false,
    status: "completed",
  },
  {
    id: "trace-2",
    competencyId: "comp-2",
    materialId: "mat-2",
    alignment: 92,
    aiSuggested: true,
    status: "completed",
  },
  {
    id: "trace-3",
    competencyId: "comp-3",
    materialId: "mat-1",
    alignment: 88,
    aiSuggested: false,
    status: "completed",
  },
  {
    id: "trace-4",
    competencyId: "comp-4",
    materialId: "mat-4",
    alignment: 85,
    aiSuggested: true,
    status: "reviewing",
  },
  {
    id: "trace-5",
    competencyId: "comp-5",
    materialId: "mat-5",
    alignment: 90,
    aiSuggested: true,
    status: "reviewing",
  },
]

// Mock Rubrics
export const mockRubrics: Rubric[] = [
  {
    id: "rub-1",
    name: "Rúbrica de Proyecto Final",
    aiGenerated: false,
    criteria: [
      {
        id: "crit-1",
        name: "Diseño de Arquitectura",
        description: "Calidad del diseño arquitectónico del sistema",
        levels: [
          {
            id: "lev-1",
            name: "Excelente",
            description: "Arquitectura bien estructurada con patrones apropiados",
            points: 25,
          },
          { id: "lev-2", name: "Bueno", description: "Arquitectura funcional con algunos patrones", points: 20 },
          { id: "lev-3", name: "Suficiente", description: "Arquitectura básica pero funcional", points: 15 },
          { id: "lev-4", name: "Insuficiente", description: "Arquitectura deficiente o inexistente", points: 10 },
        ],
      },
      {
        id: "crit-2",
        name: "Implementación",
        description: "Calidad del código y aplicación de POO",
        levels: [
          {
            id: "lev-5",
            name: "Excelente",
            description: "Código limpio, bien documentado y con buenas prácticas",
            points: 25,
          },
          { id: "lev-6", name: "Bueno", description: "Código funcional con documentación adecuada", points: 20 },
          { id: "lev-7", name: "Suficiente", description: "Código funcional pero con mejoras necesarias", points: 15 },
          { id: "lev-8", name: "Insuficiente", description: "Código deficiente o no funcional", points: 10 },
        ],
      },
    ],
  },
  {
    id: "rub-2",
    name: "Rúbrica de Participación",
    aiGenerated: true,
    criteria: [
      {
        id: "crit-3",
        name: "Colaboración",
        description: "Participación activa en actividades grupales",
        levels: [
          { id: "lev-9", name: "Excelente", description: "Participación activa y constructiva", points: 10 },
          { id: "lev-10", name: "Bueno", description: "Participación regular", points: 8 },
          { id: "lev-11", name: "Suficiente", description: "Participación mínima", points: 6 },
          { id: "lev-12", name: "Insuficiente", description: "No participa", points: 4 },
        ],
      },
    ],
  },
]

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: "ses-1",
    week: 1,
    day: "Lunes",
    title: "Introducción a Patrones de Diseño",
    duration: 120,
    topics: ["Patrones creacionales", "Singleton", "Factory"],
    materials: ["mat-1"],
    aiSuggestions: ["Agregar ejercicio práctico de Factory Pattern", "Incluir comparación con código sin patrones"],
  },
  {
    id: "ses-2",
    week: 1,
    day: "Miércoles",
    title: "Patrones Estructurales",
    duration: 120,
    topics: ["Adapter", "Decorator", "Facade"],
    materials: ["mat-1"],
    aiSuggestions: ["Demostración en vivo de Decorator Pattern"],
  },
  {
    id: "ses-3",
    week: 2,
    day: "Lunes",
    title: "POO Avanzada",
    duration: 120,
    topics: ["Herencia múltiple", "Composición vs Herencia", "SOLID"],
    materials: ["mat-2"],
    aiSuggestions: ["Incluir casos de estudio reales", "Ejercicio de refactorización"],
  },
  {
    id: "ses-4",
    week: 2,
    day: "Miércoles",
    title: "Arquitectura de Software",
    duration: 120,
    topics: ["Capas", "MVC", "Microservicios"],
    materials: ["mat-3"],
  },
  {
    id: "ses-5",
    week: 3,
    day: "Lunes",
    title: "Inicio Proyecto Final",
    duration: 120,
    topics: ["Definición de requisitos", "Diseño inicial"],
    materials: ["mat-4"],
    aiSuggestions: ["Proporcionar plantilla de documento de diseño", "Revisar ejemplos de proyectos anteriores"],
  },
]

// Mock Strategies
export const mockStrategies: Strategy[] = [
  {
    id: "strat-1",
    name: "Aprendizaje Basado en Proyectos",
    category: "project-based",
    description: "Los estudiantes desarrollan un proyecto completo aplicando los conceptos aprendidos",
    steps: [
      "Definir objetivos del proyecto",
      "Formar equipos de trabajo",
      "Planificar sprints de desarrollo",
      "Implementar y documentar",
      "Presentar y evaluar",
    ],
    aiRecommended: true,
    applicableTo: ["comp-1", "comp-2", "comp-4"],
  },
  {
    id: "strat-2",
    name: "Estudio de Casos",
    category: "problem-based",
    description: "Análisis de casos reales de la industria para aplicar conceptos teóricos",
    steps: [
      "Presentar el caso de estudio",
      "Análisis individual",
      "Discusión en grupos",
      "Propuesta de solución",
      "Retroalimentación",
    ],
    aiRecommended: false,
    applicableTo: ["comp-1", "comp-5"],
  },
  {
    id: "strat-3",
    name: "Programación en Parejas",
    category: "collaborative",
    description: "Dos estudiantes trabajan juntos en una misma estación de trabajo",
    steps: [
      "Formar parejas",
      "Asignar roles (driver/navigator)",
      "Rotar roles cada 15 minutos",
      "Revisar código juntos",
      "Documentar aprendizajes",
    ],
    aiRecommended: true,
    applicableTo: ["comp-2", "comp-4"],
  },
  {
    id: "strat-4",
    name: "Laboratorio Práctico",
    category: "experiential",
    description: "Ejercicios prácticos guiados para reforzar conceptos",
    steps: [
      "Introducción teórica breve",
      "Demostración del instructor",
      "Práctica guiada",
      "Práctica independiente",
      "Revisión y retroalimentación",
    ],
    aiRecommended: true,
    applicableTo: ["comp-2", "comp-3"],
  },
]

// Mock History
export const mockHistory: HistoryVersion[] = [
  {
    id: "hist-1",
    version: "1.0",
    date: "2024-01-15",
    author: "Dr. Juan Pérez",
    changes: "Versión inicial del PGF",
    source: "pgf",
    status: "approved",
  },
  {
    id: "hist-2",
    version: "1.1",
    date: "2024-02-20",
    author: "Sistema IA",
    changes: "Sugerencias de alineación de competencias con materiales",
    source: "ai",
    status: "reviewing",
  },
  {
    id: "hist-3",
    version: "1.2",
    date: "2024-03-10",
    author: "Dr. Juan Pérez",
    changes: "Actualización de metodología y estrategias didácticas",
    source: "manual",
    status: "approved",
  },
  {
    id: "hist-4",
    version: "1.3",
    date: "2024-03-25",
    author: "Sistema IA",
    changes: "Generación de rúbricas de evaluación",
    source: "ai",
    status: "reviewing",
  },
  {
    id: "hist-5",
    version: "2.0",
    date: "2024-04-05",
    author: "Dr. Juan Pérez",
    changes: "Revisión completa del PGF con nuevas competencias",
    source: "manual",
    status: "draft",
  },
]

// Mock Checklist
export const mockChecklist: ChecklistItem[] = [
  {
    id: "check-1",
    category: "Identificación",
    task: "Completar datos de la asignatura",
    status: "completed",
    aiAssisted: false,
  },
  {
    id: "check-2",
    category: "Identificación",
    task: "Definir créditos y horas",
    status: "completed",
    aiAssisted: false,
  },
  {
    id: "check-3",
    category: "Competencias",
    task: "Listar competencias específicas",
    status: "completed",
    aiAssisted: true,
  },
  {
    id: "check-4",
    category: "Competencias",
    task: "Alinear competencias con materiales",
    status: "reviewing",
    aiAssisted: true,
  },
  {
    id: "check-5",
    category: "Metodología",
    task: "Definir estrategias didácticas",
    status: "reviewing",
    aiAssisted: true,
  },
  {
    id: "check-6",
    category: "Evaluación",
    task: "Crear rúbricas de evaluación",
    status: "reviewing",
    aiAssisted: true,
  },
  {
    id: "check-7",
    category: "Evaluación",
    task: "Definir criterios de calificación",
    status: "pending",
    aiAssisted: false,
  },
  {
    id: "check-8",
    category: "Secuenciación",
    task: "Planificar agenda semanal",
    status: "pending",
    aiAssisted: false,
  },
]

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: "user-1",
  name: "Dr. Juan Pérez",
  email: "juan.perez@unifranz.edu.bo",
  role: "Docente",
  department: "Ingeniería de Sistemas",
  avatar: "/placeholder-user.jpg",
}

// Mock AI Progress
export const mockAIProgress = {
  analyzing: 2,
  ready: 3,
  reviewing: 4,
  completed: 8,
  total: 17,
}
