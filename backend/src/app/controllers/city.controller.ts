import { Request, Response } from 'express';
import { TodayService } from '../services/today.service';

export async function getCityToday(req: Request, res: Response) {
  try {
    const city = req.params.city.toLowerCase();
    const today = new Date().toISOString().split('T')[0];

    const data = await TodayService.getTodayByCity(city, today);

    return res.status(200).json({
      city,
      date: today,
      today_special: data?.today_special ?? null
    });

  } catch (error) {
    console.error('City Today Controller Error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}
