import { Router } from 'express';
import { getKeyword } from '../service/keyword';
import { getLetterYearBasedOnBirthday } from '../service/letter';
import { createLetter } from '../models/letter';
import { getUserBirthday } from '../models/user';
import {
  LetterRequestType,
  LetterResponseType,
  BirthdayType,
} from '@isttp/schemas/all';

const router: Router = Router();

router.post('/letter', async (req, res) => {
  try {
    const { senderId, recipientId, candleId, nickname, contents } =
      LetterRequestType.parse(req.body);

    const { birthday } = BirthdayType.parse(await getUserBirthday(recipientId));
    const keyword = await getKeyword(contents);
    const year = getLetterYearBasedOnBirthday(birthday);

    const letter = LetterResponseType.parse(
      await createLetter({
        senderId,
        recipientId,
        candleId,
        nickname,
        contents,
        keyword,
        year,
      }),
    );

    res.status(200).json(letter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `편지 작성 실패: ${error}` });
  }
});

export default router;
