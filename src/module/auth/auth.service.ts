import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

interface UserTokenInput {
  user: { id: string };
  role: { id: string; name: string; permissions: string[] };
}

export const createToken = (input: UserTokenInput): string => {
  const { user, role } = input;
  const token = jwt.sign(
    {
      id: user.id,
      scopes: role.permissions,
    },
    env.TOKEN_SECRET,
  );
  return token;
};
