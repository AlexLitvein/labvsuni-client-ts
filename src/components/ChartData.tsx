import React from 'react';
import { IAxes, IAxis, IChartData, IRect } from '../types/types';
import { ISensDataKey } from '../types/dtos';
import { AniPath } from './AniPath';

export interface IChartDataProps {
  chartData: IChartData;
  rcChart: IRect;
  axes: IAxes;
  lnHSeg: number;
}

export const ChartData = ({ lnHSeg, axes, rcChart, chartData }: IChartDataProps) => {
  return (
    <>
      {(Object.keys(chartData) as Array<ISensDataKey>).map((key) => {
        if (key !== '_id') {
          // return <AniPath key={key} id={key} rcChart={rcChart} axis={axes[key]} data={chartData[key]} />;
          return (
            <AniPath key={key} lnHSeg={lnHSeg} id={key} rcChart={rcChart} axis={axes[key]} data={chartData[key]} />
          );
        } else return null;
      })}
    </>
  );
};
