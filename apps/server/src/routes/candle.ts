import { getCandles, getCandle } from '../models/candle';
import { Router } from 'express';
import { subtractPoint } from '../models/user';
import { authorize } from '../service/auth';
import { UserType } from '@isttp/schemas/all';

const router: Router = Router();

router.get('/candle', async (req, res) => {
  try {
    const candles = await getCandles();
    res.status(200).json(candles);
  } catch (error) {
    console.log(error);
    res.status(500).json(`장식초 정보 조회 실패: ${error}`);
  }
});

router.get('/candle/:candleId', async (req, res) => {
  const candleId = Number(req.params.candleId);

  try {
    const candle = await getCandle(candleId);

    if (candle) {
      res.status(200).json(candle);
    } else {
      res.status(404).json({ message: '해당 장식초를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `장식초 정보 조회 실패: ${error}` });
  }
});

router.post('/candle', authorize, async (req, res) => {
  const userId = req.userId;
  const { point } = req.body;

  try {
    const user = UserType.parse(await subtractPoint(userId, Number(point)));
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `장식초 구매 실패: ${error}` });
  }
});

export default router;
