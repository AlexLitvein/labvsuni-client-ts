import React from 'react';
import { IAxes, IAxis, IChartData, IRect } from '../types/types';
import { ISensDataKey } from '../types/dtos';
import { AniPath } from './AniPath';

export interface IChartDataProps {
  rcChart: IRect;
  lnHSeg: number;
  axes: IAxes;
  chartData: IChartData;
}

export const ChartData = ({ rcChart, lnHSeg, axes, chartData }: IChartDataProps) => {
  console.log('ChartData->', {
    lnHSeg,
    axes,
    rcChart,
    chartData,
  });

  return (
    <>
      {(Object.keys(chartData) as Array<ISensDataKey>).map((key) => {
        if (key !== '_id') {
          return (
            <AniPath key={key} lnHSeg={lnHSeg} id={key} rcChart={rcChart} axis={axes[key]} data={chartData[key]} />
          );
        } else return null;
      })}
    </>
  );
};
