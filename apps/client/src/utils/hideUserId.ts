export function hideUserId(id: string) {
  const prevPart = id.slice(0, 2);
  const nextPart = id.slice(-2);
  const middlePart = id.slice(2, -2).replace(/./g, '*');

  return prevPart + middlePart + nextPart;
}
