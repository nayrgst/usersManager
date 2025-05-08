import { compare } from 'bcrypt-ts';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

import { loginSchema } from '@/schemas/userSchema';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFilds = loginSchema.safeParse(credentials);

        if (validateFilds.success) {
          const { email, password } = validateFilds.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const vsfPassword = await compare(password, user.password);

          if (vsfPassword) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
