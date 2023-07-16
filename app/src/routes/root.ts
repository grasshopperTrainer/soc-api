import { FastifyPluginAsync } from 'fastify'
import mercurius from 'mercurius'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
  `

  const resolvers = {
    Query: {
      add: async (z: any, { x, y }: { x: number, y: number }) => {
        console.log(z, x, y)
        return x + y
      }
    }
  }

  fastify.register(mercurius, {
    schema,
    resolvers
  })

  fastify.get('/', async function (request, reply) {
    const query = '{ add(x: 2, y: 2) }'
    return reply.graphql(query)
  })
}

export default root
