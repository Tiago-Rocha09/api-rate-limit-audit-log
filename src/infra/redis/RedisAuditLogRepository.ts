import { AuditLogRepository } from '../../audit/AuditLogRepository'
import { AuditLog } from '../../audit/types'
import { getRedisClient } from './client'

export class RedisAuditLogRepository implements AuditLogRepository {
  async save(log: AuditLog): Promise<void> {
    const client = getRedisClient()
    await client.rPush('audit_logs', JSON.stringify(log))
  }
}
