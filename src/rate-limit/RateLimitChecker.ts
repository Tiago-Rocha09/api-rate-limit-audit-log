import { RateLimitExceededError } from './errors'
import { RateLimitRepository } from './RateLimitRepository'
import { RateLimitPolicy } from './RateLimitPolicy'

export class RateLimitChecker {
  constructor(private repository: RateLimitRepository) {}

  async check(policy: RateLimitPolicy, key: string): Promise<void> {
    const currentCount = await this.repository.increment(key)

    if (currentCount > policy.maxRequests) {
      throw new RateLimitExceededError()
    }
  }
}
