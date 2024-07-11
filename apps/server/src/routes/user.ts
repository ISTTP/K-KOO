import 'dotenv/config';
import { authorize } from '../service/auth';
import { getUser } from '../models/user';
import { Router } from 'express';

const router: Router = Router();

router.get('/user/me', async (req, res) => {
  const { newRes, userId } = await authorize(req, res);
  console.log(newRes);
  if (newRes.statusCode === 200 && userId) {
    const data = await getUser(userId);
    newRes.json(data);
  } else {
    newRes.json(null);
  }
});

export default router;
