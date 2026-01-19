import { db } from '../utils/db';

export class AdminAuditService {

  static async logAction(
    action: string,
    city: string,
    date: string,
    payload: any,
    ip?: string
  ) {
    await db.query(
      `
      INSERT INTO admin_audit_logs
      (action, city, date, payload, ip_address)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        action,
        city,
        date,
        JSON.stringify(payload),
        ip ?? null
      ]
    );
  }
}
