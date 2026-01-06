import { Router } from 'express';
import { updateCityToday } from '../controllers/admin.controller';
import { adminAuth } from '../middleware/admin-auth.middleware';

const router = Router();

router.post('/city/update', adminAuth, updateCityToday);

export default router;
