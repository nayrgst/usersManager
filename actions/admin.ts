'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { editUserSchema } from '@/schemas/userSchema';
import { deleteUser, updateUserName, adminUser } from '@/data/user';

export async function editUser(values: z.infer<typeof editUserSchema>) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: 'Usuário não autorizado!' };
  }

  const isAdmin = await adminUser(session.user.id);

  if (!isAdmin) {
    return { error: 'Acesso negado!' };
  }

  const validateFieds = editUserSchema.safeParse(values);

  if (!validateFieds.success) {
    return { error: 'dados invalidos' };
  }

  const { id, name } = validateFieds.data;

  const results = await updateUserName(id, name);

  if (!results.success) {
    return { error: results.error || 'Erro ao tentar atualizar o usuario' };
  }

  revalidatePath('/dashboard/admin');

  return { success: 'Nome do usuário atualizado com sucesso!' };
}

export async function removeUser(id: string) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: 'Não autorizado' };
  }

  const isAdmin = await adminUser(session.user.id);

  if (!isAdmin) {
    return { error: 'Acesso negado!' };
  }

  if (id === session.user.id) {
    return { error: 'Impossivel deletar a sua propria conta!' };
  }

  const resulta = await deleteUser(id);

  if (!resulta.success) {
    return { error: resulta.error || 'Erro ao deletar o usario' };
  }

  revalidatePath('/dashboard/admin');

  return { success: 'Usuario deletado com sucesso!' };
}
