import 'dotenv/config'
import { buildApp } from './infra/fastify/app'
import { connectRedis } from './infra/redis/client'

async function bootstrap() {
  await connectRedis()

  const app = buildApp()

  await app.listen({ port: 3000 })
  console.log('🚀 Server running on http://localhost:3000')
}

bootstrap()
