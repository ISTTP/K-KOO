export function getLetterYearBasedOnBirthday(birthday: Date): number {
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );

  // 생일 기준으로 30일 이후인지 확인
  const timeDifference = thisYearBirthday.getTime() - today.getTime();
  const daysUntilBirthday = timeDifference / (1000 * 60 * 60 * 24);

  return daysUntilBirthday <= 30 && daysUntilBirthday >= 0
    ? today.getFullYear()
    : today.getFullYear() + 1;
}
