export const isValidPhoneNumber = (phone) => {
  const regex = /^1\d{10}$/;
  return regex.test(phone);
}

export const isValidSMSCode = (code) => {
  const regex = /^\d{6}$/;
  return regex.test(code);
}
