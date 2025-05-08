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

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Preencha o campo Nome!')
      .min(3, 'O campo Nome deve ter pelo menos 3 caracteres!'),
    email: z
      .string()
      .nonempty('Preencha o campo Email!')
      .min(1)
      .email('Preencha um email valido!')
      .max(333, 'o Email não pode ter mais de 333 caracteres!'),
    password: z
      .string()
      .nonempty('Preencha o campo Senha!')
      .min(6, 'A senha deve ter pelo menos 6 caracteres!'),
    confirmPassword: z
      .string()
      .nonempty('Preencha o campo Confirme sua senha!')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    cep: z
      .string()
      .optional()
      .refine((value) => !value || /^[0-9]{8}$/.test(value), {
        message: 'O CEP deve conter 8 dígitos numéricos!',
      }),

    state: z.string().optional(),

    city: z.string().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não coincidem!',
        path: ['confirmPassword'],
      });
    }
  });

export const editUserSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
});
