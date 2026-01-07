type AuditLog = {
  action: string
  actorId: string
  ip: string
  route: string
  method: string
  status: number
}

export class InMemoryAuditLogRepository {
  private logs: AuditLog[] = []

  async save(log: AuditLog): Promise<void> {
    this.logs.push(log)
  }

  getAll(): AuditLog[] {
    return this.logs
  }
}
