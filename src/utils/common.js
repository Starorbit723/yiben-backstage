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

export const bookType = [
  { label: '单人试听', value: 1 },
  { label: '拼团试听', value: 2 }, 
];

export const bookStatus = [
  { label: '拼团中', value: 0 },
  { label: '已预约', value: 1 },
  { label: '校区确认中', value: 2 },
  { label: '待使用', value: 3 },
  { label: '已使用', value: 4 },
  { label: '已取消', value: 5 },
];
