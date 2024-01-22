/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { assignRoleToUser, createUser, getUserByEmail } from '../user/user.service';
import { getRoleByName } from '../role/role.service';
import { SYSTEM_ROLES } from '../../config/permissions';
import { createToken } from './auth.service';
import { getCouple } from '../couple/couple.service';
import { faker } from '@faker-js/faker';
import { env } from '../../config/env';

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
    name: userInfo.name,
    color: faker.color.rgb(),
  });
  await assignRoleToUser({
    roleId: role.id,
    userId: newUser.id,
  });
  const token = createToken({ user: newUser, role });
  return { state: 'READY', token };
}

export async function kakaoHandler(
  this: FastifyInstance,
  req: FastifyRequest<{ Querystring: { code: string } }>,
  res: FastifyReply,
) {
  const OAuthToken = await getTokenFromKakao(req.query.code);
  const userInfo = await getUserInfoFromKakao(OAuthToken.access_token);
  const user = await getUserByEmail({ email: userInfo.email, vendor: 'kakao' });
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
    name: userInfo.name,
    color: faker.color.rgb(),
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
  const { email, name } = result.data;
  return { email, name: name ?? '이름을 정해주세요!' };
};

interface KakaoToken {
  token_type: 'bearer';
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

const getTokenFromKakao = async (code: string): Promise<KakaoToken> => {
  const data = {
    grant_type: 'authorization_code',
    client_id: env.KAKAO_CLIENT_KEY,
    redirect_uri:
      env.NODE_ENV === 'production'
        ? 'https://api.haruhanas.com/auth/kakao/callback'
        : `http://localhost:${env.PORT}/auth/kakao/callback`,
    code,
    client_secret: env.KAKAO_SECRET_KEY,
  };
  const result = await axios.post('https://kauth.kakao.com/oauth/token', data, {
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
  });
  return result.data;
};

const getUserInfoFromKakao = async (token: string) => {
  const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { kakao_account } = result.data;
  const email = kakao_account?.email;
  const { nickname } = kakao_account?.profile;
  return { email, name: nickname };
};
