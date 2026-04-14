import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.js';

export const validateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' });
  }

  try {
    const { id, role } = jwt.verify(token, envs.JWT_SECRET);
    
    // Añadimos los datos del usuario al objeto request para que los controladores lo usen
    req.uid = id;
    req.uRole = role;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};
