import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.js';

export const validateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' });
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    req.uid = decoded.id;
    req.uRole = decoded.role;
    req.uEmail = decoded.email || decoded.user?.email || null;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};
