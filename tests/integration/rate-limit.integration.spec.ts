import request from 'supertest'
import { buildApp } from '../../src/infra/fastify/app'
import { InMemoryRateLimitRepository } from '../helpers/InMemoryRateLimitRepository'

describe('Rate limit integration', () => {
  it('should return 429 when rate limit is exceeded', async () => {
    const rateLimitRepository = new InMemoryRateLimitRepository()
    const app = buildApp({
      rateLimitRepository,
    })

    await app.ready()

    // Dentro do limite (maxRequests = 3)
    await request(app.server).get('/health')
    await request(app.server).get('/health')
    await request(app.server).get('/health')

    // Estoura o limite
    const response = await request(app.server).get('/health')

    expect(response.status).toBe(429)
    expect(response.body).toEqual({
      message: 'Too many requests',
    })

    await app.close()
  })
})
