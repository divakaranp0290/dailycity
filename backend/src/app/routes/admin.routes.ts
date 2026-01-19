import { Router } from 'express';
import { copyYesterdayData, getAdminCities, getAuditLogs, upsertCityToday } from '../controllers/admin.controller';
import { adminAuth } from '../middleware/admin-auth.middleware';

const router = Router();

router.post('/admin/update', adminAuth, upsertCityToday);
router.get('/admin/cities', adminAuth, getAdminCities);
router.get(
  '/admin/copy-yesterday/:city',
  adminAuth,
  copyYesterdayData
);
router.get('/admin/audit-logs', adminAuth, getAuditLogs);
router.get('/admin/cities', adminAuth, getAdminCities);

export default router;
