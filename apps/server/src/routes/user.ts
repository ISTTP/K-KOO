import { authorize } from '../service/auth';
import { getUser, setUser } from '../models/user';
import { Router } from 'express';
import { user } from '@isttp/schemas/all';

const router: Router = Router();

router.get('/user/me', authorize, async (req, res) => {
  const userId = req.userId;
  const data = await getUser(userId);
  const safe = user.parse(data);
  res.status(200).json(safe);
});

router.put('/user/me', authorize, async (req, res) => {
  const userId = req.userId;
  const reqBody = req.body;

  try {
    const updated = await setUser(userId, reqBody);
    const safe = user.parse(updated);
    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ message: `사용자 정보 수정 실패: ${error}` });
  }
});

router.get('/user/year', authorize, async (req, res) => {
  const userId = req.userId;
  const data = await getUser(userId);

  const startYear = data?.createdAt.getFullYear();
  res.status(200).json({ year: startYear });
});

export default router;
