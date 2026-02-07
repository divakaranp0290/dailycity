import { Request, Response } from 'express';
import { CityService } from '../services/city.service';
import { AdminAuditService } from '../services/admin-audit.service';
import { db } from '../utils/db';

/* =====================================================
   GET ALL CITIES (ADMIN DROPDOWN)
   ===================================================== */
export async function getAdminCities(req: Request, res: Response) {
  try {
    const cities = await CityService.getAllCities();
    return res.status(200).json(cities);
  } catch (error: any) {
    console.error('Get Cities Error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch cities' });
  }
}

/* =====================================================
   COPY YESTERDAY DATA (ADMIN BUTTON)
   ===================================================== */
export async function copyYesterdayData(req: Request, res: Response) {
  try {
    const city = req.params.city.toLowerCase().trim();
    const data = await CityService.getYesterdayByCity(city);
    return res.status(200).json(data || null);
  } catch (error: any) {
    console.error('Copy Yesterday Error:', error.message);
    return res.status(500).json({ message: 'Failed to copy yesterday data' });
  }
}

/* =====================================================
   UPSERT CITY TODAY DATA (ADMIN UPDATE)
   ===================================================== */
export async function upsertCityToday(req: Request, res: Response) {
  try {
    const { city, date } = req.body;

    if (!city || !date) {
      return res.status(400).json({
        message: 'City and date are required'
      });
    }

    // 🔐 Normalize + trust service for casting
    const payload = {
      ...req.body,
      city: city.toLowerCase().trim(),
      date: new Date(req.body.date).toISOString().split('T')[0]
    };
    console.log('REQ BODY:', req.body);
    const result = await CityService.upsertToday(payload);

    // 🔍 Audit log
    await AdminAuditService.logAction(
      'UPDATE',
      payload.city,
      payload.date,
      payload,
      req.ip
    );

    return res.status(200).json({
      message: 'City daily data updated successfully',
      data: result
    });

  } catch (error: any) {
    // 🔥 THIS IS CRITICAL FOR DEBUGGING 500 ERRORS
    console.error('Admin Update Error:', {
      message: error.message,
      detail: error.detail,
      stack: error.stack
    });

    return res.status(500).json({
      message: 'Failed to update city data',
      error: error.message
    });
  }
}

/* =====================================================
   ADMIN AUDIT LOGS
   ===================================================== */
export async function getAuditLogs(req: Request, res: Response) {
  try {
    const result = await db.query(`
      SELECT *
      FROM admin_audit_logs
      ORDER BY created_at DESC
      LIMIT 100
    `);

    return res.status(200).json(result.rows);
  } catch (error: any) {
    console.error('Audit Logs Error:', error.message);
    return res.status(500).json({
      message: 'Failed to fetch audit logs'
    });
  }
}
