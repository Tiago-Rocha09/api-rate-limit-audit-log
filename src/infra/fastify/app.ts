import Fastify from 'fastify'

import { RateLimitChecker } from '../../rate-limit/RateLimitChecker'
import { RateLimitPolicy } from '../../rate-limit/RateLimitPolicy'
import { RateLimitExceededError } from '../../rate-limit/errors'

import { RegisterAuditLog } from '../../audit/RegisterAuditLog'
import { InMemoryAuditLogRepository } from '../../../tests/helpers/InMemoryAuditLogRepository'
import { RedisRateLimitRepository } from '../redis/RedisRateLimitRepository'
import { RedisAuditLogRepository } from '../redis/RedisAuditLogRepository'
import { RateLimitRepository } from '../../rate-limit/RateLimitRepository'

type BuildAppOptions = {
  auditLogRepository?: InMemoryAuditLogRepository
  rateLimitRepository?: RateLimitRepository
}

export function buildApp(options?: BuildAppOptions) {
  const app = Fastify()

  const rateLimitRepository =
    options?.rateLimitRepository ?? new RedisRateLimitRepository()

  const auditLogRepository =
    options?.auditLogRepository ?? new RedisAuditLogRepository()

  const rateLimitChecker = new RateLimitChecker(rateLimitRepository)
  const registerAuditLog = new RegisterAuditLog(auditLogRepository)

  const policy: RateLimitPolicy = {
    maxRequests: 3,
    windowInSeconds: 20,
  }

  app.addHook('onRequest', async (request, reply) => {
    const key = `ip:${request.ip}`

    try {
      await rateLimitChecker.check(policy, key)
    } catch (error) {
      if (error instanceof RateLimitExceededError) {
        reply.status(429).send({ message: 'Too many requests' })
        return
      }
      throw error
    }
  })

  app.addHook('onResponse', async (request, reply) => {
    const route =
      request.routeOptions.url ??
      request.raw.url ??
      'unknown'

    await registerAuditLog.execute({
      action: request.method,
      actorId: 'anonymous',
      ip: request.ip,
      route,
      method: request.method,
      status: reply.statusCode,
    })
  })

  app.get('/health', async () => {
    return { status: 'ok' }
  })

  return app
}
