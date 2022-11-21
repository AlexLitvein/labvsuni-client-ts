import React from 'react';
import { MyChart } from './components/Chart';
import { IAxis, IRect, AxisType } from './types/types';

const axisDate: IAxis = {
  name: 'Дата',
  min: 0,
  max: 0,
  type: AxisType.H,
  // cls: 'chart1i0i0-axis chart1i0i0-axis-horz',
  class: { stroke: '#1d5395', strokeWidth: '2px', fill: 'none', marker: 'url("#mrkHAxis")' },
  // class: { stroke: '#ffffff00', strokeWidth: '2px', fill: 'none', marker: 'url("#mrkHAxis")' },
  color: '#006680',
};

const axisTemper: IAxis = {
  name: 'Температура',
  min: -50,
  max: 50,
  type: AxisType.V,
  // cls: 'chart1i0i0-axis chart1i0i0-axis-vert',
  class: { stroke: '#1d5395', strokeWidth: '2px', fill: 'none', marker: 'url("#mrkVAxis")' },
  color: '#b73838',
};

const axisPressure: IAxis = {
  name: 'Давление',
  min: 700,
  max: 800,
  type: AxisType.V,
  class: { stroke: '#1d5395', strokeWidth: '2px', fill: 'none', marker: 'url("#mrkVAxis")' },
  color: '#fffb00',
};

const axisHumidity: IAxis = {
  name: 'Влажность',
  min: 0,
  max: 100,
  type: AxisType.V,
  class: { stroke: '#1d5395', strokeWidth: '2px', fill: 'none', marker: 'url("#mrkVAxis")' },
  color: '#03fbfb',
};

export const initChart = () => {
  MyChart.setAxis('_id', axisDate);
  MyChart.setAxis('t', axisTemper);
  MyChart.setAxis('p', axisPressure);
  MyChart.setAxis('h', axisHumidity);
};
