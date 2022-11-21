import React, { useState, useEffect } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';
import { IAxes, IAxis, IChartData, IRect } from '../types/types';
import { ISensDataKey } from '../types/dtos';
import { AniPath } from './AniPath';
import { MyChart } from './Chart';

export interface IChartDataProps {
  chartData: IChartData;
  rcChart: IRect;
  axes: IAxes;
}

// ???
export const ChartData = ({ axes, rcChart, chartData }: IChartDataProps) => {
  return (
    <>
      {(Object.keys(chartData) as Array<ISensDataKey>).map((key) => {
        if (key !== '_id') {
          return <AniPath key={key} id={key} rcChart={rcChart} axis={axes[key]} data={chartData[key]} />;
        } else return null;
      })}
    </>
  );
};
