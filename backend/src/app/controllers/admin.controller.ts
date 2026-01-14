import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export const upsertCityToday = async (req: Request, res: Response) => {
  try {
    const {
      city,
      date,
      today_special,
      petrol,
      diesel,
      gold_22k,
      silver
    } = req.body;

    await AdminService.upsertCityTodayData({
      city: city.toLowerCase().trim(),
      date,
      today_special,
      petrol,
      diesel,
      gold_22k,
      silver
    });

    return res.status(200).json({
      message: 'City daily data saved successfully'
    });

  } catch (error) {
    console.error('Admin UPSERT Error:', error);
    return res.status(500).json({
      message: 'Failed to save city daily data'
    });
  }
};
