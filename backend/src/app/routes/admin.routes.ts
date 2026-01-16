import { Router } from 'express';
import { upsertCityToday } from '../controllers/admin.controller';
import { adminAuth } from '../middleware/admin-auth.middleware';

const router = Router();

router.post('/admin/update', adminAuth, upsertCityToday);

export default router;
