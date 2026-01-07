export interface RateLimitRepository {
  increment(key: string): Promise<number>
}