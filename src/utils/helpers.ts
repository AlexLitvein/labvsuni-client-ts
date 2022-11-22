export const formatDateStr = (str: string) => {
  // let data = new Date(str);
  let data = dateSubTimeOffset(new Date(str));
  // let dataStr = ('0' + data.getHours()).slice(-2) + '/' + ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() % 100;
  let dataStr =
    ('0' + data.getDate()).slice(-2) +
    '/' +
    ('0' + (data.getMonth() + 1)).slice(-2) +
    '/' +
    (data.getFullYear() % 100) +
    '-' +
    ('0' + data.getHours()).slice(-2) +
    ':00';
  return dataStr;
};

export function dateSubTimeOffset(date: Date) {
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  return date;
}

export const dateNowSubTimeOffset = () => {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  return date;
};

export const aprox = (v1: number, v2: number, range: number, posInRange: number) => {
  return v1 + ((v2 - v1) * posInRange) / range;
};
