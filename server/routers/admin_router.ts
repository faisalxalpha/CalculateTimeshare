
import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/admin_controller';
import { login, authenticate } from '../auth';

const router = Router();

router.post('/login', login);
router.get('/settings', authenticate, getSettings);
router.post('/settings', authenticate, updateSettings);

export const adminRouter = router;
