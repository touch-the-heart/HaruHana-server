import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { App } from '../server';

export const registerSwagger = async (app: typeof App) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Haruhana swagger',
        description: 'Haruhana swagger API',
        version: '0.1.0',
      },
      servers: [{
        url: 'http://localhost'
      }],
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
    },
  });
  await app.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => { return swaggerObject },
    transformSpecificationClone: true
  })
};
