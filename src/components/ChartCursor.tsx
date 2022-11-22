import React, { useState, useEffect } from 'react';
import { IChartData } from '../types/types';
import { Chart } from './Chart';
import { FlyNote } from './FlyNote';

export interface IChartCursorProps {
  chart: Chart;
  data: IChartData;
}

export function ChartCursor({ chart, data }: IChartCursorProps) {
  const rcClient = chart.chartRect;
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPos(chart.testPos(rcClient.left + chart.lnHSeg, rcClient.top));
  }, [rcClient]);

  useEffect(() => {
    chart.svgRef.current?.addEventListener('click', (e) => {
      setPos(chart.testPos(e.offsetX, e.offsetY));
    });

    chart.svgRef.current?.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        setPos(chart.testPos(e.offsetX, e.offsetY));
      }
    });
  }, []);

  return (
    <>
      <path
        d={`M${pos.x} ${rcClient.top}V${rcClient.bottom}`}
        style={{ fill: 'none', stroke: '#1d5395', strokeWidth: '2px', strokeDasharray: '2, 4' }}
      ></path>
      <FlyNote
        chart={chart}
        x={pos.x + chart.noteW >= rcClient.right ? pos.x - chart.noteW : pos.x}
        y={pos.y + chart.noteH >= rcClient.bottom ? pos.y - chart.noteH : pos.y}
        values={chart.getVal(pos.x, pos.y, data)}
      />
    </>
  );
}
