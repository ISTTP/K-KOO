import { getCandles } from '../models/candle';
import { Router } from 'express';

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

export default router;
