/* eslint-disable @typescript-eslint/naming-convention */
import 'dotenv/config';
import OpenAI from 'openai';
import { RateLimitError } from 'openai';
import { getKeywordRes } from '@isttp/schemas/all';

const keywords = [
  '사랑',
  '우정',
  '장난',
  '친구',
  '눈물',
  '응원',
  '감사',
  '행복',
  '추억',
  '감동',
  '행운',
];

const systemMessage = [
  '당신은 편지 내용을 읽고 편지의 내용을 암시할 수 있는 hashtag를 JSON 형태로 반환하는 도우미입니다.',
  `hashtag는 [${keywords.join(', ')}] 중 1개만 반환해주세요.`,
  `ex. { "hashtag": "${keywords[0]}" }`,
];

export async function getKeyword(contents: string) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage.join('\n'),
        },
        {
          role: 'user',
          content: `다음 편지에 달 수 있는 해시태그는? \n 편지 내용: ${contents}`,
        },
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;
    const hashtag = getKeywordRes.parse(JSON.parse(String(result))).hashtag;
    return hashtag;
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('OpenAI API Rate Limit Error: ', error);
    }
    return '축하';
  }
}
