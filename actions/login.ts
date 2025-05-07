'use server';

import { z } from 'zod';

import { loginSchema } from '@/schemas/loginSchema';

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validateFieds = loginSchema.safeParse(values);

  if (!validateFieds.success) {
    return {
      error: 'Campos invalidos!',
    };
  }

  return { success: 'Email enviado!' };
}
