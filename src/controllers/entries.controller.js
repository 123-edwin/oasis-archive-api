import { prisma } from '../config/db.js';
import { searchOasisTrack } from '../services/spotify.service.js';

export const createEntry = async (req, res) => {
  const { title, content, rating, spotifyTrackId } = req.body;
  const userId = req.uid; // Obtenido del token en el middleware

  try {
    const newEntry = await prisma.entry.create({
      data: {
        title,
        content,
        rating,
        spotifyTrackId,
        userId
      }
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error: error.message });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await prisma.entry.findMany({
      include: {
        user: {
          select: { email: true, role: true } // Traemos datos del autor, pero sin el password
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas', error: error.message });
  }
};

export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { title, content, rating } = req.body;
  const userId = req.uid;
  const userRole = req.uRole;

  try {
    const entry = await prisma.entry.findUnique({ where: { id } });

    if (!entry) return res.status(404).json({ message: 'Esa reseña no existe' });

    // Seguridad: ¿Es el dueño o es un admin?
    if (entry.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'No tienes permiso para editar esta reseña' });
    }

    const updated = await prisma.entry.update({
      where: { id },
      data: { title, content, rating }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.uid;
  const userRole = req.uRole;

  try {
    const entry = await prisma.entry.findUnique({ where: { id } });

    if (!entry) return res.status(404).json({ message: 'Esa reseña no existe' });

    // Seguridad: ¿Es el dueño o es un admin?
    if (entry.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'No tienes permiso para borrar esta reseña' });
    }

    await prisma.entry.delete({ where: { id } });
    res.json({ message: 'Reseña eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};

export const searchMusic = async (req, res) => {
  const { q } = req.query; 
  if (!q) return res.status(400).json({ message: 'Falta el parámetro de búsqueda (q)' });

  try {
    const results = await searchOasisTrack(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando en Spotify' });
  }
};