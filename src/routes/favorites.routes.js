import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorites.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(validateJWT); // Protegemos todas las rutas de favoritos

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Obtener favoritos del usuario
 *     description: Devuelve la lista de canciones favoritas del usuario autenticado
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos obtenida exitosamente
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
 *                   spotifyTrackId:
 *                     type: string
 *                     example: "4uLU6hMCjMI75M1A2tKUQC"
 *                   trackName:
 *                     type: string
 *                     example: "Wonderwall"
 *                   artistName:
 *                     type: string
 *                     example: "Oasis"
 *                   albumArt:
 *                     type: string
 *                     format: uri
 *                     example: "https://i.scdn.co/image/ab67616d0000b273..."
 *                   userId:
 *                     type: string
 *                     example: uuid
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error al obtener favoritos
 */
router.get('/', getFavorites);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Agregar canción a favoritos
 *     description: Agrega una canción de Spotify a la lista de favoritos del usuario
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - spotifyId
 *               - name
 *               - artist
 *               - coverArt
 *             properties:
 *               spotifyId:
 *                 type: string
 *                 example: "4uLU6hMCjMI75M1A2tKUQC"
 *               name:
 *                 type: string
 *                 example: "Wonderwall"
 *               artist:
 *                 type: string
 *                 example: "Oasis"
 *               coverArt:
 *                 type: string
 *                 format: uri
 *                 example: "https://i.scdn.co/image/ab67616d0000b273..."
 *     responses:
 *       201:
 *         description: Canción agregada a favoritos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: uuid
 *                 spotifyTrackId:
 *                   type: string
 *                   example: "4uLU6hMCjMI75M1A2tKUQC"
 *                 trackName:
 *                   type: string
 *                   example: "Wonderwall"
 *                 artistName:
 *                   type: string
 *                   example: "Oasis"
 *                 albumArt:
 *                   type: string
 *                   format: uri
 *                   example: "https://i.scdn.co/image/ab67616d0000b273..."
 *                 userId:
 *                   type: string
 *                   example: uuid
 *       400:
 *         description: Este track ya está en tus favoritos
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error al guardar favorito
 */
router.post('/', addFavorite);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Eliminar canción de favoritos
 *     description: Elimina una canción específica de la lista de favoritos del usuario
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del favorito a eliminar
 *         example: uuid
 *     responses:
 *       200:
 *         description: Canción eliminada de favoritos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eliminado de favoritos"
 *       401:
 *         description: No autorizado - Token requerido
 *       403:
 *         description: No puedes eliminar un favorito ajeno
 *       404:
 *         description: Favorito no encontrado
 *       500:
 *         description: Error al eliminar
 */
router.delete('/:id', removeFavorite);

export default router;