import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const { PrismaClient } = pkg;
const connectionString = process.env.DATABASE_URL;

// Configuramos el pool de conexiones
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Exportamos una única instancia de Prisma para toda la app
export const prisma = new PrismaClient({ adapter });

