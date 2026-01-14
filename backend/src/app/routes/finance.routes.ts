import { Router } from 'express';
import { getGoldRateToday, getPetrolPriceToday } from '../controllers/finance.controller';

const router = Router();

// Petrol price today
router.get('/petrol/:city', getPetrolPriceToday);
router.get('/gold/:city', getGoldRateToday);

export default router;
