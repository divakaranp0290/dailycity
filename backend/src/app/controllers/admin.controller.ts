import { Request, Response } from 'express';
import { CityService } from '../services/city.service';
import { AdminAuditService } from '../services/admin-audit.service';
import { db } from '../utils/db';


export async function getAdminCities(req: Request, res: Response) {
  try {
    const cities = await CityService.getAllCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Get Cities Error:', error);
    return res.status(500).json({
      message: 'Failed to fetch cities'
    });
  }
}

export async function copyYesterdayData(req: Request, res: Response) {
  try {
    const city = req.params.city.toLowerCase().trim();

    const data = await CityService.getYesterdayByCity(city);

    if (!data) {
      return res.status(200).json(null);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Copy Yesterday Error:', error);
    return res.status(500).json({
      message: 'Failed to copy yesterday data'
    });
  }
}

export async function upsertCityToday(req: Request, res: Response) {
  try {
    const {
      city,
      date,
      sunrise,
      sunset,
      tithi,
      rahu_kalam,
      yamagandam,
      today_special,
      petrol,
      gold_22k,
      silver,
      power_cut,
      water_issue,
      traffic
    } = req.body;

    if (!city || !date) {
      return res.status(400).json({
        message: 'City and date are required'
      });
    }

    const result = await CityService.upsertToday({
      city: city.toLowerCase().trim(),
      date,
      sunrise,
      sunset,
      tithi,
      rahu_kalam,
      yamagandam,
      today_special,
      petrol,
      gold_22k,
      silver,
      power_cut,
      water_issue,
      traffic
    });

    // 🔐 AUDIT LOG
    await AdminAuditService.logAction(
      'UPDATE',
      city,
      date,
      req.body,
      req.ip
    );

    return res.status(200).json({
      message: 'City daily data updated successfully',
      data: result
    });

  } catch (error) {
    console.error('Admin Update Error:', error);
    return res.status(500).json({
      message: 'Failed to update city data'
    });
  }
}

export async function getAuditLogs(req: Request, res: Response) {
  try {
    const result = await db.query(
      `
      SELECT *
      FROM admin_audit_logs
      ORDER BY created_at DESC
      LIMIT 100
      `
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch audit logs'
    });
  }
}





