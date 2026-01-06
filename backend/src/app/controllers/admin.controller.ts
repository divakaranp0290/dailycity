import { Request, Response } from 'express';
import { upsertCityToday } from '../services/admin.service';

export async function updateCityToday(req: Request, res: Response) {
  try {
    await upsertCityToday(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}
