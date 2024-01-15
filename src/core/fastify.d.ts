export type User = {
  id: string;
  scopes: string[];
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
