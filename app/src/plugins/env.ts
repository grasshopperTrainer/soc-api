import fastifyEnv from '@fastify/env'
import { FastifyEnvOptions } from '@fastify/env'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyInstance {
    config: { // this should be same as the confKey in options
      DB_URL: string,
      DB_PORT: number,
      DB_DATABASE: string,
      DB_USER: string,
      DB_PASSWORD: string
    };
  }
}

export default fp<FastifyEnvOptions>(async (fastify) => {
  
  const schema = {
    type: 'object',
    required: ['DB_USER', 'DB_PASSWORD'],
    properties: {
      DB_URL: {
        type: 'string'
      },
      DB_PORT: {
        type: 'number'
      },
      DB_DATABASE: {
        type: 'string'
      },
      DB_USER: {
        type: 'string'
      },
      DB_PASSWORD: {
        type: 'string'
      }
    }
  }

  await fastify.register(fastifyEnv, {
    confKey: 'config',
    dotenv: true,
    data: process.env,
    schema: schema
  }).ready((err) => {
    if (err) {
      throw err
    } else {
      console.log('config ready:')
      console.log(fastify.config)
    }
  })
}, {
  name: 'config',
})
