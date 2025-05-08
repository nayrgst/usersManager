import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: 'admin@example.com',
    },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
