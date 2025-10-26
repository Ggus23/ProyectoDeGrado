# Backend — PGF / Asesoramiento Docente (UNIFRANZ)

Backend basado en **NestJS 11.1.6**, **Node.js 22**, **TypeORM** y **PostgreSQL**.

---

## 🚀 Tecnologías principales
- NestJS 11.1.6
- Node.js 22
- TypeORM 0.3
- PostgreSQL (en Docker)
- Swagger `/api/docs`
- Autenticación OAuth2/OIDC (Google/Microsoft) con dominio `unifranz.edu.bo`

---

## ⚙️ Configuración del entorno

### 1️⃣ Variables `.env`
Ejemplo:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pgf_db"
JWT_SECRET="change-me"
JWT_EXPIRES_IN="15m"
REFRESH_EXPIRES_IN="7d"
CORS_ORIGINS="http://localhost:3000"
OAUTH_PROVIDER="google"
OAUTH_CLIENT_ID=""
OAUTH_CLIENT_SECRET=""
OAUTH_CALLBACK_URL="http://localhost:4000/auth/callback"
OAUTH_ALLOWED_DOMAIN="unifranz.edu.bo"
UPLOADS_DIR="./uploads"
