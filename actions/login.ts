'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { loginSchema } from '@/schemas/userSchema';
import { getUserByEmail } from '@/data/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validateFilds = loginSchema.safeParse(values);

  if (!validateFilds.success) {
    return { error: 'E-mail ou Senha incorretos.' };
  }

  const { email, password } = validateFilds.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: 'Este e-mail não existe!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: 'Login realizado com sucesso!', redirectTo: DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.name) {
        case 'CredentialsSignin':
          return { error: 'E-mail ou Senha incorretos.' };
        default: {
          return { error: 'Ops! Algo deu errado!' };
        }
      }
    }
    throw error;
  }
}
