import { envs } from '../config/envs.js';

export const searchOasisTrack = async (query) => {
  // Tip de búsqueda: Concatenamos "Oasis" al query para mejorar la relevancia 
  // si el usuario solo pone el nombre de una canción.
  const searchQuery = query.toLowerCase().includes('oasis') ? query : `${query} Oasis`;
  
  const url = `https://${envs.RAPIDAPI_HOST}/search/?q=${encodeURIComponent(searchQuery)}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': envs.RAPIDAPI_KEY,
      'x-rapidapi-host': envs.RAPIDAPI_HOST,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Error al conectar con Spotify');
    
    const result = await response.json();

    // Accedemos a result.tracks.items según tu nuevo JSON
    const tracks = result.tracks?.items.map(item => {
      const trackData = item.data;
      return {
        spotifyId: trackData.id,
        name: trackData.name,
        album: trackData.albumOfTrack.name,
        artist: trackData.artists.items.map(a => a.profile.name).join(', '),
        coverArt: trackData.albumOfTrack.coverArt.sources[0]?.url, // La de 300x300 suele ser la [0]
        durationMs: trackData.duration.totalMilliseconds
      };
    }) || [];

    return tracks;
  } catch (error) {
    console.error('Spotify Service Error:', error);
    throw error;
  }
};