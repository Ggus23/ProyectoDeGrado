# ProyectoDeGrado — Monorepo

Estructura:
- /backend-integrador  → API NestJS 11.1.6 (Node 22, TypeORM, PostgreSQL)
- /frontend-integrador → Next.js (cliente)

## Flujo de ramas
- main   → rama estable (release/producción)
- master → trabajo diario (integración continua)

## Flujo de trabajo
1. Crear rama de feature desde master:
   - git checkout master
   - git pull --rebase origin master
   - git checkout -b feat/<nombre>

2. Subir y abrir PR a master:
   - git push -u origin feat/<nombre>
   - Pull Request → master

3. Promoción a estable:
   - Pull Request de master → main
   - (opcional) tag de release

## Backend
- Swagger: /api/docs
- Base de datos: docker compose up -d (postgres + pgadmin)
- API corre fuera de Docker

## Frontend
- .env.local con NEXT_PUBLIC_API_URL apuntando al backend
- Autenticación vía OAuth/OIDC de backend
