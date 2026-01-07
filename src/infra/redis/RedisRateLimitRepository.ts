import { RateLimitRepository } from '../../rate-limit/RateLimitRepository'
import { getRedisClient } from './client'

export class RedisRateLimitRepository implements RateLimitRepository {
  async increment(
    key: string,
    windowInSeconds: number
  ): Promise<number> {
    const client = getRedisClient()

    const value = await client.incr(key)

    if (value === 1) {
      await client.expire(key, windowInSeconds)
    }

    return value
  }
}
