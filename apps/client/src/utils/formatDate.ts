/**
 * YYYY.MM.DD 형식으로 날짜 포맷
 */
export function formatDate(target: string) {
  const date = new Date(target);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
}
