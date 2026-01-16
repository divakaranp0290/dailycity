import { Router } from 'express';
import { getCityToday } from '../controllers/city.controller';

const router = Router();

router.get('/:city', getCityToday);

export default router;
