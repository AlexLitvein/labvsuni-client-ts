// function fetchData(startData: Date, endData: Date) {
export function fetchData(startData: Date, range: number) {
  const endData = new Date(startData);
  endData.setDate(endData.getDate() + range);

  console.log('fetchData_req->', {
    startData: startData.toISOString(),
    endData: endData.toISOString(),
  });

  return fetch('http://localhost:80/weather/getSensData', {
    body: JSON.stringify({ startData: startData.toISOString(), endData: endData.toISOString() }),
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    mode: 'cors', // WARN: обязательно! и на сервере разрешить корс
  })
    .then((request) => request.text())
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((error) => {
      console.log('err fetch: ', error);
    });
}
