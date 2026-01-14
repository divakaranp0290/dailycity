import { Router } from 'express';
import {
  upsertCityToday
} from '../controllers/admin.controller';
import { adminAuth } from '../middleware/admin-auth.middleware';


const router = Router();

router.post('/city/update', upsertCityToday);

export default router;
