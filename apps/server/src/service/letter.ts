export function getLetterYearBasedOnBirthday(birthday: Date) {
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );

  return today > thisYearBirthday
    ? today.getFullYear() + 1
    : today.getFullYear();
}
