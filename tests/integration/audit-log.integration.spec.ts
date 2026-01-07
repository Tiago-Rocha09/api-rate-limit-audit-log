import request from 'supertest'
import { buildApp } from '../../src/infra/fastify/app'
import { InMemoryAuditLogRepository } from '../helpers/InMemoryAuditLogRepository'

describe('Audit log integration', () => {
  it('should register an audit log after a request', async () => {
    const auditLogRepository = new InMemoryAuditLogRepository()
    const app = buildApp({ auditLogRepository })

    await app.ready()

    const response = await request(app.server).get('/health')

    expect(response.status).toBe(200)

    const logs = auditLogRepository.getAll()

    expect(logs).toHaveLength(1)

    expect(logs[0]).toMatchObject({
      action: 'GET',
      actorId: 'anonymous',
      route: '/health',
      method: 'GET',
      status: 200,
    })

    await app.close()
  })
})
