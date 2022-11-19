import { Stack } from '@mui/material';
import { stat } from 'fs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CurrSensDataCard from './components/CurrSensData';
import Spinner from './components/Spinner/Spinner';
import SvgChart from './components/SvgChart';
import { remote_data } from './init/dbData';
import { chart, axisDefine } from './init/init';
import { ISensData } from './types/dtos';
import { IChartData } from './types/types';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';

// const { io } = require('socket.io-client');

function App() {
  const [date, setDate] = useState(new Date(Date.now()));
  // const [date, setDate] = useState(new Date('2021-11-01'));
  const [range, setRange] = useState(1);
  const [stat, setStat] = useState({ visitCount: 0, online: 0 });
  const currSensData = remote_data[0][0];
  const dataSets = remote_data[0].slice(0, 24);

  // const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];

  const convertArrObjectsToObjectPropertyArrays = (arrObjects: ISensData[]) => {
    const out = {} as IChartData;
    if (arrObjects.length !== 0) {
      // let o = arrObjects[0];
      // let key: keyof ISensData;
      // for(key  in o) {
      //   out[key] = [];
      // }

      arrObjects.forEach((el) => {
        let key: keyof ISensData;
        for (key in el) {
          // const d = el[key];
          out[key].push(el[key] as never);
        }
      });
    }
    return out;
  };

  const fetchData = (date: Date, range: number) => {
    // console.log(date);
    // dispatch(
    //   getSensData({
    //     date: date,
    //     range: range,
    //     func: convertArrObjectsToObjectPropertyArrays,
    //   })
    // );
  };

  // const addDateDay = (date: Date, add: number) => {
  //   const dt = new Date(date);
  //   dt.setDate(dt.getDate() + add);
  //   return dt;
  // };

  const onSetDate = (date: Date) => {
    setDate(date);
    fetchData(date, range);
  };

  // const onSetRange = (range: number) => {
  //   setRange(range);
  //   fetchData(date, range);
  // };

  useEffect(() => {
    // TODO:
    // const socket = io('localhost:3000');
    // const socket = io('http://134.90.161.173:80');

    // socket.on('statistic', (payload) => {
    //   setStat(payload);
    // });

    // console.log('App useEffect componentDidMount() fetchData');
    fetchData(date, range);
  }, []); // componentDidMount()

  return (
    <Stack sx={{ height: '100vh' }}>
      <Header currSensData={currSensData} />
      <ControlPanel />
      {/* <div className='chart bl bb'> */}
      <SvgChart options={chart} axis={axisDefine} dataSets={dataSets} />
      {/* <Spinner msg={dataStatus} img='media/snowflake.svg#snowflake'></Spinner> */}
      {/* </div> */}
    </Stack>
  );
}

export default App;
