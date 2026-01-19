import { Request, Response } from 'express';
import { CityService } from '../services/city.service';

export async function getCityToday(req: Request, res: Response) {
  try {
    const city = req.params.city.toLowerCase().trim();
    const today = new Date().toISOString().split('T')[0];

    const data = await CityService.getTodayByCity(city, today);

    // Always return 200 for SEO & frontend simplicity
    return res.status(200).json({
      city,
      date: today,
      today_special: data?.today_special ?? null,
      petrol: data?.petrol ?? null,
      gold_22k: data?.gold_22k ?? null,
      sunrise: data?.sunrise ?? null,
      sunset: data?.sunset ?? null,
      tithi: data?.tithi ?? null,
      rahu_kalam: data?.rahu_kalam ?? null,
      yamagandam: data?.yamagandam ?? null,
      power_cut: data?.power_cut ?? null,
      water_issue: data?.water_issue ?? null,
      traffic: data?.traffic ?? null
    });

  } catch (error) {
    console.error('City Today Controller Error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}
