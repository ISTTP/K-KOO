export function hideEmail(email: string) {
  const emailSplit = email.split('@');
  const emailLength = emailSplit[0].length;
  const emailHide = emailSplit[0].slice(0, 3) + '*'.repeat(emailLength - 3);

  return emailHide + '@' + emailSplit[1];
}
