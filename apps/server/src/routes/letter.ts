import { Router } from 'express';
import prisma from '@isttp/db/all';
import { getKeyword } from '../service/keyword';
import { getLetterYearBasedOnBirthday } from '../service/letter';
import { createLetter } from '../models/letter';
import { getUser, getUserBirthday, addPoint } from '../models/user';
import { authorize } from '../service/auth';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../service-account.json';
import {
  getLetterReq,
  LetterRequestType,
  LetterResponseType,
  BirthdayType,
  user,
} from '@isttp/schemas/all';

const router: Router = Router();

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

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

    if (senderId !== '') {
      user.parse(await addPoint(senderId, 100));
    }

    const recipient = await getUser(recipientId);
    const fcmToken = recipient?.fcmToken;

    if (fcmToken) {
      const message = {
        notification: {
          title: '새 편지가 도착했습니다!',
          body: `${nickname}님으로부터 ${keyword} 편지가 도착했습니다.`,
        },
        token: fcmToken,
      };

      firebaseAdmin
        .messaging()
        .send(message)
        .then((response) => {
          console.log('알림 생성 성공', response);
        })
        .catch((error) => {
          console.log('알림 생성 실패', error);
        });
    }

    res.status(200).json(letter);
  } catch (error) {
    res.status(500).json({ message: `편지 작성 실패: ${error}` });
  }
});

router.get('/letter/:letterId', authorize, async (req, res) => {
  const userId = req.userId;
  const result = getLetterReq.parse(req);
  const letterId = result.params.letterId;

  try {
    const userData = await getUser(userId);

    const today = new Date();
    const birthday = userData!.birthday;

    const thisYearBday = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );

    const letter = await prisma.letter.findFirst({
      where: {
        letterId,
      },
      include: {
        candle: true,
      },
    });

    if (!letter) {
      return res.status(500).json({ message: '편지가 존재하지 않습니다' });
    }

    const createdAt = letter.createdAt;
    console.log(createdAt);
    console.log(thisYearBday);

    if (createdAt <= today && today < thisYearBday) {
      return res.status(200).json({
        isOpen: false,
      });
    } else if (createdAt <= thisYearBday && thisYearBday <= today) {
      return res.status(200).json({
        isOpen: true,
        contents: letter.contents,
        nickname: letter.nickname,
        candleImageUrl: letter.candle.imageUrl,
      });
    } else if (thisYearBday < createdAt) {
      return res.status(200).json({
        isOpen: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: `편지 조회 실패 : ${error}` });
  }
});

export default router;
