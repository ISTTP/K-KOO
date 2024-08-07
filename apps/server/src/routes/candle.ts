import { getCandles, getCandle } from '../models/candle';
import { Router } from 'express';
import { subtractPoint } from '../models/user';
import { authorize } from '../service/auth';
import { user } from '@isttp/schemas/all';

const router: Router = Router();

router.get('/candle', async (req, res) => {
  try {
    const candles = await getCandles();
    res.status(200).json(candles);
  } catch (error) {
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
    res.status(500).json({ message: `장식초 정보 조회 실패: ${error}` });
  }
});

router.post('/candle/purchase', authorize, async (req, res) => {
  const userId = req.userId;
  const { point } = req.body;

  try {
    const updated = await subtractPoint(userId, point);
    const safe = user.parse(updated);
    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ message: `장식초 구매 실패: ${error}` });
  }
});

export default router;
