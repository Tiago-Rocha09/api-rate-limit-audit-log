export interface RateLimitRepository {
  increment(
    key: string,
    windowInSeconds: number
  ): Promise<number>
}
