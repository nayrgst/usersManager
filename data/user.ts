import { db } from '@/lib/db';

export function getUserByEmail(email: string) {
  try {
    const user = db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
}

export function getUserById(id: string) {
  try {
    const user = db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
}
