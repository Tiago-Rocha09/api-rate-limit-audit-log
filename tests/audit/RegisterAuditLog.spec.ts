import { RegisterAuditLog } from '../../src/audit/RegisterAuditLog'
import { InMemoryAuditLogRepository } from '../helpers/InMemoryAuditLogRepository'

describe('RegisterAuditLog', () => {
  it('should register an audit log with correct data', async () => {
    const repository = new InMemoryAuditLogRepository()
    const useCase = new RegisterAuditLog(repository)

    const input = {
      action: 'LOGIN',
      actorId: 'user-1',
      ip: '127.0.0.1',
      route: '/login',
      method: 'POST',
      status: 200,
    }

    await useCase.execute(input)

    const logs = repository.getAll()

    expect(logs).toHaveLength(1)
    expect(logs[0]).toMatchObject({
      action: 'LOGIN',
      actorId: 'user-1',
      ip: '127.0.0.1',
      route: '/login',
      method: 'POST',
      status: 200,
    })
  })
})
