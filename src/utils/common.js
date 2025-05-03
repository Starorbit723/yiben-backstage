export const isValidPhoneNumber = (phone) => {
  const regex = /^1\d{10}$/;
  return regex.test(phone);
}

export const isValidSMSCode = (code) => {
  const regex = /^\d{6}$/;
  return regex.test(code);
}

export const userType = [
  { label: '客户', value: 1 },
  { label: '员工', value: 2 },
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

export const workDayType = [
  { label: '工作日', value: 1 },
  { label: '休息日', value: 2 },
];

export const presentType = [
  { label: '未到场', value: '0' },
  { label: '已到场', value: '1' },
];

export const prepaidType = [
  { label: '未付款', value: '0' },
  { label: '已付款', value: '1' },
];

export const arrayToString = (arr) => {
  if (arr) {
    if (arr.length >= 2) {
      return arr.join('#');
    } else {
      return arr[0];
    }
  }
  return "";
};

export const stringToArray = (str) => {
  if (str.trim().length > 0) {
    let _arr = [];
    if (str.trim().indexOf('#') !== -1) {
      _arr = str.trim().split('#');
    } else {
      _arr.push(str.trim());
    }
    return _arr;
  }
  return [];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // 获取年月日、时分秒并填充为两位数
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 拼接格式化后的日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

