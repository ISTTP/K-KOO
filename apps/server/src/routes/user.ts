import { authorize } from '../service/auth';
import { getUser, getUserBirthday, setUser, getUserFromEmail } from '../models/user';
import { Router } from 'express';
import { user } from '@isttp/schemas/all';
import prisma from '@isttp/db/all';

const router: Router = Router();

router.get('/user/me', authorize, async (req, res) => {
  try {
    const userId = req.userId;
    const data = await getUser(userId);
    const safe = user.parse(data);
    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ message: `사용자 정보 조회 실패: ${error}` });
  }
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

router.put('/user/token', authorize, async (req, res) => {
  const { token } = req.body;
  const userId = req.userId;
  try {
    const data = await getUser(userId);

    if (!data?.fcmToken) {
      await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          fcmToken: token,
        },
      });
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'FCM 토큰 저장 실패 : ', error });
  }
});

router.get('/user/birthday/:userId', async (req, res) => {
  const userId = req.params.userId;
  const data = await getUserBirthday(userId);

  if (!data) {
    res.status(400).json({ message: '생일 정보가 없습니다.' });
    return;
  }

  res.status(200).json({ birthday: data.birthday });
});

router.get('/user/id/:email', async (req, res) => {
  const email = req.params.email;
  const data = await getUserFromEmail(email);

  if (!data) {
    res.status(400).json({ message: '사용자 정보가 없습니다.' });
    return;
  }

  res.status(200).json({ id: data.id, createdAt: data.createdAt });
});

export default router;

