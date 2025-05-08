import NextAuth, { type DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './data/user';

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole;
      cep?: number;
      city?: string;
      state?: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.cep && session.user) {
        session.user.cep = token.cep as number;
      }

      if (token.city && session.user) {
        session.user.city = token.city as string;
      }

      if (token.state && session.user) {
        session.user.state = token.state as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.role = user.role;
      token.cep = user.cep;
      token.city = user.city;
      token.state = user.state;

      return token;
    },

    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser) return false;

      return true;
    },
  },

  session: { strategy: 'jwt' },
  ...authConfig,
});
