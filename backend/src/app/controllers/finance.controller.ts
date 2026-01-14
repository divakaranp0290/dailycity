import { Request, Response } from 'express';
import { FinanceService } from '../services/finance.service';


export const getPetrolPriceToday = async (req: Request, res: Response) => {
  try {
    const city = req.params.city.toLowerCase().trim();
    const today = new Date().toISOString().split('T')[0];

    const petrol = await FinanceService.fetchPetrolPrice(city, today);

    
    return res.status(200).json({
      city,
      date: today,
      petrol: petrol ?? null
    });

  } catch (error) {
    console.error('Petrol Controller Error:', error);

    
    return res.status(200).json({
      city: req.params.city,
      petrol: null
    });
  }
};

export const getGoldRateToday = async (req: Request, res: Response) => {
  try {
    const city = req.params.city.toLowerCase().trim();
    const today = new Date().toISOString().split('T')[0];

    const gold22k = await FinanceService.fetchGoldRate22K(city, today);

    // ✅ Always 200
    return res.status(200).json({
      city,
      date: today,
      gold_22k: gold22k ?? null
    });

  } catch (error) {
    console.error('Gold Controller Error:', error);
    return res.status(200).json({
      city: req.params.city,
      gold_22k: null
    });
  }
};
