import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string | undefined) {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
}

export async function getAllUsers() {
  try {
    const allUsers = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return allUsers;
  } catch (error) {
    console.error('Erro ao carregar usuarios!', error);
    return [];
  }
}
export async function updateUserName(id: string, name: string) {
  try {
    const user = await db.user.update({
      where: { id },
      data: { name },
    });

    return { success: true, user };
  } catch (error) {
    console.error('Erro ao tentar atualizar o nome do usuario', error);

    return { success: false, error: 'falha ao atualizar o nome do usuario!' };
  }
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    return { success: 'Usuario deletado!' };
  } catch (error) {
    console.error('erro ao deletar o usuario', error);

    return { success: false, error: 'falha ao deletar o usuario' };
  }
}

export async function adminUser(userId: string | undefined): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role === UserRole.ADMIN;
  } catch {
    return false;
  }
}
