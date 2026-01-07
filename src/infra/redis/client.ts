import { createClient } from 'redis'

let redisClient: ReturnType<typeof createClient> | null = null

export function getRedisClient() {
  if (!redisClient) {
    const {
      REDIS_HOST,
      REDIS_PORT,
      REDIS_PASSWORD,
      REDIS_DB,
    } = process.env

    if (!REDIS_HOST || !REDIS_PORT) {
      throw new Error('Redis environment variables are not defined')
    }

    redisClient = createClient({
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      },
      password: REDIS_PASSWORD,
      database: Number(REDIS_DB ?? 0),
    })

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
    })
  }

  return redisClient
}

export async function connectRedis() {
  const client = getRedisClient()

  if (!client.isOpen) {
    await client.connect()
    console.log('✅ Redis connected')
  }
}
