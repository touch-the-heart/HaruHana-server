import { Type } from '@sinclair/typebox';

const Auth = Type.Object({
  state: Type.Union([Type.Literal('READY'), Type.Literal('FINISH')]),
  token: Type.String(),
});
export const AuthSchema = {
  response: {
    200: Auth,
  },
  tags: ['0auth 이거는 호출하는거 아님!!'],
};
