import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { envs } from './config/envs.js'
import authRoutes from './routes/auth.routes.js'
import entriesRoutes from './routes/entries.routes.js'
import favoriteRoutes from './routes/favorites.routes.js'

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);
app.use('/api/favorites', favoriteRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to The Oasis Archive API' });
});

const PORT = envs.PORT|| 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;