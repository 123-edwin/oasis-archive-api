# Oasis Archive API 🎸

Backend robusto desarrollado en Node.js para **Oasis Archive**, una plataforma dedicada a la gestión de reseñas musicales y colecciones personales para fans de la banda Oasis.

## 🚀 Características
- **Autenticación:** Registro y Login con JWT y hashing de contraseñas (Bcrypt).
- **Integración con Spotify:** Búsqueda en tiempo real de tracks y portadas mediante RapidAPI.
- **Gestión de Reseñas (CRUD):** Creación y administración de entradas con validación de autoría.
- **Favoritos:** Sistema para guardar tracks favoritos con restricción de duplicados por usuario.
- **Documentación:** Interfaz interactiva con Swagger UI.

## 🛠️ Stack Tecnológico
- **Runtime:** Node.js (Express)
- **Base de Datos:** PostgreSQL (Neon.tech)
- **ORM:** Prisma
- **Documentación:** Swagger
- **Despliegue Sugerido:** Render / Railway

## 📋 Requisitos Previos
- Node.js v18+
- Instancia de PostgreSQL (o cuenta en Neon.tech)
- API Key de RapidAPI (Spotify 23)

## 🔧 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/oasis-archive-api.git](https://github.com/tu-usuario/oasis-archive-api.git)
   cd oasis-archive-api
