export const formatDateStr = (str: string) => {
  let data = new Date(str);
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
