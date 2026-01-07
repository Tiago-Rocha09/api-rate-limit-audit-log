import { AuditLog } from './types'

export interface AuditLogRepository {
  save(log: AuditLog): Promise<void>
}
