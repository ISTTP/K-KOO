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

export default router;
