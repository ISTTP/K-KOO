import 'dotenv/config';
import { authorize } from '../service/auth';
import { getUser } from '../models/user';
import { Router } from 'express';

const router: Router = Router();

router.get('/user/me', authorize, async (req, res) => {
  const userId = req.userId;
  const data = await getUser(userId);
  res.status(200).json(data);
});

router.get('/user/year', authorize, async (req, res) => {
  const userId = req.userId;
  const data = await getUser(userId);

  const startYear = data?.createdAt.getFullYear();
  res.status(200).json(startYear);
});

export default router;
