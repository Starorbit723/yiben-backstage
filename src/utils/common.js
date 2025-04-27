export const isValidPhoneNumber = (phone) => {
  const regex = /^1\d{10}$/;
  return regex.test(phone);
}

export const isValidSMSCode = (code) => {
  const regex = /^\d{6}$/;
  return regex.test(code);
}

export const userType = [
  { label: '客户', value: 0 },
  { label: '销售', value: 1 },
  { label: '老师', value: 2 }, 
];

export const gender = [
  { label: '未知', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 }, 
];

