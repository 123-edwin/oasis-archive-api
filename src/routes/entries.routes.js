import { Router } from 'express';
import {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry,
    searchMusic
} from '../controllers/entries.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /entries:
 *   get:
 *     summary: Obtener todas las reseñas
 *     description: Devuelve una lista de todas las reseñas de canciones de Oasis, ordenadas por fecha de creación descendente
 *     tags: [Entries]
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: uuid
 *                   title:
 *                     type: string
 *                     example: "Wonderwall es una obra maestra"
 *                   content:
 *                     type: string
 *                     example: "Esta canción cambió mi vida..."
 *                   rating:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   spotifyTrackId:
 *                     type: string
 *                     nullable: true
 *                     example: "4uLU6hMCjMI75M1A2tKUQC"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:00:00Z"
 *                   user:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       role:
 *                         type: string
 *                         enum: [ADMIN, USER]
 *                         example: USER
 *       500:
 *         description: Error al obtener reseñas
 */
router.get('/', getEntries);

/**
 * @swagger
 * /entries:
 *   post:
 *     summary: Crear nueva reseña
 *     description: Crea una nueva reseña de una canción de Oasis. Requiere autenticación.
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Wonderwall es increíble"
 *               content:
 *                 type: string
 *                 example: "Esta canción me transporta a los 90s..."
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 default: 5
 *                 example: 5
 *               spotifyTrackId:
 *                 type: string
 *                 nullable: true
 *                 example: "4uLU6hMCjMI75M1A2tKUQC"
 *               albumArt:
 *                 type: string
 *                 nullable: true
 *                 example: "https://i.scdn.co/image/ab67616d0000b273..."
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: uuid
 *                 title:
 *                   type: string
 *                   example: "Wonderwall es increíble"
 *                 content:
 *                   type: string
 *                   example: "Esta canción me transporta a los 90s..."
 *                 rating:
 *                   type: integer
 *                   example: 5
 *                 spotifyTrackId:
 *                   type: string
 *                   nullable: true
 *                   example: "4uLU6hMCjMI75M1A2tKUQC"
 *                 userId:
 *                   type: string
 *                   example: uuid
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error al crear la reseña
 */
router.post('/', validateJWT, createEntry);

/**
 * @swagger
 * /entries/{id}:
 *   put:
 *     summary: Actualizar reseña
 *     description: Actualiza una reseña existente. Solo el autor o un administrador pueden editarla.
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña a actualizar
 *         example: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Wonderwall es una obra maestra"
 *               content:
 *                 type: string
 *                 example: "Esta canción cambió mi vida..."
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       200:
 *         description: Reseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: uuid
 *                 title:
 *                   type: string
 *                   example: "Wonderwall es una obra maestra"
 *                 content:
 *                   type: string
 *                   example: "Esta canción cambió mi vida..."
 *                 rating:
 *                   type: integer
 *                   example: 5
 *                 spotifyTrackId:
 *                   type: string
 *                   nullable: true
 *                   example: "4uLU6hMCjMI75M1A2tKUQC"
 *                 userId:
 *                   type: string
 *                   example: uuid
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *       401:
 *         description: No autorizado - Token requerido
 *       403:
 *         description: No tienes permiso para editar esta reseña
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error al actualizar
 */
router.put('/:id', validateJWT, updateEntry);

/**
 * @swagger
 * /entries/{id}:
 *   delete:
 *     summary: Eliminar reseña
 *     description: Elimina una reseña existente. Solo el autor o un administrador pueden eliminarla.
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña a eliminar
 *         example: uuid
 *     responses:
 *       200:
 *         description: Reseña eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reseña eliminada con éxito"
 *       401:
 *         description: No autorizado - Token requerido
 *       403:
 *         description: No tienes permiso para borrar esta reseña
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error al eliminar
 */
router.delete('/:id', validateJWT, deleteEntry);

/**
 * @swagger
 * /entries/search:
 *   get:
 *     summary: Buscar música en Spotify
 *     description: Busca canciones de Oasis en Spotify usando la API de RapidAPI
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda (se añade "Oasis" automáticamente si no está incluido)
 *         example: "Wonderwall"
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   spotifyId:
 *                     type: string
 *                     example: "4uLU6hMCjMI75M1A2tKUQC"
 *                   name:
 *                     type: string
 *                     example: "Wonderwall"
 *                   album:
 *                     type: string
 *                     example: "(What's the Story) Morning Glory?"
 *                   artist:
 *                     type: string
 *                     example: "Oasis"
 *                   coverArt:
 *                     type: string
 *                     format: uri
 *                     example: "https://i.scdn.co/image/ab67616d0000b273..."
 *                   durationMs:
 *                     type: integer
 *                     example: 258000
 *       400:
 *         description: Falta el parámetro de búsqueda (q)
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error buscando en Spotify
 */
router.get('/search', validateJWT, searchMusic);

export default router;