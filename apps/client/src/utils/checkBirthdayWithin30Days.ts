export function checkBirthdayWithin30Days(birthday: string): boolean {
  const today = new Date();
  const birth = new Date(birthday);
  const diff = Math.abs(today.getTime() - birth.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  return diffDays === 0 || diffDays <= 30
}
