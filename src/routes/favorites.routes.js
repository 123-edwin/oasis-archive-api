import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorites.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(validateJWT); // Protegemos todas las rutas de favoritos

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:id', removeFavorite);

export default router;