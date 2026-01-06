import { Request, Response } from 'express';
import { fetchCityToday } from '../services/city.service';

export async function getCityToday(req: Request, res: Response) {
  const city = req.params.city;

  const data = await fetchCityToday(city);

  if (!data) {
    return res.status(404).json({ message: 'No data for today' });
  }

  res.json(data);
}
