import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { checkValidation } from '@isttp/utils/all';
import { Router } from 'express';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/user/:userId', async (req, res) => {
  const userId = Number(req.params.userId);

  const user = await prisma.user.findFirst({
    where: {
      userId: userId,
    },
  });

  const result = await checkValidation({
    userId: userId,
    accessToken: req.cookies.ACT,
    refreshToken: req.cookies.RFT,
  });

  switch (result?.message) {
    case 'ACCESS_VALID':
      res.status(200).json({ user });
      break;
    case 'REFRESH_VALID':
      res
        .clearCookie('ACT')
        .clearCookie('RFT')
        .status(200)
        .setHeader('Set-Cookie', [
          `ACT=${result.accessToken}; HttpOnly; Path=/; SameSite=Lax;`,
          `RFT=${result.refreshToken}; HttpOnly; Path=/; SameSite=Lax;`,
        ])
        .json({ user });
      break;
    case 'EXPIRED':
      res.status(401).json(null);
      break;
  }
});

export default router;
