import { Request, Response } from 'express';
import { SeoService } from '../services/seo.service';
import { CityService } from '../services/city.service';

export async function getCityToday(req: Request, res: Response) {
  const city = req.params.city.toLowerCase();
  const today = new Date().toISOString().split('T')[0];

  const data = await CityService.getTodayByCity(city, today);
  if (!data) return res.status(404).json({});

  return res.json({
    seo: SeoService.buildCityTodaySEO(city, data),
    data
  });
}
