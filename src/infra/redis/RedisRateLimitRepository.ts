import { RateLimitRepository } from '../../rate-limit/RateLimitRepository'
import { getRedisClient } from './client'

export class RedisRateLimitRepository implements RateLimitRepository {
  async increment(key: string): Promise<number> {
    const client = getRedisClient()
    return client.incr(key)
  }
}
