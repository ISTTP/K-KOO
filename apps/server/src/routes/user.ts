import 'dotenv/config';
import { authorize } from '../service/auth';
import { getUser } from '../models/user';
import { Router } from 'express';

const router: Router = Router();

router.get('/user/me', async (req, res) => {
  await authorize(req, res, getUser);
});

export default router;
