type Entry = {
  count: number
  expiresAt: number
}

export class InMemoryRateLimitRepository {
  private store = new Map<string, Entry>()

  async increment(
    key: string,
    windowInSeconds: number
  ): Promise<number> {
    const now = Date.now()
    const entry = this.store.get(key)

    if (!entry || entry.expiresAt < now) {
      const expiresAt = now + windowInSeconds * 1000
      this.store.set(key, { count: 1, expiresAt })
      return 1
    }

    entry.count += 1
    return entry.count
  }
}
