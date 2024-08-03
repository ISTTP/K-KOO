import 'dotenv/config';
import { Router } from 'express';
import { checkUser } from '../service/auth';
import { getUserFromEmail } from '../models/user';
import { createVerifyInfo, getVerifyInfo } from '../models/verify';
import axios from 'axios';

const router: Router = Router();

/* 아이디 중복 확인 */
router.post('/verify/id', async (req, res) => {
  const { id } = req.body;

  try {
    const userId = await checkUser('default', id);
    res.status(200).json({ isDuplicate: !!userId });
  } catch (error) {
    res.status(500).json({ message: `아이디 중복 체크 실패 : ${error}` });
  }
});

/* 이메일 인증 코드 전송, DB 저장 */
router.post('/verify/email', async (req, res) => {
  const { email } = req.body;

  // 이메일 중복 확인
  const user = await getUserFromEmail(email);
  if (user) {
    res.status(400).json({ message: '이미 가입된 이메일' });
    return;
  }

  const code = Math.floor(Math.random() * 1000000)
  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      to_email: email,
      code,
    }
  }

  try {
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(
      async (response) => {
        await createVerifyInfo({ email, code })
        res.status(200).json({ message: '인증 이메일 전송 성공' });
      },
      (error) => {
        res.status(500).json({ message: `인증 이메일 전송 실패 : ${error}` });
      }
    );
  } catch (error) {
    res.status(500).json({ message: `서버 에러 : ${error}` });
  }
});

router.get('/verify/email', async (req, res) => {
  const email = String(req.query.email);
  const code = Number(req.query.code);

  try {
    const verifyInfo = await getVerifyInfo(email);

    if (!verifyInfo) {
      res.status(400).json({ message: '이메일 인증 정보 없음' });
      return;
    }

    if (verifyInfo.code === code) {
      res.status(200).json({ message: '이메일 인증 성공' });
    } else {
      res.status(400).json({ message: '이메일 인증 실패' });
    }
  } catch (error) {
    res.status(500).json({ message: `이메일 인증 정보 가져오기 실패 : ${error}` });
  }
});

export default router;
