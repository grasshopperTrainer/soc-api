import mysql from '@fastify/mysql'
import { MySQLOptions } from '@fastify/mysql'
import fp from 'fastify-plugin'

export default fp<MySQLOptions>(async (fastify) => {
  fastify.register(mysql, {
    connectionString: `mysql://${fastify.config.DB_USER}:${fastify.config.DB_PASSWORD}@${fastify.config.DB_URL}:${fastify.config.DB_PORT}/${fastify.config.DB_DATABASE}`
  })
}, {
  name: 'mysql',
  dependencies: ['config']
})
