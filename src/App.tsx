import React, { ChangeEvent, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { remote_data } from './dbData';
import { IChartData } from './types/types';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { MyChart } from './components/Chart';
import { initChart } from './init';
import { ChartView } from './components/ChartView';
import { fetchData } from './api/fetch';
import { IResponseSensData, ISensData } from './types/dtos';

// const { io } = require('socket.io-client');

function App() {
  console.log('App: ');
  // const [date, setDate] = useState(new Date(Date.now()));
  // const [date, setDate] = useState(new Date('2022-01-01'));
  // const [range, setRange] = useState(1);
  // let [req, set_req] = useState<IRequest>({ date: new Date('2022-01-01'), range: 1 });
  // let [req, set_req] = useState<IRequest>({ startData: new Date('2022-01-01'), endData: new Date('2022-01-02') });
  // const [stat, setStat] = useState({ visitCount: 0, online: 0 });
  // const dataSets = remote_data[0].slice(0, 24);
  // let [tick, set_tick] = useState(false);

  // const currSensData = remote_data[0][0];
  let [reqParams, set_reqParams] = useState({ startData: new Date('2021-12-28'), range: 1 });
  // const [range, set_range] = useState(1);
  // let [startData, set_startData] = useState(new Date('2022-01-06'));
  var inData: IChartData | undefined;
  // let [currSensData, set_currSensData] = useState({ _id: '', t: 0, p: 0, h: 0 } as ISensData);
  // let [chartData, set_chartData] = useState(inData); //{} as IChartData
  let [chartData, set_chartData] = useState({ currSensData: { _id: '', t: 0, p: 0, h: 0 }, inData }); //{} as IChartData
  // let [val, set_val] = useState(0);
  let [sz, set_sz] = useState(0); // INFO: только для перерендера
  // let size = 0;

  useEffect(() => {
    console.log('useEffect->fetch');

    const fu = async () => {
      const res: IResponseSensData = await fetchData(reqParams.startData, reqParams.range);
      const out = MyChart.convertArrObjectsToObjectPropertyArrays(
        reqParams.startData,
        reqParams.range,
        res.arrSensData
      );
      // set_chartData(() => {
      //   return out;
      // });
      set_chartData({ currSensData: res.currSensData, inData: out });

      MyChart.calcPadding(out);
      MyChart.resize();

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
    };

    fu();
  }, [reqParams]);

  useEffect(() => {
    console.log('useEffect->app mount');

    initChart();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    // TODO:
    // const socket = io('localhost:3000');
    // const socket = io('http://134.90.161.173:80');

    // socket.on('statistic', (payload) => {
    //   setStat(payload);
    // });

    const resize = (event: UIEvent) => {
      const target = event.target as Window;
      set_sz(target.innerWidth); // INFO: только для перерендера
      MyChart.resize();
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Stack sx={{ height: '100vh' }}>
      <Header currSensData={chartData.currSensData} onUpdate={() => set_reqParams((prev) => ({ ...prev }))} />
      <ControlPanel
        date={reqParams.startData}
        range={reqParams.range}
        onDate={(date, range) => {
          // set_startData(date);
          // set_range(range);
          set_reqParams({ startData: date, range });
        }}
      />

      <ChartView chartData={chartData.inData} />

      {/* <Spinner msg={dataStatus} img='media/snowflake.svg#snowflake'></Spinner> */}
    </Stack>
  );
}

export default App;
