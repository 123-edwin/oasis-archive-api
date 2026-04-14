# Oasis Archive API 🎸

Backend de la API para **Oasis Archive**, una plataforma dedicada a la gestión de reseñas musicales, favoritos y búsquedas de canciones de Oasis.

## 🚀 Qué hace este proyecto
- Registro y login de usuarios con **JWT**.
- Manejo de reseñas musicales con permisos de edición y eliminación.
- Búsqueda de canciones mediante la API de **Spotify** a través de **RapidAPI**.
- Gestión de favoritos por usuario evitando duplicados.
- Documentación automática con **Swagger UI**.

## 🛠️ Stack Tecnológico
- **Node.js**
- **Express**
- **PostgreSQL**
- **Prisma**
- **Swagger**
- **JWT**
- **Bcryptjs**
- **RapidAPI / Spotify**

## 📦 Requisitos
- **Node.js** v18 o superior
- **npm**
- Una base de datos **PostgreSQL** accesible
- **RapidAPI Key** para el host `spotify23.p.rapidapi.com`

## ⚙️ Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/oasis-archive-api.git
   cd oasis-archive-api
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo `.env` en la carpeta raíz con estas variables:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
   JWT_SECRET="tu_secreto_jwt"
   RAPIDAPI_KEY="tu_rapidapi_key"
   RAPIDAPI_HOST="spotify23.p.rapidapi.com"
   PORT=3000
   ```

## 🧱 Base de datos
1. Genera las migraciones de Prisma y aplica los cambios:
   ```bash
   npx prisma migrate dev --name init
   ```
2. Ejecuta el seed para crear el usuario administrador inicial:
   ```bash
   npm run seed
   ```

## ▶️ Ejecutar la app
- Modo desarrollo:
  ```bash
  npm run dev
  ```
- Modo producción:
  ```bash
  npm start
  ```

## 📍 Rutas principales
- `POST /api/auth/register` — Registrar usuario
- `POST /api/auth/login` — Iniciar sesión y obtener token
- `GET /api/entries` — Obtener todas las reseñas
- `POST /api/entries` — Crear reseña (requiere token)
- `PUT /api/entries/:id` — Actualizar reseña (requiere token)
- `DELETE /api/entries/:id` — Eliminar reseña (requiere token)
- `GET /api/entries/search?q=...` — Buscar canciones en Spotify (requiere token)
- `GET /api/favorites` — Obtener favoritos del usuario (requiere token)
- `POST /api/favorites` — Agregar favorito (requiere token)
- `DELETE /api/favorites/:id` — Eliminar favorito (requiere token)

## 🧾 Swagger
La documentación interactiva se sirve en:

```text
http://localhost:3000/api-docs
```

## 🔐 Autenticación
- El token debe enviarse en el header `x-token`.
- Ejemplo:
  ```http
  x-token: eyJhbGciOiJIUzI1NiIsInR...
  ```

## 💡 Ejemplo rápido
1. Registrar usuario:
   ```http
   POST /api/auth/register
   {
     "email": "user@example.com",
     "password": "mi_contraseña"
   }
   ```
2. Iniciar sesión:
   ```http
   POST /api/auth/login
   {
     "email": "user@example.com",
     "password": "mi_contraseña"
   }
   ```
3. Usar el token devuelto para acceder a endpoints protegidos.

## 📌 Notas
- No subas el archivo `.env` al repositorio.
- Asegúrate de tener la base de datos activa antes de ejecutar migraciones.
- Si usas Neon o cualquier otro host, ajusta `DATABASE_URL` correctamente.

## 🤝 License
- ISC
