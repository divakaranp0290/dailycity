import { Request, Response } from 'express';
import { TodayService } from '../services/today.service';

export const getTodayCityData = async (req, res) => {
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
    console.error('Today Controller Error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

