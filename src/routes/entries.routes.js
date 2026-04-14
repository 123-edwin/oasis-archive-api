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

// Ver reseñas es público
router.get('/', getEntries);

// Crear reseña requiere estar logueado (Token)
router.post('/', validateJWT, createEntry);

// Editar reseña requiere estar logueado
router.put('/:id', validateJWT, updateEntry);

// Eliminar reseña requiere estar logueado
router.delete('/:id', validateJWT, deleteEntry);

// Añade esta ruta antes de las que usan :id
router.get('/search', validateJWT, searchMusic);

export default router;