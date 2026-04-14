import { prisma } from '../config/db.js';

export const addFavorite = async (req, res) => {
  const { spotifyId, name, artist, coverArt } = req.body;
  const userId = req.uid;

  try {
    const favorite = await prisma.favorite.create({
      data: {
        spotifyTrackId: spotifyId,
        trackName: name,
        artistName: artist,
        albumArt: coverArt,
        userId: userId
      }
    });
    res.status(201).json(favorite);
  } catch (error) {
    // Si intentan agregar el mismo track dos veces, Prisma lanzará un error P2002
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Este track ya está en tus favoritos' });
    }
    res.status(500).json({ message: 'Error al guardar favorito', error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.uid }
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos' });
  }
};

export const removeFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.uid;

  try {
    const favorite = await prisma.favorite.findUnique({ where: { id } });

    if (!favorite || favorite.userId !== userId) {
      return res.status(403).json({ message: 'No puedes eliminar un favorito ajeno' });
    }

    await prisma.favorite.delete({ where: { id } });
    res.json({ message: 'Eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
};