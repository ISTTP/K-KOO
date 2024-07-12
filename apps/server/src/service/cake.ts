import { getUser, setUser } from '../models/user';

export async function getCakeColor(userId: string) {
  try {
    const userInfo = await getUser(userId);
    if (!userInfo) throw new Error('사용자 정보를 찾을 수 없습니다.');
    const { sheetColor, creamColor } = userInfo;
    return { sheetColor, creamColor };
  } catch (error) {
    throw new Error('색상 정보를 불러오는데 실패했습니다.');
  }
}

export async function setCakeColor({
  userId,
  sheetColor,
  creamColor,
}: {
  userId: string;
  sheetColor: string;
  creamColor: string;
}) {
  try {
    await setUser(userId, {
      sheetColor,
      creamColor,
    });

    return { sheetColor, creamColor };
  } catch (error) {
    throw new Error('색상 정보를 저장하는데 실패했습니다.');
  }
}
