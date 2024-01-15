/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { assignRoleToUser, createUser, getUserByEmail } from '../user/user.service';
import { getRoleByName } from '../role/role.service';
import { SYSTEM_ROLES } from '../../config/permissions';
import { createToken } from './auth.service';
import { getCouple } from '../couple/couple.service';

export async function googleHandler(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
  const OAuthToken = await this.GoogleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  const userInfo = await getUserInfoFromGoogle(OAuthToken.token.access_token);
  const user = await getUserByEmail({ email: userInfo.email, vendor: 'google' });
  const role = await getRoleByName({ name: SYSTEM_ROLES.APPLICATION_USER });

  if (user) {
    const couple = await getCouple(user.id);
    const token = createToken({ user, role });
    if (couple) {
      return { state: 'FINISH', token };
    }
    return { state: 'READY', token };
  }

  // createUser
  const newUser = await createUser({
    email: userInfo.email,
    vendor: 'google',
  });
  await assignRoleToUser({
    roleId: role.id,
    userId: newUser.id,
  });
  const token = createToken({ user: newUser, role });
  return { state: 'READY', token };
}

const getUserInfoFromGoogle = async (token: string) => {
  const result = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { email } = result.data;
  return { email };
};
