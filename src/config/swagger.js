import swaggerJsdoc from 'swagger-jsdoc';
import 'dotenv/config';

const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://oasisarchive-api.railway.app/api'
  : 'http://localhost:3000/api';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Oasis Archive API',
            version: '1.0.0',
            description: 'Documentación oficial de la API para fans de Oasis. Incluye gestión de reseñas, favoritos e integración con Spotify.',
        },
        servers: [
            {
                url: apiUrl,
                description: process.env.NODE_ENV === 'production' ? 'Servidor Production' : 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'x-token',
                    in: 'header',
                    description: 'Introduce tu JWT token en el header x-token',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Aquí es donde Swagger buscará los comentarios de documentación
};

export const swaggerSpec = swaggerJsdoc(options);