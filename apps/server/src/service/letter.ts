export function getLetterYearBasedOnBirthday(birthday: Date): number {
  const today = new Date();

  const thisYearBdayAfter7 = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate() + 7,
  );

  return today > thisYearBdayAfter7
    ? today.getFullYear() + 1
    : today.getFullYear();
}
