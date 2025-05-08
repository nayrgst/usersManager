'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';

import { registerSchema } from '@/schemas/userSchema';
import { db } from '@/lib/db';

type RegisterInput = z.infer<typeof registerSchema>;

type AddressResult =
  | { success: true; city: string; state: string }
  | { success: false; error?: string };

async function fetchAddressByCEP(cep: string): Promise<AddressResult> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) return { success: false, error: 'CEP inválido' };

    return {
      success: true,
      city: data.localidade,
      state: data.uf,
    };
  } catch {
    return { success: false, error: 'Erro na requisição do CEP' };
  }
}

export async function register(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: 'Dados inválidos' };
  }

  const { name, email, password, cep } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: 'E-mail já cadastrado!' };
  }

  let city = '';
  let state = '';
  if (cep) {
    const address = await fetchAddressByCEP(cep);
    if (address.success) {
      city = address.city;
      state = address.state;
    }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      cep,
      city,
      state,
      role: 'user',
    },
  });

  return { success: 'Usuário cadastrado com sucesso!' };
}
