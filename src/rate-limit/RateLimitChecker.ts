import { RateLimitPolicy } from './RateLimitPolicy'
import { RateLimitRepository } from './RateLimitRepository'
import { RateLimitExceededError } from './errors'

export class RateLimitChecker {
  constructor(
    private readonly repository: RateLimitRepository
  ) {}

  async check(policy: RateLimitPolicy, key: string): Promise<void> {
    const current = await this.repository.increment(
      key,
      policy.windowInSeconds
    )

    if (current > policy.maxRequests) {
      throw new RateLimitExceededError()
    }
  }
}
