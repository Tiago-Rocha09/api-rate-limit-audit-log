import { AuditLog } from './types'
import { AuditLogRepository } from './AuditLogRepository'

export class RegisterAuditLog {
  constructor(private repository: AuditLogRepository) {}

  async execute(input: AuditLog): Promise<void> {
    await this.repository.save(input)
  }
}
