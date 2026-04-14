import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config' // Asegúrate de importar esto para leer el .env

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en el entorno. Revisa tu .env.');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});

async function main() {
    const hashedPassword = await bcrypt.hash('OasisAdmin2026!', 10);

    await prisma.user.upsert({
        where: { email: 'admin@oasisarchive.com' },
        update: {},
        create: {
            email: 'admin@oasisarchive.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('✅ Usuario Administrador creado con éxito');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });