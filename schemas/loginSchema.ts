import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Preencha o campo Email!')
    .min(1)
    .email('Preencha um email valido!')
    .max(333, 'o Email não pode ter mais de 333 caracteres!'),
  password: z.string().min(1, {
    message: 'Preencha o campo Senha!',
  }),
});
