import { Stack } from '@mui/material';
import { stat } from 'fs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { remote_data } from './dbData';
import { IChartData, IRequest } from './types/types';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { MyChart } from './components/Chart';
import { initChart } from './init';
import { ChartView } from './components/ChartView';

// const { io } = require('socket.io-client');

function App() {
  // const [date, setDate] = useState(new Date(Date.now()));
  // const [date, setDate] = useState(new Date('2022-01-01'));
  // const [range, setRange] = useState(1);
  // let [req, set_req] = useState<IRequest>({ date: new Date('2022-01-01'), range: 1 });
  let [req, set_req] = useState<IRequest>({ startData: new Date('2022-01-01'), endData: new Date('2022-01-02') });
  const [stat, setStat] = useState({ visitCount: 0, online: 0 });
  const currSensData = remote_data[0][0];
  // const dataSets = remote_data[0].slice(0, 24);
  let [tick, set_tick] = useState(false);
  // let [fetchRes, set_fetchRes] = useState({} as Promise<Response>);
  // let [fetchRes, set_fetchRes] = useState(fetchData(date, range));

  var inData: IChartData | undefined;
  let [chartData, set_chartData] = useState(inData); //{} as IChartData

  function fetchData(startData: Date, endData: Date) {
    // console.log(date);
    // dispatch(
    //   getSensData({
    //     date: date,
    //     range: range,
    //     func: convertArrObjectsToObjectPropertyArrays,
    //   })
    // );
    console.log('fetchData: ');

    return fetch('http://localhost:3009/weather/getSensData', {
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

  // const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];

  // const convertArrObjectsToObjectPropertyArrays = (arrObjects: ISensData[]) => {
  //   const out = {} as IChartData;
  //   if (arrObjects.length !== 0) {
  //     // let o = arrObjects[0];
  //     // let key: keyof ISensData;
  //     // for(key  in o) {
  //     //   out[key] = [];
  //     // }

  //     arrObjects.forEach((el) => {
  //       let key: keyof ISensData;
  //       for (key in el) {
  //         // const d = el[key];
  //         out[key].push(el[key] as never);
  //       }
  //     });
  //   }
  //   return out;
  // };

  // function fetchData(date: Date, range: number) {
  //   // console.log(date);
  //   // dispatch(
  //   //   getSensData({
  //   //     date: date,
  //   //     range: range,
  //   //     func: convertArrObjectsToObjectPropertyArrays,
  //   //   })
  //   // );
  //   console.log('fetchData: ');

  //   return fetch('http://localhost:3009/weather/getSensData', {
  //     body: JSON.stringify({ startData: date.toISOString(), range: range }),
  //     method: 'POST',
  //     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //     mode: 'cors', // WARN: обязательно! и на сервере разрешить корс
  //   })
  //     .then((request) => request.text())
  //     .then((text) => {
  //       return JSON.parse(text);
  //     })
  //     .catch((error) => {
  //       console.log('err fetch: ', error);
  //     });
  // }

  // const addDateDay = (date: Date, add: number) => {
  //   const dt = new Date(date);
  //   dt.setDate(dt.getDate() + add);
  //   return dt;
  // };

  // const onSetDate = (req: IRequest) => {
  //   set_req(req);
  //   // fetchData(date, range);
  // };

  // const onSetRange = (range: number) => {
  //   setRange(range);
  //   fetchData(date, range);
  // };

  useEffect(() => {
    const fu = async () => {
      const data = await fetchData(req.startData, req.endData);
      const out = MyChart.convertArrObjectsToObjectPropertyArrays(data);
      set_chartData(out);

      // MyChart.setData(data);
      // MyChart.resize();
      // set_tick((prev) => !prev);
    };

    fu();
  }, [req]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    initChart();
    // MyChart.setData(sensData);

    // TODO:
    // const socket = io('localhost:3000');
    // const socket = io('http://134.90.161.173:80');

    // socket.on('statistic', (payload) => {
    //   setStat(payload);
    // });

    const resize = () => {
      set_tick((prev) => !prev);
      MyChart.resize();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Stack sx={{ height: '100vh' }}>
      <Header currSensData={currSensData} />
      <ControlPanel onDate={set_req} />

      <ChartView chartData={chartData} />

      {/* {MyChart.render()} */}
      {/* <Spinner msg={dataStatus} img='media/snowflake.svg#snowflake'></Spinner> */}
    </Stack>
  );
}

export default App;
