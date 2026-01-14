import { Router } from 'express';
import { getTodayCityData } from '../controllers/today.controller';

const router = Router();
router.get('/:city', getTodayCityData);

export default router;
